declare namespace Api {
  /**
   * 用户登录接口
   */
  namespace PageSetup {
    namespace public {
      type triggerType =
        | 'click'
        | 'onLoad'
        | 'unload'
        | 'pageShow'
        | 'moduleShow'
        | 'success'
        | 'fail'
        | 'swiperChange'
        | 'longpress'
      interface PageSetupView {
        //子页面配置主键集合
        childPageIds: string[]
        //是否为自定义顶部导航
        customHeader: boolean
        //备注
        desc: string
        //事件
        events: PageSetupOperationEvent[]
        //主键
        id: string
        //杂志关联id
        relId?: string
        //页面组件配置
        moduleViews: PageSetupModuleView[]
        //页面高度
        pageHeight: string
        //页面样式配置
        pageStyle: PageStyleSetting
        //是否分享
        shareFlag: boolean
        //分享配置
        shareSetting: PageShareSetting
        //标题
        title: string
        //页面设置类型
        type: string
        //自定义导航
        navigationBar: PageNavigationBar
        //页面额外参数
        params: PageApiInfoParams[]
      }
      interface PageNavigationBar {
        //是否显示
        show: boolean
        // 返回
        back: boolean
        //背景颜色
        backgroundColor: string
        //背景图
        backgroundImage: string
        //是否满足
        fill: boolean
        // Bar颜色
        statusBarColor: string
        //标题
        title: string
        //标题颜色
        titleColor: string
        //标题图片
        titleImage: string
        //滚动时背景是否渐变
        backgroundColorOpacity: boolean
      }
      //页面事件
      interface PageSetupOperationEvent {
        //热区事件
        hotOperations: PageSetupHotOperation[]
        //执行类型  click点击执行 ;show 显示执行 ;
        triggerType: triggerType
      }
      //分享配置
      interface PageShareSetting {
        //分享图片
        imageUrl: string
        //分享路径
        path: string
        //分享标题
        title: string
        //分享参数
        shareParams: PageApiInfoParams[]
      }
      //热区事件
      interface PageSetupHotOperation {
        //API请求
        apiInfo: PageApiInfo
        //执行条件
        conditionsForExecution: ConditionsForExecution | null
        //图片配置
        imageSetting: ImageSetting
        //关联小程序AppId
        linkMiniAppId: string
        //操作类型 pop_ups 弹窗 custom_event 自定义事件 jump_relevance_mini 其他小程序  page_jump  小程序页面  page_setting  配置页面  subscribe_notice 订阅消息 auth 授权
        operationType:
          | 'pop_ups'
          | 'custom_event'
          | 'jump_relevance_mini'
          | 'page_jump'
          | 'jump_h5' //跳转h5
          | 'page_setting'
          | 'subscribe_notice'
          | 'api'
          | 'associated_module'
          | 'auth'
          | 'set_params'
          | 'grid_lottery'
          | 'set_pageSettingStorage'
          | 'page_setting_stateless'
        // 可以放 弹窗url、小程序url、页面配置编号
        operationUrl: string
        //微信订阅消息列表
        subscribeNotices: SubscribeSetting[]
        //内容
        content: string
        //API请求参数
        params: PageApiInfoParams[]
        //组件操作
        moduleOperation: string
        //页面值
        pageValue: PageValue
      }
      //执行条件
      interface ConditionsForExecution {
        //子集
        child: ConditionsForExecution[]
        //比较值
        content: PageValue
        //判断条件
        execution: '=' | '<' | '>' | '!=' | ' >=' | 'existent' | 'non-existent'
        type: 'and' | 'or'
        //取值
        value: PageValue
        //选择 不满足条件时是否中断后面所有事件
        interrupt?: boolean
        //选择 满足条件时是否中断后面所有事件
        trueInterrupt?: boolean
      }
      //页面api请求信息
      interface PageApiInfo {
        //APIkey
        apiKey: string
        //api名称
        apiName: string
        //请求方式
        method: string
        //请求数据
        params: PageApiInfoParams[]
        //返回数据
        res?: any
        //apiUrl
        url: string
      }
      interface PageApiInfoParams {
        child: PageApiInfoParams[]
        //接口key
        key: string
        // //是否必填
        // request: boolean
        // //未填写时提示
        // toast: string
        pageValue: PageValue
        rules: PageApiRule[]
      }
      interface PageApiRule {
        //消息
        message: string
        //是否请求
        required: boolean
        //类型
        type: 'mobile'
      }
      //微信订阅消息列表
      interface SubscribeSetting {
        //自定义类型
        templateCode: string
        //微信模板Id
        templateId: string
      }
      //条件样式
      interface ExecutionAndStyle {
        // 执行条件
        conditionsForExecution: ConditionsForExecution
        // 页面样式配置
        pageStyle: PageStyleSetting
      }
      //倒计时数据
      interface CountDown {
        //变化间隔时间
        interval: number
        //返回维度
        timeLimit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
      }
      //条件滚动条样式
      interface ExecutionAndProgress {
        // 执行条件
        conditionsForExecution: ConditionsForExecution
        // 页面样式配置
        progress: PageProgress
      }
      interface LotterySettingItemStyle {
        //边框样式
        border: string
        //亮度
        brightness: number
      }
      interface GridLotterySetting {
        //9张图片
        images: string[]
        //抽奖活动id
        activityId: string
        //转动顺序
        order: string
        //图片之间的间隔
        gap: number
        //初始激活的图片索引值
        current: number
        //跳转动画间隔，单位ms
        interval: number
        //是否缓慢停止
        stopEase: boolean
        //缓慢停止动画时长
        easeTiming: number
        //默认的图片样式
        defaultItemStyle: LotterySettingItemStyle
        //激活的图片样式
        activeItemStyle: LotterySettingItemStyle
      }
      //组件配置
      interface PageSetupModuleView {
        //轮播配置
        carousel: PageSetupCarousel
        //编号
        code: string
        //执行条件
        conditionsForExecution: ConditionsForExecution
        //条件样式
        executionAndStyles?: ExecutionAndStyle[]
        //条件进度条样式
        executionAndProgresses?: ExecutionAndProgress[]
        //热区事件
        // hotOperations: PageSetupHotOperation[]
        //事件
        events: PageSetupOperationEvent[]
        //图片配置
        imageSetting: ImageSetting
        //组件类型
        moduleType:
          | 'weChatButton'
          | 'common'
          | 'carousel'
          | 'hot'
          | 'text'
          | 'progress'
          | 'scrollView'
          | 'indicator'
          | 'slot'
          | 'qrCode'
          | 'gridLottery'
          | 'richText'
          | 'movableArea'
          | 'movableView'
          | 'sticky'
          | 'pageContainer'
          | 'shareElement'
          | 'countDown'
        //子组件
        moduleViews: PageSetupModuleView[]
        //页面样式配置
        pageStyle: PageStyleSetting
        //标题
        title: string
        //指示点
        indicator: Indicator
        //内容
        pageValue: PageValue
        //滚动条组件
        scrollView: PageScroll
        //进度条组件
        progress: PageProgress
        //组件类型
        buttonType:
          | 'getPhoneNumber'
          | 'contact'
          | 'share'
          | 'getPhoneNumberAndRegister'
        // 组件加载初始化隐藏
        initModuleViewHide?: boolean
        //九宫格抽奖配置
        gridLottery: GridLotterySetting
        //组件参数
        params: PageApiInfoParams[]
        //富文本
        richText: RichText
        //拖拽容器
        movableArea: movableArea
        //拖拽元素
        movableView: movableView
        sticky: {
          direction: 'left' | 'top'
        }
        pageContainer: PageContainerProps
        shareElement: ShareElementProps
        // 倒计时属性
        countDown: CountDown
      }
      interface movableArea {
        clickMove: boolean
      }
      interface movableView {
        relationSwiper: string
      }
      interface PageProgress {
        //动画
        active: boolean
        //进度条颜色
        activeColor: string
        //进度条未选中颜色
        backgroundColor: string
        //圆角
        borderRadius: number
        //动画时间
        duration: number
        //字体大小
        fontSize: number
        //百分比
        percent: number
        //右侧文案
        showInfo: boolean
        //进度条宽度
        strokeWidth: number
      }
      interface PageScroll {
        //边界弹性控制
        bounces: boolean
        //滚动方向
        direction: string
        //返回顶部
        enableBackToTop: boolean
        //开启flex布局
        enableFlex: boolean
        //增强特性
        enhanced: boolean
        //滑动减速速率控制
        fastDeceleration: boolean
        // 底部/右边距离
        lowerThreshold: number
        //分页滑动效果
        pagingEnabled: boolean
        // 下拉刷新区域背景颜色
        refresherBackground: string
        //自定义下拉刷新默认样式
        refresherDefaultStyle: string
        //自定义下拉刷新
        refresherEnabled: boolean
        //自定义下拉刷新阈值
        refresherThreshold: number
        //下拉刷新状态
        refresherTriggered: boolean
        //防止抖动
        scrollAnchoring: boolean
        //滚动到元素id
        scrollIntoView: string
        //横向滚动条位置
        scrollLeft: number
        //竖向滚动条位置
        scrollTop: number
        //使用动画过渡
        scrollWithAnimation: boolean
        //滚动条显隐控制
        showScrollbar: boolean
        // 顶部/左边距离
        upperThreshold: number
      }
      interface Indicator {
        //点击能否修改轮播
        currentSwitch: boolean
        //选中轮播点样式
        indicatorActiveStyle: PageStyleSetting[]
        //默认轮播点样式
        indicatorStyle: PageStyleSetting[]
        //关联轮播
        relationSwiper: string
      }
      // 轮播配置
      interface PageSetupCarousel {
        overlap: boolean
        //自动播放
        autoplay: boolean
        //轮播类型
        carouselType: 'slidesOffset' | 'fullScreen'
        //是否循环轮播
        circular: boolean
        //初始化显示滑块位置
        current: number
        //同时显示滑块数量
        displayMultipleIItems: number
        //轮播切换动画时长
        duration: number
        //滑块切换动画
        easingFunction: string
        //选中点样式
        indicatorActiveColor: string
        //默认点颜色
        indicatorColor: string
        //轮播时间间隔
        interval: number
        //后边距
        nextMargin: string
        //指示点样式
        pointStyle: string
        //前边距
        previousMargin: string
        //关联其他轮播组件
        relationSwiper: string[]
        //是否展示轮播点
        showPoint: boolean
        //滚动方向滑动方向是否为纵向
        vertical: boolean
        //未选中缩放倍数
        zoomOut: number
      }

