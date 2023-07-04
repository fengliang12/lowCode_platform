import "./index.scss";

import { View } from "@tarojs/components";
import Taro, { useDidHide, useDidShow, useRouter } from "@tarojs/taro";
import { useMemoizedFn } from "ahooks";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderTabbar from "src/components/HeaderTabbar";
import config from "src/config";
import { GET_SUBSCRIBE_TO_MESSAGES } from "src/config/constant";
import { setExchangeGood } from "src/store/features/exchangeGoodSlice";
import {
  dictData,
  messageAuthorizeRecord,
  middleExchange,
} from "src/taro-public/api";
import CImage from "src/taro-public/components/common/CImage";
import ConfigurePopUp from "src/taro-public/components/ConfigurePopUp";
import PageSettingProvider from "src/taro-public/components/PageSetting";
import useCart from "src/taro-public/hooks/useCart";
import sendSubscribeToMessages from "src/taro-public/utils/getSubscribeMsg";
import to from "src/taro-public/utils/to";
import toast from "src/taro-public/utils/totas";
import { countDown, diffTodayEnd, judgeActivityTime } from "src/utils";

interface GoodList {
  point: string | number;
  data: Api.middleExchange.Public.MiddleExchangeGoodsView[];
}

interface T_tabItem {
  title: string;
  index: number;
  [props: string]: any;
}

