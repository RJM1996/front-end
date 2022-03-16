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
        key: 'username',
        title: '用户名'
      },
      // {
      //   key: 'roleName',
      //   title: '角色'
      // }
    ]
  }
]

export const columns = [
  { title: '序号', dataIndex: 'id' },
  { title: '用户名', dataIndex: 'username' },
  { title: '所属分行', dataIndex: 'orgName' },
  { title: '所属部门', dataIndex: 'departmentName' },
  { title: '角色', dataIndex: 'roleName' },
  { title: '最近一次登录时间', dataIndex: 'loginLastTime' },
  { title: '操作', key: 'action', dataIndex: 'action' }
]

export const editModalFormList = [
  {
    type: 'text',
    label: '用户名称',
    key: 'username',
    value: '张三'
  },
  {
    type: 'text',
    label: '所属分行',
    key: 'orgName',
    value: '111'
  },
  {
    type: 'text',
    label: '所属部门',
    key: 'departmentName',
    value: '222'
  },
  {
    type: 'select',
    name: 'roleName',
    label: '角色',
    required: true,
    children: [
      {
        value: 'administrator',
        label: 'administrator'
      },
      {
        value: 'Lucy',
        label: 'Lucy'
      },
      {
        value: 'Mack',
        label: 'Mack'
      }
    ]
  }
]
