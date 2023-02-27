export default [
  {
    label: '会员中心页',
    value: '/pages/index/index'
  },
  {
    label: '我的',
    value: '/pages/center/center'
  },
  {
    label: '卡券中心',
    value: '/pages/center/coupon/coupon'
  },
  {
    label: '积分商城',
    value: '/pages/integral-mall/integral-mall'
  },
  {
    label: '积分历史',
    value: '/pages/integral-history/index'
  },
  {
    label: '兑礼记录',
    value: '/subPages/exchange/history/index'
  },
  {
    label: '跳转内嵌h5',
    value: '/pages/webView/index'
  },
  {
    label: '选择专属ba',
    children: [
      {
        label: '门店列表',
        value: '/pages/ba/index'
      },
      {
        label: 'ba列表',
        value: '/pages/ba/select/index',
        params: [
          {
            key: 'code',
            request: true,
            pageValue: {
              value: '',
              valueType: '',
              defaultValue: ''
            }
          }
        ]
      },
      {
        label: 'ba详情',
        value: '/pages/ba/selectSuc/index',
        params: [
          {
            key: 'userId',
            request: true,
            pageValue: {
              value: 'api.getBaInfo.data.userId',
              valueType: 'pageData',
              defaultValue: ''
            }
          }
        ]
      }
    ]
  },
  {
    label: '站内信',
    value: '/pages/mail/index'
  },
  {
    label: '空瓶回收',
    value: '/subPages/recycle/index/index',
    type: 'bottleRecycle',
    children: []
  },

  {
    label: '服务预约',
    children: [
      {
        label: '预约页',
        value: '/pages/service-appointment/index',
        params: [
          {
            key: 'serviceId',
            request: true,
            pageValue: {
              value: 'api.reservationProjects.0.serviceId',
              valueType: 'pageData',
              defaultValue: ''
            }
          },
          {
            key: 'serviceName',
            request: true,
            pageValue: {
              value: 'parents.name',
              valueType: 'pageData',
              defaultValue: ''
            }
          },
          {
            key: 'couponCode',
            request: true,
            pageValue: {
              value: '',
              valueType: 'pageData',
              defaultValue: ''
            }
          },
          {
            key: 'couponTypeId',
            request: true,
            pageValue: {
              value: 'parents.thirdsCouponId',
              valueType: 'pageData',
              defaultValue: ''
            }
          }
        ]
      },
      {
        label: '预约详情页',
        value: '/pages/service-appointment/success/success',
        params: [
          {
            key: 'reservationId',
            request: true,
            pageValue: {
              value: 'api.reservationMyList',
              valueType: 'pageData',
              defaultValue: '',
              handle: [
                {
                  key: 'couponTypeId',
                  method: 'array.findKey',
                  pageValue: {
                    value: 'parents.thirdsCouponId',
                    valueType: 'pageData',
                    defaultValue: '',
                    handle: null
                  }
                },
                {
                  key: 'reservationId',
                  method: 'object.getKey',
                  pageValue: {
                    value: '',
                    valueType: 'custom',
                    defaultValue: '',
                    handle: null
                  }
                }
              ]
            }
          }
        ]
      },
      {
        label: '预约记录',
        value: '/pages/service-appointment/record/record'
      }
    ]
  }
]