const Redeem = () => {
  const app: App.GlobalData = Taro.getApp();
  const dispatch = useDispatch();
  const cartInfo = useSelector((state: Store.publicStates) => state.cart.info);

  const dataLakeInfo = useSelector(
    (state: Store.publicStates) => state.user.dataLakeInfo
  );
  const { handleGoods, setCartStore } = useCart();
  const router = useRouter();
  const { activityCode = "" } = router?.params;
  const intervalTime = useRef<any>(null);
  const [tabList] = useState<Array<T_tabItem>>([
    { title: "常规兑礼", index: 0, type: "redeem", activityCode: "", desc: "" },
    // {
    //   title: "吉日兑",
    //   index: 1,
    //   type: "auspiciousDay",
    //   activityCode: "",
    //   desc: "",
    // },
  ]);

  const activeIndex = useRef({ index: 0 });

  useDidShow(async () => {
    if (!tabList[0]?.activityCode) {
      await initTableList();
    }
    getGoodsListApi();
  });

  useDidHide(() => {
    if (intervalTime.current) clearInterval(intervalTime.current);
  });

  /**
   * 根据字典给tabList的activityCode属性赋值
   */
  const initTableList = useMemoizedFn(async () => {
    const dict = await dictData.getDictData("ACTIVITIES_ID_LIST");
    tabList.forEach((item) => {
      item.activityCode =
        dict?.data?.dictDataItems.find(
          (dictItem) => dictItem.dictTitle === item.type
        )?.dictValue || "";
      item.desc =
        dict?.data?.dictDataItems.find(
          (dictItem) => dictItem.dictTitle === item.type
        )?.desc || "";
      if (item.activityCode === activityCode) {
        activeIndex.current.index = item.index;
      }
    });
  });

  /**
   * 点击菜单栏切换
   */
  const tabClick = useMemoizedFn((index) => {
    activeIndex.current.index = index;
    getGoodsListApi();
  });

  /**
   * 获取商品列表
   */
  const [goodsList, setGoodsList] =
    useState<Api.middleExchange.getGoodsListByCategory.Child[]>();
  const [activityState, setActivityState] = useState<boolean>(false);
  const getGoodsListApi = useMemoizedFn(async () => {
    await app.init();
    setGoodsList([]);
    setCouponList([]);
    const code = tabList[activeIndex.current.index].activityCode;
    const title = tabList[activeIndex.current.index].title;

    //吉日兑礼
    if (activeIndex.current.index === 1) {
      const desc = tabList[activeIndex.current.index].desc;
      // let timeList = desc.includes("-") ? desc.split("-") : [8, 11, 23];
      const timeList = [7, 11, 23];
      const state = judgeActivityTime(timeList);
      setActivityState(state);
      if (!state) {
        if (intervalTime.current) clearInterval(intervalTime.current);
        return false;
      }
      handleCounterDownString(timeList?.[2]);
    }

    // 更新购物车信息
    setCartStore();
    Taro.showLoading({ title: "加载中", mask: true });
    const res = await middleExchange.getGoodsListByCategory(code);
    handleGoodList(res?.data, title);
    Taro.hideLoading();
  });

  /**
   * 处理显示的倒计时
   */
  const [countDownString, setCountDownString] = useState<string>("--:--:--");
  const [endHour, setEndHour] = useState(23);
  const handleCounterDownString = (hour = 23) => {
    setEndHour(hour);
    let diff = diffTodayEnd(hour);
    if (intervalTime.current) clearInterval(intervalTime.current);
    intervalTime.current = setInterval(() => {
      diff = diff - 1;
      if (diff <= 0) {
        diff = 0;
        setActivityState(false);
        clearInterval(intervalTime.current);
      }
      setCountDownString(countDown(diff));
    }, 1000);
  };

  /**
   * 处理接口返回数据
   */
  const [couponList, setCouponList] = useState<
    Api.middleExchange.Public.MiddleExchangeGoodsView[]
  >([]);
  const coupon: Array<Api.middleExchange.Public.MiddleExchangeGoodsView> = [];
  const handleGoodList = useMemoizedFn((data, title) => {
    const category = data.child.find((t) => t.name === title);
    if (!category?.child) return;
    setGoodsList(category.child);
    handleCoupon(category);
    setCouponList(coupon);
  });

  /**
   * 处理卡券
   */
  const handleCoupon = useMemoizedFn((category) => {
    if (category.goodsListViewList) {
      category.goodsListViewList.forEach((element) => {
        if (element.type === "PRODUCTCOUPON") {
          coupon.push(element);
        }
      });
    }
    if (category.child) {
      category.child.forEach((element) => {
        handleCoupon(element);
      });
    }
  });

  /**
   * 加入购物车
   */
  const addCart = useMemoizedFn(async (e) => {
    const { good } = e.currentTarget?.dataset;
    if (!good) return;
    if (good.sellOut) {
      toast({ title: "该商品已兑完", mask: true });
      return false;
    }
    Taro.showLoading({ title: "加载中", mask: true });
    const res = await handleGoods({
      goods: good,
      num: 1,
      activityCode: tabList[0].activityCode,
    });
    Taro.hideLoading();
    if (res) toast({ title: "加入购物车成功" });
  });

  /**
   * 点击立即兑换
   */
  const clickExchange = useMemoizedFn((e) => {
    const { good } = e.currentTarget?.dataset;
    if (!good || !dataLakeInfo) return;
    if (good.sellOut) {
      toast({ title: "该商品已兑完", mask: true });
      return false;
    }
    if (!good.status) {
      toast({ title: "该商品已失效", mask: true });
      return false;
    }
    const point = good.discountPoint || good.point;

    if (point > dataLakeInfo.points) {
      toast({ title: "您的积分不足", mask: true });
      return false;
    }

    if (!good?.activityCode) {
      good.activityCode = tabList[activeIndex.current.index].activityCode;
    }

    dispatch(setExchangeGood({ goods: [good] }));
    to(
      `/subPages/order/order-confirm/index?from=${
        tabList[activeIndex.current.index].type
      }&endHour=${endHour}`,
      "navigateTo"
    );
  });

  /**
   * 前往购物车
   */
  const toCart = useMemoizedFn(() => {
    to(`/subPages/redeem/cart/index`, "navigateTo");
  });

  const subscribeToMessages = async () => {
    const accept = await sendSubscribeToMessages([
      GET_SUBSCRIBE_TO_MESSAGES.auspicious_day_activity_start,
    ]);
    if (accept && accept.length > 0) {
      await messageAuthorizeRecord.create([
        { templateType: "auspicious_day_activity_start" },
      ]);
    }
  };

  /**
   * 商品列表
   * @returns
   */
  const GoodListView = (showCart = true) => {
    return (
      <>
        {goodsList &&
          goodsList.map((item) => {
            return (
              <View className="typeList" key={item.name}>
                <View className="title text-center">{item.name}积分兑换</View>
                <View className="goodsBox">
                  {item?.goodsListViewList?.length &&
                    item.goodsListViewList.map((child) => {
                      return (
                        child.type !== "PRODUCTCOUPON" && (
                          <View className="goodsItem" key={child.id}>
                            <View className="imgBox">
                              <CImage
                                className="img"
                                mode="widthFix"
                                src={child.mainImage}
                              />
                              {child.sellOut && (
                                <View className="sell_out">暂无库存</View>
                              )}
                            </View>
                            <View className="name">{child.name}</View>
                            <View className="description">
                              {child.description}
                            </View>
                            <View className="btn flex justify-center items-center">
                              <View
                                className="exchange flex justify-center items-center"
                                data-good={child}
                                onClick={clickExchange}
                              >
                                {child.sellOut ? "暂无库存" : "立即兑礼"}
                              </View>
                              {showCart && (
                                <View
                                  className="addBox "
                                  data-good={child}
                                  onClick={addCart}
                                >
                                  <CImage
                                    className="add"
                                    src={`${config.baseImgUrl}/redeem/cart_03.png`}
                                  />
                                </View>
                              )}
                            </View>
                          </View>
                        )
                      );
                    })}
                </View>
              </View>
            );
          })}
      </>
    );
  };

  /**
   * 卡券列表
   */
  const CouponListView = () => {
    return (
      <>
        {couponList?.length > 0 && (
          <View className="typeList">
            <View className="title text-center">会员专属兑礼</View>
            <View className="goodsBox">
              {couponList.map((child) => {
                return (
                  <View className="goodsItem couponItem" key={child.id}>
                    <View className="imgBox">
                      <CImage
                        className="img"
                        mode="widthFix"
                        src={child.mainImage}
                      />
                      {child.sellOut && (
                        <View className="sell_out">暂无库存</View>
                      )}
                    </View>
                    <View className="name">{child.name}</View>
                    <View className="btn flex justify-center items-center">
                      <View
                        className="exchange flex justify-center items-center"
                        data-good={child}
                        onClick={clickExchange}
                      >
                        {child.sellOut ? "已兑完" : "立即兑礼"}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <View className="main">
      <PageSettingProvider code="9Y7fcjj1eZhdyjU3FTYhKX"></PageSettingProvider>
      <ConfigurePopUp businessType="points_mail"></ConfigurePopUp>
      <View className="goodsList">
        <HeaderTabbar
          tabList={tabList}
          activeIndex={activeIndex.current.index}
          tabClick={tabClick}
        ></HeaderTabbar>

        <View>
          {activeIndex.current.index === 0 ? (
            <>
              {CouponListView()}
              {GoodListView(true)}
            </>
          ) : activityState ? (
            <>
              <View className="flex justify-center count_down">
                <View className="count_down_text">限时兑换：</View>
                <View>剩余时间 {countDownString}</View>
              </View>
              {GoodListView(false)}
            </>
          ) : (
            <>
              <View className="vhCenter mt-100 text-38">活动未开始</View>
              <View className="vhCenter mt-20 text-28">
                活动时间：每月8日11：00-23：59
              </View>
              <CImage
                className="w-650 h-200 mx-auto mt-60"
                src={`${config.baseImgUrl}/memberDay/auspiciousDay.png`}
                onClick={subscribeToMessages}
              ></CImage>
            </>
          )}
        </View>
      </View>
      <View
        className="total-box flex flex-col justify-center items-center"
        onClick={toCart}
      >
        <CImage
          className="bag"
          src="https://ysminiproguatrgdiag.blob.core.chinacloudapi.cn/gac/redeem/cart_right_icon.png"
        />
        {Number(cartInfo?.cartDetail?.length) >= 1 && (
          <View className="total-num text-center">{cartInfo?.totalNum}</View>
        )}
      </View>
    </View>
  );
};
export default Redeem;

definePageConfig({
  navigationStyle: "custom",
});
