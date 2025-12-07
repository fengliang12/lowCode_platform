import {
  appStore,
  pageInfo,
  appConfig,
  authInfo,
} from '@/components/PcPageSetting/PageSetting/Common/setData/common/pageData'

import { getParents } from '@/components/PcPageSetting/PageSetting/Handle/getParents'

const handleChild = (child) => {
  if (!child) return undefined
  return child.map((elem) => {
    return {
      key: elem.key,
      label: elem.label ? `${elem.label}(${elem.key})` : elem.key,
      child: elem.child ? handleChild(elem.child) : undefined,
    }
  })
}

//处理页面自定义数据
const handlePageNewParams = (pageNewParams) => {
  if (!pageNewParams) return undefined
  return pageNewParams.map((elem) => {
    return {
      key: elem.key,
      label: elem.key,
      child: elem.child?.length ? handlePageNewParams(elem.child) : undefined,
    }
  })
}

const handleComponentChild = (elem, itemsMap) => {
  let arr = [
    {
      key: 'code',
      label: '组件code',
    },
    {
      key: 'show',
      label: '是否显示',
    },
    ...(elem.params?.length
      ? [
          {
            key: 'componentNewParams',
            label: `组件新增数据`,
            child: elem.params?.length ? handlePageNewParams(elem.params) : [],
          },
        ]
      : []),
    ...(elem.moduleType === 'carousel'
      ? [
          {
            key: 'swiperLength',
            label: '轮播长度',
          },
          {
            key: 'current',
            label: '轮播当前位置',
          },
          {
            key: 'currentData',
            label: '当前轮播数据',
            get child() {
              if (!elem?.moduleSettings?.length) {
                return null
              }
              const items = elem.moduleSettings.find((child) => {
                return child?.moduleType === 'common' && child?.pageValue?.value
                // eslint-disable-next-line prettier/prettier
              })
              if (!items) return null
              const data = getData(items.pageValue.value)
              return data
            },
          },
        ]
      : []),
    ...(elem.moduleType === 'gridLottery'
      ? [
          {
            key: 'data',
            label: '抽奖数据',
            child: [
              {
                key: 'win',
                label: '是否中奖(win)',
              },
              {
                key: 'status',
                label: '邮寄信息填写状态(status)',
              },
              {
                key: 'prize',
                label: '奖品信息(prize)',
                child: [
                  {
                    key: 'code',
                    label: '奖品code(code)',
                  },
                  {
                    key: 'prizeName',
                    label: '奖品名称(prizeName)',
                  },
                  {
                    key: 'desc',
                    label: '奖品描述(desc)',
                  },
                  {
                    keyL: 'prizeAttribute',
                    label: '奖品属性(prizeAttribute)',
                  },
                  {
                    keyL: 'prizeImg',
                    label: '奖品图片(prizeImg)',
                  },
                ],
              },
            ],
          },
          {
            key: 'count',
            label: '抽奖次数数据',
          },
        ]
      : []),
    //设置图片组件数据
    ...(elem.moduleType === 'hot'
      ? [
          {
            key: 'imageSetting',
            label: '多媒体组件信息',
            get child() {
              const items = [
                {
                  key: 'imgUrl',
                  label: `图片url`,
                },
              ]
              if (elem?.imageSetting?.multimediaType === 'video') {
                items.push({
                  key: 'firstFrameVideo',
                  label: `视频封面海报`,
                })
                if (elem?.imageSetting?.videoConfig) {
                  items.concat([
                    {
                      key: 'videoPlayInfo',
                      label: '视频播放信息',
                      child: [
                        {
                          key: 'duration',
                          label: `视频总时长`,
                        },
                        {
                          key: 'buffered',
                          label: `视频播放进度`,
                        },
                        {
                          key: 'currentTime',
                          label: `视频播放时长`,
                        },
                        {
                          key: 'fullScreen',
                          label: `是否全屏播放`,
                        },
                        {
                          key: 'direction',
                          label: `全屏播放方向(vertical/horizontal)`,
                        },
                        {
                          key: 'playStatus',
                          label: `视频播放中`,
                        },
                      ],
                    },
                  ])
                }
              }
              return items
            },
          },
        ]
      : []),
    //当选到轮播下面的子组件时
    ...(getCarouselIndex(elem.code, itemsMap)
      ? [
          {
            key: 'carouselIndex',
            label: '组件所在轮播位置',
          },
        ]
      : []),
    //设置海报组件数据
    ...(elem.moduleType === 'painter'
      ? [
          {
            key: 'imgPath',
            label: '生成的图片路径',
          },
        ]
      : []),
  ]
  return arr
}

