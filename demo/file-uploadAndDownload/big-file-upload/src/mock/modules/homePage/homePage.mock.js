import * as API from '@/api/homePage/homePage.api.js'

export const getApplicantList = {
  ...API.getApplicantList,
  func: (req) => {
    let data = [
      {
        label: '申请人01',
        value: 1
      },
      {
        label: '申请人02',
        value: 2
      },
      {
        label: '申请人03',
        value: 3
      }
    ]
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const getCardInfoList = {
  ...API.getCardInfoList,
  func: (req) => {
    let data1 = [
      {
        keyName: 'sumFilingAmount',
        title: '模块一',
        content: [
          {
            unit: '万元',
            num: '3.60'
          },
          {
            unit: '万元',
            num: '0.046',
            keyName: 'avgFilingAmount',
            label: '件均'
          }
        ]
      },
      {
        keyName: 'countCase',
        title: '模块二',
        content: [
          {
            unit: '件',
            num: 78
          }
        ]
      },
      {
        keyName: 'countUserValid',
        title: '模块三',
        content: [
          {
            unit: '人',
            num: 3
          }
        ]
      },
      {
        keyName: 'countApplyValid',
        title: '模块四',
        content: [
          {
            unit: '家',
            num: 6
          }
        ]
      },
      {
        keyName: 'sumClosedAmount',
        title: '模块五',
        content: [
          {
            unit: '万元',
            num: '0.00'
          }
        ]
      },
      {
        keyName: 'ratioPaybackAmount',
        title: '模块六',
        content: 0
      },
      {
        keyName: 'ratioClosedCase',
        title: '模块七',
        content: 8
      },
      {
        keyName: 'ratioWithdrawnCase',
        title: '模块八',
        content: 0
      }
    ]
    return {
      code: 200,
      msg: 'ok',
      data: data1
    }
  }
}

export const getOneCardInfo = {
  ...API.getOneCardInfo,
  func: (req) => {
    let data = {
      keyName: 'caseAmount',
      content: [
        {
          num: '223,234,66',
          unit: '万元'
        },
        {
          label: '件均',
          num: '0.1666',
          unit: '万元'
        }
      ]
    }
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const getCaseStatus = {
  ...API.getCaseStatus,
  func: (req) => {
    let data = {}
    const data1 = {
      xAxisData: ['2019/7/10', '2019/7/11', '2019/7/12', '2019/7/13', '2019/7/14', '2019/7/15', '2019/7/16'],
      series: [
        {
          name: '已立案',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '待调解',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '调解中',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '暂停调解',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '已结案',
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    const data2 = {
      xAxisData: ['2019-6', '2019/7', '2019/8', '2019/9', '2019/10', '2019/11', '2019/12'],
      // xAxisData: [],
      series: [
        {
          name: '已立案',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 310]
        },
        {
          name: '待调解',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 410]
        },
        {
          name: '调解中',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 510]
        },
        {
          name: '暂停调解',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 620]
        },
        {
          name: '已结案',
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    const reqBody = JSON.parse(req.body)
    // console.log(reqBody)
    data = data1
    if (reqBody.frequency === 'month') {
      data = data2
    }
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const getCaseAmount = {
  ...API.getCaseAmount,
  func: (req) => {
    let data1 = {
      totalAmount: '6.00万元',
      series: [
        {
          orgName: '申请人简称012345',
          amount: 200000.0,
          orgId: 1,
          percent: 120
        },
        {
          orgName: '申请人简称023456',
          amount: 16000.11,
          orgId: 2,
          percent: 27
        },
        {
          orgName: '申请人简称034567',
          amount: 8000.22,
          orgId: 3,
          percent: 13
        },
        {
          orgName: '申请人简称05',
          amount: 6000,
          orgId: 5,
          percent: 0
        },
        {
          orgName: '申请人04',
          amount: 0,
          orgId: 4,
          percent: 0
        }
      ]
    }
    return {
      code: 200,
      msg: 'ok',
      data: data1
    }
  }
}
