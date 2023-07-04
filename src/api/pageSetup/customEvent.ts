import Taro from "@tarojs/taro";
import { set } from "lodash-es";
import pageSettingConfig from "src/config/pageSettingConfig";
import { customer } from "src/taro-public/api";
import { hideLoading, showLoading } from "src/taro-public/utils/handleLoading";
import { getDataLakeData } from "src/taro-public/utils/init/dataLake";
import to from "src/taro-public/utils/to";

import pageStore from "../../../store";
import type { backP, customEventType } from "../typings";

//自定义事件
const customEvent: backP<customEventType> = async ({
  operationUrl,
  content = "",
  storeStatic,
  pageDataStore,
  closPop,
  paramsData,
}) => {
  switch (operationUrl) {
    //判断注册
    case "register":
      if (!pageStore.user?.member) {
        to(`${pageSettingConfig.registerPath}`);
      }
      return pageStore.user?.member;
    //提示文字
    case "tips":
      return Taro.showToast({
        title: content || "敬请期待",
        icon: "none",
      }).then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1500);
        });
      });
    //返回上一页
    case "backPage":
      if (Taro.getCurrentPages().length && Taro.getCurrentPages().length > 1) {
        to(1);
      } else {
        to("/pages/index/index");
      }
      break;
    // 关闭弹窗
    case "closPop":
      if (closPop) {
        closPop();
      }
      if (!storeStatic?.popup?.resolve) return true;
      storeStatic.popup.resolve(true);
      pageDataStore.popup = null;

      return true;
    case "makePhoneCall":
      Taro.makePhoneCall({
        phoneNumber: content,
      });
      return true;
    case "getNetworkType":
      const res = await Taro.getNetworkType();
      set(pageDataStore.authInfo, "getNetworkType", res);
      return true;
    // 加载中
    case "showLoading":
      showLoading({
        title: paramsData?.title ?? "加载中",
        mask: paramsData?.mask ?? false,
      });
      return true;
    case "hideLoading":
      hideLoading({
        // @ts-ignore
        noConflict: false,
      });
      return true;
    case "initRefresh":
      const app = Taro.getApp<App.GlobalData>();
      await app.init({ refresh: true });
      return true;
    case "getThreeData":
      // console.log("paramsData", paramsData);
      getDataLakeData({
        getDLExpirePoint: !!paramsData?.getDLExpirePoint,
      });
      return true;
    case "openLocation":
      Taro.openLocation({
        latitude: Number(paramsData?.latitude),
        longitude: Number(paramsData?.longitude),
        scale: paramsData?.scale ?? 1,
        name: paramsData?.name ?? "",
        address: paramsData?.address ?? "",
      });
      return true;
    case "exitMiniProgram":
      Taro.exitMiniProgram();
      return true;
    case "executeWait":
      if (!paramsData?.time) return true;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, paramsData?.time ?? 0);
      });
    case "hideShareMenu":
      Taro.hideShareMenu();
      return true;
    case "showShareMenu":
      Taro.showShareMenu({});
      return true;
    case "selectCrowd":
      if (!paramsData?.crowdIds) return true;

      if (pageStore.user?.member) {
        const { data } = await customer.crowValid({
          crowIds: JSON.parse(paramsData?.crowdIds),
        });
        set(pageDataStore.authInfo, "getCrowd", data.existCrow);
        // console.log("existCrow", data);
        return true;
      } else {
        to(`${pageSettingConfig.registerPath}`);
        return true;
      }
    case "setClipboardData":
      if (!paramsData?.data) return true;
      Taro.setClipboardData({
        data: paramsData?.data?.toString(),
      });
  }
  return false;
};
export default customEvent;
