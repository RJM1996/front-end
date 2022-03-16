import * as API from '@/api/demo/demo.api.js'

export const getListAPI = {
  ...API.getListAPI,
  func: (req) => {
    console.log(req)
    req = JSON.parse(req.body)
    const data1 = [
      {
        value: 1,
        label: 'A01'
      },
      {
        value: 2,
        label: 'A02'
      },
      {
        value: 3,
        label: 'A03'
      }
    ]
    const data2 = [
      {
        value: 1,
        label: 'B01'
      },
      {
        value: 2,
        label: 'B02'
      },
      {
        value: 3,
        label: 'B03'
      }
    ]
    let data = []
    data = req.applicant === 1 ? data1 : data2

    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const getTableAPI = {
  ...API.getTableAPI,
  func: (req) => {
    let data = {
      list: [
        {
          // key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          // key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号xxx'
        },
        {
          // key: '3',
          name: '周星星',
          age: 52,
          address:
            '西湖区湖底公园2号西湖区湖底公园2号西湖区湖底公园2号西湖区湖底公园2号西湖区湖底公园2号西湖区湖底公园2号'
        }
      ],
      total: 399
    }
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const uploadFile = {
  url: '/api/admin/upload',
  func: (req) => {
    let data = {
      fileName: 'aaa',
      filePass: 'bbb'
    }
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const getDataAPI = {
  ...API.getDataAPI,
  func: (req) => ({
    code: 200,
    msg: 'ok',
    data: {
      message: 'success'
    }
  })
}

export const getSearchAPI = {
  ...API.getSearchAPI,
  func: (req) => {
    const arr = [
      {
        value: 1,
        label: 'value1'
      },
      {
        value: 2,
        label: 'value2'
      },
      {
        value: 3,
        label: 'value3'
      }
    ]
    return {
      code: 200,
      msg: 'ok',
      data: {
        applicant: arr,
        productName: arr,
        submitStatus: arr,
        status: arr
      }
    }
  }
}
