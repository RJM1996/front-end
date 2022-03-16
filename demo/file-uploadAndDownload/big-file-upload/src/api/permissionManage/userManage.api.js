
// 获取用户列表
export const getUserList = {
  method: 'POST',
  url: '/user/list',
}

// 获取角色下拉列表
export const getRoleSelect = {
  method: 'POST',
  url: '/role/all',
}

// 用户编辑提交
export const editUserSubmit = {
  method: 'POST',
  url: '/user/updatePermission',
}