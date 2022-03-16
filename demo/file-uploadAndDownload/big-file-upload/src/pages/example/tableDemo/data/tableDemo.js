

export const actions = [
  {
    key: 'stop',
    title: '暂停'
  },
  {
    key: 'restart',
    title: '重启'
  },
  {
    key: 'view',
    title: '查看'
  }
]

export const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: true,
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    ellipsis: true,
    tooltip: true,
  }
]
