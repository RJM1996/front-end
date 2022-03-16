import moment from 'moment'
export const formListData = [
  // {
  //   type: 'itemGroup',
  //   name: 'itemGroup',
  //   label: '复杂表单',
  //   required: true,
  //   compact: false,
  //   groupArr: [
  //     {
  //       type: 'input',
  //       name: 'nameDefault1',
  //       placeholder: '请输入ip地址',
  //       spancol: 5
  //     },
  //     {
  //       type: 'input',
  //       name: 'nameDefault2',
  //       placeholder: '请输入ip地址',
  //       spancol: 12
  //     }
  //   ]
  // },
  {
    type: 'input',
    name: 'nameDefault',
    label: '常规输入框',
    required: true,
    placeholder: '请输入xxx'
  },
  {
    type: 'input',
    name: 'name',
    label: '输入框字段',
    required: true,
    addonBefore: '前缀',
    addonAfter: '后缀',
    maxLength: 10,
    initialvalue: 'aaaa',
    allowClear: false
  },
  {
    type: 'textarea',
    name: 'textarea',
    label: '描述框',
    required: true,
    maxLength: 10,
    autoSize: {
      minRows: 2,
      maxRows: 5
    }
  },
  {
    type: 'inputNumber',
    name: 'number',
    label: '数字输入框',
    required: true,
    min: 0,
    max: 10,
    initialvalue: 0
  },
  {
    type: 'select',
    name: 'select',
    label: '下拉选择器',
    required: true,
    // initialvalue: 1,
    children: [
      {
        value: 1,
        label: 'jack'
      },
      {
        value: 2,
        label: 'Lucy'
      },
      {
        value: 3,
        label: 'Mack'
      }
    ]
  },
  {
    type: 'select',
    name: 'select_mul',
    label: '下拉选择器-多选',
    required: true,
    mode: 'multiple',
    maxTagCount: 2,
    // value: 1,
    children: [
      {
        name: 1,
        value: 'jack'
      },
      {
        name: 2,
        value: 'Lucy',
        disabled: true
      },
      {
        name: 3,
        value: 'Mack'
      }
    ]
  },
  {
    type: 'dateType',
    name: 'dateType',
    label: '时间点选择器',
    required: true,
    showTime: true,
    format: 'yyyy/MM/dd hh:mm:ss',
    disabledDate: (current) => {
      return current && current > moment().endOf('day')
    } 
  },
  {
    type: 'rangeType',
    name: 'rangeType',
    label: '时间段选择器',
    required: true,
    format: 'YYYY/MM/DD',
    placeholder: ['开始日期', '结束日期'],
    disabledDate: (current) => {
      return current && current < moment().startOf('day')
    } 
  },
  {
    type: 'radio',
    name: 'radio',
    label: '单选框',
    required: true,
    initialvalue: 1,
    ifButton: true,
    children: [
      {
        value: 1,
        label: 'A'
        // disabled: true
      },
      {
        value: 2,
        label: 'B'
      },
      {
        value: 3,
        label: 'C'
      }
    ]
  },
  {
    type: 'btn',
    name: 'btn',
    label: '导出文档',
    title: '下载',
    btnType: 'default'
  },
  {
    type: 'file',
    name: 'file',
    label: '上传文件',
    required: true,
    action: '/api/admin/upload',
    accept: '.xls, .xlsx',
    valuePropName: 'fileList', // https://blog.csdn.net/qq_40259641/article/details/112536060
    data: {
      id: 1
    },
    tips: [
      '文件上传的提示文案'
    ]
  },
  {
    type: 'tooltip',
    tips: [
      '鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。',
      '可用来代替系统默认的 title 提示，提供一个 按钮/文字/操作 的文案解释。'
    ]
  }
]

// 文件
export const formListFile = [
  {
    type: 'file',
    fileName: 'file',
    name: 'file',
    label: '上传文件',
    required: true,
    action: '/api/admin/upload',
    accept: '.xls, .xlsx',
    valuePropName: 'fileList', // https://blog.csdn.net/qq_40259641/article/details/112536060
    data: {
      id: 1
    },
    tips: [
      '文件上传的提示文案'
    ],
    btn: [
      {
        name: 'download',
        title: '下载模板'
      },
      {
        name: 'error',
        title: '下载错误报告'
      }
    ]
  }
]

// change事件
export const formListChange = [
  {
    type: 'select',
    name: 'selectNomal',
    label: '下拉选择器',
    required: true,
    initialvalue: 1,
    dataType: 'number',
    children: [
      {
        value: 1,
        label: 'jack'
      },
      {
        value: 2,
        label: 'Lucy'
      },
      {
        value: 3,
        label: 'Mack'
      }
    ]
  },
  {
    type: 'btn',
    label: '测试点击事件',
    title: '点击',
    name: 'click'
  }
]

// 默认值
export const formListDefaultValue = [
  {
    type: 'input',
    name: 'nameDefault',
    label: '常规输入框',
    // required: true,
    initialvalue: 'aaa'
  },
  {
    type: 'select',
    name: 'selectDefault',
    label: '下拉选择器',
    required: true,
    dataType: 'number',
    defaultFirst: true,
    children: [
      {
        value: 1,
        label: 'jack'
      },
      {
        value: 2,
        label: 'Lucy',
        // disabled: true
      },
      {
        value: 3,
        label: 'Mack'
      }
    ]
  },
  {
    type: 'select',
    name: 'select_mul',
    label: '下拉选择器-多选',
    required: true,
    mode: 'multiple',
    maxTagCount: 2,
    children: [
      {
        value: 1,
        label: 'jack'
      },
      {
        value: 2,
        label: 'Lucy',
        // disabled: true
      },
      {
        value: 3,
        label: 'Mack'
      }
    ]
  },
  {
    type: 'rangeType',
    name: 'rangeType',
    label: '时间段选择器',
    required: true,
    format: 'YYYY-MM-DD',
    placeholder: ['开始日期', '结束日期']
  },
  {
    type: 'radio',
    name: 'radioDefault',
    label: '单选框',
    required: true,
    ifButton: true,
    dataType: 'number',
    defaultFirst: true,
    children: [
      {
        value: 1,
        label: 'A'
      },
      {
        value: 2,
        label: 'B'
      },
      {
        value: 3,
        label: 'C'
      }
    ]
  },
  {
    type: 'file',
    name: 'fileMame',
    label: '上传文件',
    required: true,
    action: '/api/admin/upload',
    accept: '.xls, .xlsx',
    valuePropName: 'fileList', // https://blog.csdn.net/qq_40259641/article/details/112536060
    data: {
      id: 1
    },
    tips: [
      '文件上传的提示文案'
    ]
  }
]

// 校验
export const formListRules = [
  {
    type: 'input',
    name: 'inputDefault',
    label: '输入框',
    required: true
  },
  {
    type: 'inputNumber',
    name: 'numberDefault',
    dataType: 'integer',
    label: '数字输入框',
    required: true,
    range: '(0, 10]',
    addonAfter: '小时'
  },
  ...formListFile
]

export const formCascader = [
  {
    type: 'cascader',
    name: 'cascader',
    label: '级联',
    required: true,
    children: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              }
            ]
          }
        ]
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ]
          }
        ]
      }
    ]
  }
]