      //页面数据
      interface PageValue {
        //默认值
        defaultValue: string
        //属性值
        value: string
        //属性类型
        valueType: 'custom' | 'pageData'
        //数据处理方法
        handle: PageValueHandle[]
      }

      interface PageValueHandle {
        // key
        key: string
        //方法
        method: string
        //页面 key Word
        pageValue: PageValue
      }

      //热区组件信息
      interface PageSetupHotModuleSetting {
        //边框距离
        borderDistance: BorderDistance
        // 内容
        content: string
        //热区事件
        hotOperations: PageSetupHotOperation[]
        // /热区类型
        hotType: 'common' | 'form'
        //图片Url
        imgUrl: string
        //显示数据
        pageShowData: PageShowData
        //页面样式
        pageStyle: PageStyleSetting
        //排序值
        sort: number
        //标题
        title: string
        //是否展示标题
        titleShow: boolean
        //页面表单数据
        formData: FormData
        //页面code
        code: string
      }

      //页面表单数据
      interface FormData {
        //类型属性
        attribute: PageFormAttribute
        //输入表单值对应的key
        key: string
        //下拉选择框，输入框，城市，日期
        type: string
      }
      //表单数据类型属性
      interface PageFormAttribute {
        //设置键盘右下角按钮的文字，仅在type='text'时生效
        confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
        //是否禁用
        disabled: boolean
        //结束时间
        end: PageFormAttributeTime
        //有效值 yearmonthday，表示选择器的粒度
        fields: keyof {
          /** 选择器粒度为年 */
          year
          /** 选择器粒度为月份 */
          month
          /** 选择器粒度为天 */
          day
        }
        //自动获取焦点
        focus: boolean
        //输入的最大长度-1为不限制长度
        maxlength: number
        //页面值
        pageValue: PageValue
        //是否为密码类型
        password: boolean
        //输入提示
        placeholder: string
        //指定 placeholder 的样式类
        placeholderStyle: string
        //开始时间
        start: PageFormAttributeTime
        // 输入类型 number nickname digit 带小数点的数字键盘 idcard || 选择器的默认值
        type?:
          | 'text'
          | 'number'
          | 'idcard'
          | 'digit'
          | 'safe-password'
          | 'nickname'
          | 'custom'
          | 'pageData'
        //属性集合
        valueList: PageFormAttributeValue[]
        // 级联选择器的选项列表
        cascaderList: CascaderOption[] | PageValue
        // 展示以选择的默认值
        showSelectedValue: boolean
        // 数据类型
        dataType: string
        // 数据格式化方式
        props: string
      }
      // 级联选择器的选项
      interface CascaderOption {
        label: string
        value: string
        children?: CascaderOption[]
      }
      //时间类型
      interface PageFormAttributeTime {
        // 固定值 relative相对值 以今天为准向前几天或向后几天
        type: string
        //属性
        value: string
      }
      //属性集合
      interface PageFormAttributeValue {
        value: any
        //key
        key: string
        //页面值
        pageValue: PageValue
      }
      //显示数据
      interface PageShowData {
        //展示类型
        showType: 'text' | 'image'
        pageValue: PageValue
      }
      //边框距离
      interface BorderDistance {
        // 高
        height: number
        //左
        left: number
        //圆角
        radius: number
        //顶部
        top: number
        //宽
        width: number
      }

