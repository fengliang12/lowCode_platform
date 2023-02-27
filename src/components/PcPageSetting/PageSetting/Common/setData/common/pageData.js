export const valueType = [
  {
    value: 'custom',
    label: '自定义'
  },
  {
    value: 'pageData',
    label: '动态数据'
  }
]

//全局数据
export const appStore = [
  {
    key: 'useCouponNumber',
    label: '可用优惠券数量',
    default: '0',
    defaultValue: 0
  },
  {
    key: 'InBoxMessageUnreadQuantity',
    label: '未读站内信数量',
    default: '0',
    defaultValue: 0
  },
  {
    key: 'member',
    label: '是否为会员',
    defaultValue: false
  },
  {
    key: 'customerId',
    label: '会员编号(customerId)',
    defaultValue: ''
  },
  {
    key: 'userInfo',
    label: '用户信息',
    child: [
      {
        key: 'avatarUrl',
        label: '用户头像',
        default:
          'https://wechatv2.blob.core.chinacloudapi.cn/ysl/morentouxiang.png',
        type: 'image'
      },
      {
        key: 'nickName',
        label: '用户昵称'
      },
      {
        key: 'realName',
        label: '用户姓名'
      },
      {
        key: 'miniUnionId',
        label: '用户unionId',
        default: '用户unionId',
        defaultValue: ''
      },
      {
        key: 'miniOpenId',
        label: '用户openId',
        default: '用户openId',
        defaultValue: ''
      },

      {
        key: 'mobile',
        label: '用户手机（加密）',
        default: '用户手机（加密）',
        defaultValue: ''
      }
    ]
  },
  {
    key: 'dataLakeInfo',
    label: 'dataLake用户信息',
    child: [
      {
        key: 'points',
        label: '用户积分'
      },
      {
        key: 'grade',
        label: '用户等级'
      },
      {
        key: 'gradeCode',
        label: '用户等级Code'
      },
      {
        key: 'currentAmount',
        label: '当前消费金额'
      },
      {
        key: 'requiredAmount',
        label: '距离下个等级所需金额'
      },
      {
        key: 'upGrade',
        label: '下一等级'
      },
      {
        key: 'thirdCode',
        label: '会员卡号(thirdCode)'
      },
      {
        key: 'upGradeCode',
        label: '下一等级code'
      },
      {
        key: 'expirePoint',
        label: '到期积分数据',
        child: [
          {
            key: 'expireDate',
            label: '到期日期'
          },
          {
            key: 'expireNum',
            label: '到期积分'
          }
        ]
      }
    ]
  },
  {
    key: 'onLaunchOptions',
    label: '小程序加载参数',
    child: [
      {
        key: 'path',
        label: '打开的小程序路径'
      },
      {
        key: 'query',
        label: '入参'
      },
      {
        key: 'scene',
        label: '场景值'
      },
      {
        key: 'shareTicket',
        label: 'shareTicket'
      }
    ]
  }
]

// 页面数据
export const pageInfo = [
  {
    key: 'route',
    label: '页面路径'
  },
  {
    key: 'path',
    label: '页面路径+参数'
  },
  {
    key: 'options',
    label: '页面入参'
  },
  {
    key: 'onLaunchOptions',
    label: '小程序加载参数',
    child: [
      {
        key: 'path',
        label: '打开的小程序路径'
      },
      {
        key: 'query',
        label: '入参'
      },
      {
        key: 'scene',
        label: '场景值'
      },
      {
        key: 'shareTicket',
        label: 'shareTicket'
      }
    ]
  }
]

// 页面配置数据
export const appConfig = [
  {
    key: 'appId',
    label: 'appId'
  }
]

//授权数据
export const authInfo = [
  {
    key: 'getLocation',
    label: '授权地址',
    child: [
      {
        key: 'latitude',
        label: '纬度'
      },
      {
        key: 'longitude',
        label: '经度'
      },
      {
        key: 'speed',
        label: '速度'
      },
      {
        key: 'accuray',
        label: '精确度'
      },
      {
        key: 'altitude',
        label: '高度'
      }
    ]
  },
  {
    key: 'chooseAddress',
    label: '收货地址',
    child: [
      {
        key: 'userName',
        label: '收货人姓名'
      },
      {
        key: 'postalCode',
        label: '邮编'
      },
      {
        key: 'provinceName',
        label: '省份'
      },
      {
        key: 'cityName',
        label: '城市'
      },
      {
        key: 'countyName',
        label: '县'
      },
      {
        key: 'streetName',
        label: '街道'
      },
      {
        key: 'detailInfo',
        label: '详细收货地址'
      },
      {
        key: 'detailInfoNew',
        label: '新选择器详细收货地址信息'
      },
      {
        key: 'nationalCode',
        label: '收货地址国家码'
      },
      {
        key: 'telNumber',
        label: '收货人手机号码'
      },
      {
        key: 'errMsg',
        label: '错误信息'
      }
    ]
  },
  {
    key: 'chooseInvoiceTitle',
    label: '发票抬头',
    child: [
      {
        key: 'type',
        label: '抬头类型'
      },
      {
        key: 'title',
        label: '抬头名称'
      },
      {
        key: 'taxNumber',
        label: '抬头税号'
      },
      {
        key: 'companyAddress',
        label: '单位地址'
      },
      {
        key: 'telephone',
        label: '手机号码'
      },
      {
        key: 'bankName',
        label: '银行名称'
      },
      {
        key: 'bankAccount',
        label: '银行账号'
      }
    ]
  },
  {
    key: 'getWeRunData',
    label: '微信步数',
    child: [
      {
        key: 'iv',
        label: 'iv'
      },
      {
        key: 'encryptedData',
        label: 'encryptedData'
      },
      {
        key: 'cloudID',
        label: 'cloudID'
      }
    ]
  },
  {
    key: 'chooseInvoice',
    label: '用户发票'
  },
  {
    key: 'saveImageToPhotosAlbum',
    label: '保存图片'
  },
  {
    key: 'saveVideoToPhotosAlbum',
    label: '保存视频'
  },
  {
    key: 'startLocationUpdate',
    label: '前台接收位置消息'
  },
  {
    key: 'chooseLocation',
    label: '地图选择位置',
    child: [
      {
        key: 'latitude',
        label: '纬度'
      },
      {
        key: 'longitude',
        label: '经度'
      },
      {
        key: 'address',
        label: '详细地址'
      },
      {
        key: 'name',
        label: '地址名称'
      }
    ]
  },
  {
    key: 'startLocationUpdateBackground',
    label: '前后后接收位置消息'
  },
  {
    key: 'getPhoneNumber',
    label: '手机号授权成功数据'
  },
  {
    key: 'subscribeNotice',
    label: '上次订阅是否成功'
  }
]

//显示类型
export const showTypeList = [
  {
    value: 'text',
    label: '文本'
  },
  {
    value: 'image',
    label: '图片'
  }
]
