import {
  appStore,
  pageInfo,
  appConfig,
  authInfo,
} from '@/components/PcPageSetting/PageSetting/Common/setData/common/pageData'
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
      }),
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
  ]
  return data
}
