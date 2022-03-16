import * as API from '@/api/permissionManage/userManage.api.js'

export const getUserList = {
  ...API.getUserList,
  func: (req) => {
    const data = {
      list: [
        {
          id: 1, //编号
          username: 'admin', //用户名称
          roleName: '角色名称', //角色
          orgName: '所属分行', //所属机构
          departmentName: '所属部门', //所属部门
          loginLastTime: '2021-08-08 12:00:00' //最近一次登陆时间
        },
        {
          id: 2, //编号
          username: 'admin', //用户名称
          roleName: '角色名称', //角色
          orgName: '所属分行', //所属机构
          departmentName: '所属部门', //所属部门
          loginLastTime: '2021-08-09 12:00:00' //最近一次登陆时间
        },
        {
          id: 3, //编号
          username: 'admin', //用户名称
          roleName: '角色名称', //角色
          orgName: '所属分行', //所属机构
          departmentName: '所属部门', //所属部门
          loginLastTime: '2021-08-10 12:00:00' //最近一次登陆时间
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

export const getRoleSelect = {
  ...API.getRoleSelect,
  func(req) {
    return {
      code: 200,
      msg: 'ok',
      data: {
        roleList: [
          { label: '角色1', value: '1' },
          { label: '角色2', value: '2' },
          { label: '角色3', value: '3' }
        ]
      }
    }
  }
}

export const editUserSubmit = {
  ...API.editUserSubmit,
  func: (req) => {
    return {
      code: 200,
      msg: '提交成功',
      data: {}
    }
  }
}
