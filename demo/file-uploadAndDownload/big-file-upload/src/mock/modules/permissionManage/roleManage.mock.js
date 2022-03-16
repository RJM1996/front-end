import * as API from '@/api/permissionManage/roleManage.api.js'

export const getRoleList = {
  ...API.getRoleList,
  func: (req) => {
    const data = {
      list: [
        {
          id: '1',
          role_name: '分行建模',
          role_description: '多用于建模',
          creator: '邓刚',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '19',
          role_name: '分行管理员',
          role_description: '多用于建模',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '38',
          role_name: '总行管理员',
          role_description: '多用于建模',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '76',
          role_name: 'cred_example',
          role_description: '多用于建模',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '61',
          role_name: 'cred_example',
          role_description: '多用于建模',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '2',
          role_name: 'cred_example',
          role_description: '多用于建模',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '23',
          role_name: 'cred_example',
          role_description: 'cred_example',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '15',
          role_name: 'cred_example',
          role_description: 'cred_example',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '231',
          role_name: 'cred_example',
          role_description: 'cred_example',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        },
        {
          id: '151',
          role_name: 'cred_example',
          role_description: 'cred_example',
          creator: '崔平',
          create_time: '2018-12-25 11:43:12'
        }
      ],
      total: 123
    }

    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const getAllPermissions = {
  ...API.getAllPermissions,
  func: (req) => {
    req = JSON.parse(req.body)

    let data = {
      allAction: [
        { key: 1, title: '一级菜单01 - 二级菜单xxx' },
        { key: 2, title: '一级菜单02 - 二级菜单xxx' },
        { key: 3, title: '一级菜单03 - 二级菜单xxx' },
        { key: 4, title: '一级菜单04 - 二级菜单xxx' }
      ],
      hasAction: [1, 3]
    }
    if (!req.id) {
      data.hasAction = []
    }
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}

export const editRoleSubmit = {
  ...API.editRoleSubmit,
  func(req) {
    return {
      code: 200,
      msg: 'ok',
      data: {}
    }
  }
}
