export const searchFormList = [
  {
    type: 'poptipInput',
    name: 'keywordValue',
    label: '关键词查询',
    placeholder: '请输入搜索关键词',
    keywordList: [
      {
        key: 'id',
        title: '序号'
      },
      {
        key: 'role_name',
        title: '角色名称'
      },
      {
        key: 'role_description',
        title: '角色描述'
      }
    ]
  }
]

export const columns = [
  {
    dataIndex: 'id',
    title: '序号'
  },
  {
    dataIndex: 'role_name',
    title: '角色名称'
  },
  {
    dataIndex: 'role_description',
    title: '角色描述'
  },
  {
    dataIndex: 'creator',
    title: '创建人'
  },
  {
    dataIndex: 'create_time',
    title: '创建时间'
  },
  { title: '操作', key: 'action', dataIndex: 'action', width: 180 }
]

export const editModalFormList = [
  {
    type: 'input',
    name: 'role_name',
    label: '角色名称',
    required: true
  },
  {
    type: 'input',
    name: 'role_description',
    label: '角色描述',
    required: true
  }
]
