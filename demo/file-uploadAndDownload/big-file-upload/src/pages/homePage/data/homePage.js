import { getDate } from '@/common/util'
import moment from 'moment'

export const lineChart = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  color: ['#3D8AFF', '#1BC1AD', '#F5AC48', '#FF514D', '#FF874F', '#747FFF'],
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
}

export const pieChart = {
  tooltip: {
    trigger: 'item'
  },
  color: ['#3D8AFF', '#1BC1AD', '#F5AC48', '#FF514D', '#FF874F', '#747FFF'],
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['75%', '95%'],
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      data: []
    }
  ]
}

// 案件状态统计的搜索框
export const statusSearchFormList = [
  {
    type: 'select',
    name: 'applicant',
    dateType: 'number',
    defaultValue: -1, // 默认全部
    children: []
  },
  {
    type: 'radioGroup',
    name: 'frequency',
    defaultValue: 'day',
    children: [
      {
        label: '日',
        value: 'day'
      },
      {
        label: '周',
        value: 'week'
      },
      {
        label: '月',
        value: 'month'
      }
    ]
  },
  {
    type: 'select',
    name: 'quickRange',
    defaultValue: 'week',
    children: [
      {
        label: '近一周',
        value: 'week'
      },
      {
        label: '近一月',
        value: 'month'
      },
      {
        label: '近三月',
        value: 'quarterly'
      },
      {
        label: '近半年',
        value: 'halfYear'
      },
      {
        label: '自定义',
        value: 'custom'
      }
    ]
  },
  {
    type: 'dateRange',
    name: 'statusDateRange',
    disabled: true,
    defaultValue: [getDate(7), getDate(1)],
    disabledDate: (current) => current && (current < moment().subtract(180, 'days') || current > moment().subtract(1, 'days').endOf('day'))
  }
]
// 案件金额统计的搜索框
export const amountSearchFormList = [
  {
    type: 'radioGroup',
    name: 'totalAmount',
    defaultValue: 'open',
    children: [
      {
        label: '立案总金额',
        value: 'open'
      },
      {
        label: '结案总金额',
        value: 'close'
      }
    ]
  },
  {
    type: 'dateRange',
    name: 'amountDateRange',
    defaultValue: [getDate(7), getDate(1)],
    disabledDate: (current) => current && current > moment().subtract(1, 'days').endOf('day')
  }
]
