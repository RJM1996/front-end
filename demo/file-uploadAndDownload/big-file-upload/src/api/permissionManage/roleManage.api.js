// 获取角色列表
export const getRoleList = {
  method: 'POST',
  url: '/permission/roleList'
}

// 获取完整权限列表
export const getAllPermissions = {
  method: 'POST',
  url: '/role/permission'
}

// 新建/编辑角色 - 提交
export const editRoleSubmit = {
  method: 'POST',
  url: '/role/addUpdate'
}
