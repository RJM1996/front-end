const {classify, regression} = require('./data.js')

const buildItems = () => {
  let itemData = {
    type: 'select',
    key: 'cNum',
    value: 'general',
    label: '正则化系数',
    required: true,
    clearable: true,
    show: true, // 用于处理联动
    children: [
      {
        key: 'general',
        value: '无需超参优化'
      },
      {
        key: 'senior',
        value: '需超参优化'
      }
    ],
    appendInput: {
      senior: [
        {
          type: 'input',
          key: 'cNum_start',
          label: '起始',
          value: '0.05',
          width: 80,
          show: true
        },
        {
          type: 'input',
          key: 'cNum_end',
          label: '结束',
          value: '0.1',
          width: 80,
          show: true
        },
        {
          type: 'input',
          key: 'cNum_interval',
          label: '间隔',
          value: '0.01',
          width: 80,
          show: true
        }
      ],
      general: [
        {
          type: 'input',
          key: 'cNum_value',
          value: '0.05',
          labelWidth: 10,
          width: 100,
          show: true
        }
      ]
    }
  }
  let itemArr = []
  let items = classify.lightgbm
  items.forEach((item) => {
    let data = JSON.parse(JSON.stringify(itemData))
    data.label = item[0]
    data.key = item[1]
    data.appendInput.general[0].value = item[2]
    data.appendInput.general[0].key = data.key + '_value'

    data.appendInput.senior[0].key = data.key + '_start'
    data.appendInput.senior[1].key = data.key + '_end'
    data.appendInput.senior[2].key = data.key + '_interval'

    data.appendInput.senior[0].value = item[3] || ''
    data.appendInput.senior[1].value = item[4] || ''
    data.appendInput.senior[2].value = item[5] || ''
    itemArr.push(data)
  })
  console.log(JSON.stringify(itemArr))
}

buildItems()
