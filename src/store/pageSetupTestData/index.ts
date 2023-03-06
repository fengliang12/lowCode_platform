const pageSetupTestData = {
  getMemberTagAll: [
    { id: '10', name: '光钥白卡', sort: 1, visible: false, description: null },
    { id: '20', name: '凝采粉卡', sort: 2, visible: false, description: null },
  ],
  getAllPage: [
    {
      id: 'HQRRBjMDTLxdF7bHFNV85S',
      title: '首页',
      customHeader: true,
    },
    {
      id: 'TVgxaAppFmFRa2nqEy1tDT',
      title: '会员日活动',
      customHeader: true,
    },
  ],
  getOperationApi: [
    {
      id: 'VdqrLvoihxnkjG5LkmY7Ko',
      apiInfoId: 'MQ5QLfr9bCmCTJPUr7Tu9r',
      pageSetupId: '6V29n5nGvAxfzREjm9Ljch',
      apiName: '积分兑礼',
      apiKey: 'creatExchangeOrder',
      url: '/api/member-portal/store/{storeCode}/middle_exchange',
      method: 'post',
      params: [
        {
          key: 'activityCode',
          pageValue: {
            valueType: 'custom',
            value: '8idF1ka5hs1BhQcKAGJ5zT',
          },
        },
        {
          key: 'submitItems',
          child: [
            {
              key: '0',
              child: [
                {
                  key: 'quantity',
                  pageValue: { valueType: 'custom', value: '1' },
                },
                {
                  key: 'skuId',
                  pageValue: {
                    valueType: 'custom',
                    value: 'FREWzvDwH3Bn9ndJG4zwYx',
                  },
                },
              ],
            },
            {
              key: '1',
              child: [
                {
                  key: 'quantity',
                  pageValue: { valueType: 'custom', value: '1' },
                },
                {
                  key: 'skuId',
                  pageValue: {
                    valueType: 'custom',
                    value: 'UjGmyihTwLTYtN1znukYpj',
                  },
                },
              ],
            },
            {
              key: '2',
              child: [
                {
                  key: 'quantity',
                  pageValue: { valueType: 'custom', value: '1' },
                },
                {
                  key: 'skuId',
                  pageValue: {
                    valueType: 'custom',
                    value: 'T8UdHUgE6u9wL4cDNr8jui',
                  },
                },
              ],
            },
          ],
        },
        {
          key: 'channelId',
          pageValue: { valueType: 'custom', value: 'wa' },
        },
      ],
      updateTime: '2023-03-06T09:37:09.526+0800',
      createTime: '2023-03-06T09:37:09.526+0800',
    },
  ],
}
export default pageSetupTestData