      //通用组件
      interface PageCommonModuleSettingView {
        //内容
        content: string
        //图片Url
        imgUrl: string
        //跳转小程序地址
        jumpMiniUrl: string
        //标题
        title: string
        //是否展示标题
        titleShow: boolean
      }

      //图片配置
      interface ImageSetting {
        //边框距离
        borderDistance: BorderDistance
        //视屏第一帧
        firstFrameVideo: string
        //热区组件设置
        hotModuleSettings: PageSetupHotModuleSetting[]
        //图片类型
        imgType: 'hot' | 'common'
        //图片信息
        imgUrl: string
        //多媒体类型
        multimediaType: 'img' | 'video' | 'audio'
        //浮窗位置
        position: string
        //比例
        ratio: number
        //图片配置
        imageConfig: ImageConfig
        // 视频配置
        videoConfig: VideoConfigView
        // 音频配置
        playConfig: AudioConfigView
      }
      //图片配置
      interface ImageConfig {
        // 懒加载
        lazyLoad: boolean
        // 图片裁剪、缩放的模式 ,
        mode: 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix'
        //长按图片显示发送给朋友
        showMenuByLongpress: boolean
      }

      //样式配置
      interface PageStyleSetting {
        //垂直方向
        alignItems: string
        //背景颜色
        backgroundColor: string
        //背景图片
        backgroundImage: string
        //背景是否重复 no - repeat
        backgroundRepeat: string
        //背景大小 100 % 100 %
        backgroundSize: string
        //字体颜色
        color: string
        //字体大小
        fontSize: number
        //字体粗细
        fontWeight: string
        //文本位置
        justifyContent: string
        //高度
        height: number | undefined
        //宽度
        width: number | undefined
        //盒子圆角
        borderRadius: number
        position: Property.Position | undefined
        //定位
        zIndex: number
        //左
        left: number
        top: number
        right: number
        //底部
        bottom: number
        custom: string
      }
      interface VideoConfigView {
        // 是否显示默认播放控件
        controls: boolean
        // 是否自动播放
        autoplay: boolean
        // 是否循环播放
        loop: boolean
        // 是否静音播放
        muted: boolean
        // 是否显示进度条
        showProgress: boolean
        // 是否显示全屏按钮
        showFullscreenBtn: boolean
        // 是否显示视频底部控制栏的播放按钮
        showPlayBtn: boolean
        // 是否显示视频中间的播放按钮
        showCenterPlayBtn: boolean
        // 是否开启控制进度的手势
        enableProgressGesture: boolean
        // 视频的表现形式
        objectFit: 'contain' | 'fill' | 'cover'
        // 是否显示静音按钮
        showMuteBtn: boolean
        // 视频的标题
        title: string
        // 播放按钮的位置
        playBtnPosition: 'bottom' | 'center'
        // 是否开启播放手势
        enablePlayGesture: boolean
        // 在非全屏模式下，是否开启亮度与音量调节手势
        vslideGesture: boolean
        // 在全屏模式下，是否开启亮度与音量调节手势
        vslideGestureInFullscreen: boolean
        // 是否开启手机横屏时自动全屏
        enableAutoRotation: boolean
        // 是否显示锁屏按钮
        showScreenLockButton: boolean
        //自适应高度
        autoHeight: boolean
      }