function getCarouselIndex(code, itemsMap) {
  const value = getParents(
    code,
    itemsMap,
    (item) => {
      if (item?.moduleType == 'carousel') {
        return item
      }
    },
    {
      hasCurrent: false,
    },
  )
  return value || ''
}

const getCurrentComponent = (state) => {
  let arr = []
  let item = state.items.value
  if (item) {
    arr.push({
      key: `${item.code}_0`,
      label: `当前组件数据`,
      child: handleComponentChild(item, state?.itemsMap),
    })
  }
  return arr
}

function getData(value, state) {
  const keys = value.split('.')
  let data = null
  // 页面入参动态数据
  if (value.includes('pageInfo.options.')) {
    return [
      {
        key: ' ',
        label: '空数据',
      },
    ]
  }
  const pageDataList = [
    {
      key: 'api',
      child: Object.values(apiMap),
    },
    {
      key: 'appStore', //全局数据
      child: appStore,
    },
    ...(state?.pageNewParams
      ? [
          {
            key: 'pageNewParams',
            get child() {
              return handlePageNewParams(state.pageNewParams)
            },
          },
        ]
      : []),
  ]
  keys.map((key) => {
    const list = data || pageDataList
    data = list.find((elem) => elem.key === key)?.child
  })

  // 处理一下为数组的情况
  if (data?.length === 1 && data?.[0].key == 0 && data[0]?.child?.length) {
    data = data[0].child
  }
  return data
}

//api对应数据
const apiMap = {}
export default (state) => {
  let data = [
    {
      key: 'api',
      label: `接口数据(api)`,
      child: state.AloneApiList.map((elem) => {
        return (apiMap[elem.apiKey] = {
          key: elem.apiKey,
          label: elem.apiName,
          child: handleChild(elem.res),
        })
      }).filter((elem) => elem?.child?.length),
    },
    {
      key: 'appStore',
      label: `全局数据(appStore)`,
      child: appStore,
    },
    {
      key: 'pageInfo',
      label: '页面数据',
      child: [
        ...pageInfo,
        {
          key: 'appConfig',
          label: '配置数据',
          child: appConfig,
        },
      ],
    },
    {
      key: 'authInfo',
      label: '授权数据',
      child: authInfo,
    },
    {
      key: 'pageNewParams',
      label: '页面新增参数',
      get child() {
        return handlePageNewParams(state.pageNewParams)
      },
    },
    {
      key: 'component',
      label: `组件数据(component)`,
      child: state?.itemsMap?.values
        ? [
            ...(state.items?.value ? getCurrentComponent(state) : []),
            ...Array.from(state.itemsMap.values()).map((elem) => ({
              key: `${elem.code}_0`,
              label: `${elem.title ?? elem.code}`,
              child: handleComponentChild(elem, state?.itemsMap),
            })),
          ]
        : [],
    },
    {
      key: 'parents',
      label: `父级数据(parents)`,
      get child() {
        //console.log(state.items?.value?.code)
        if (!state.items?.value?.code) {
          return ''
        }
        const value = getParents(
          state.items?.value?.code,
          state.itemsMap,
          (item) => {
            if (item?.pageValue?.value) {
              return item.pageValue.value
            }
          },
          {
            hasCurrent: false,
          },
        )
        if (!value) return ''
        let data = getData(value, state)
        return data
      },
    },
  ].filter((elem) => elem?.child?.length)
  return data
}
