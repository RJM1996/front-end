export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action'
  }
]

export const searchFormList = [
  {
    type: 'poptipInput',
    name: 'keywordValue',
    label: '关键词查询',
    keywordList: [
      {
        key: 'aaa',
        title: 'aaa'
      },
      {
        key: 'bbb',
        title: 'bbb'
      },
      {
        key: 'ccc',
        title: 'ccc'
      }
    ]
  },
  {
    type: 'input',
    name: 'caseNumber',
    label: '案件批次'
  },
  {
    type: 'select',
    name: 'applicant',
    label: '申请人',
    dataType: 'number'
  },
  {
    type: 'select',
    name: 'productName',
    label: '产品名称',
    dataType: 'number'
  },
  {
    type: 'input',
    name: 'applicantor',
    label: '申请提交人'
  },
  {
    type: 'select',
    name: 'submitStatus',
    label: '提交状态',
    dataType: 'number'
  },
  {
    type: 'rangeType',
    name: 'applicantDate',
    label: '申请日期'
  },
  {
    type: 'select',
    name: 'status',
    label: '批次状态',
    dataType: 'number'
  }
]