      interface AudioConfigView {
        // 是否自动播放
        autoplay: boolean
        // 是否循环播放
        loop: boolean
        // 当前播放位置
        currentTime: number
        // 暂停按钮
        pauseIcon: string
        // 播放按钮
        playIcon: string
        // 播放速度
        playbackRate: number
        // 播放进度条样式
        slider: {
          activeColor: string
          backgroundColor: string
        }
      }
      //富文本
      interface RichText {
        nodes: string
        userSelect: boolean
        space: 'ensp' | 'emsp' | 'nbsp'
      }
    }

    namespace getPageSettingConstant {
      type Func = () => MRP<IResponse>
      interface IResponse {
        svg: string
        text: string
      }
    }
    namespace getAllPage {
      type Func = () => MRP<IResponse>

      interface IResponse {
        avatar: string
      }
    }
    namespace getPageDetail {
      type Func = (id: string) => MRP<IResponse>
      interface IResponse {
        avatar: string
        depId: number
        id: number
        password: string
        permissions: Array<string>
        roleId: number
        roleName: string
        status: boolean
        token: string
        username: string
        authorization: string
      }
    }
    namespace createPage {
      type Func = (data: any) => MRP<IResponse>
      interface IResponse {
        id: string,
        title:string
      }
    }
  }
}
