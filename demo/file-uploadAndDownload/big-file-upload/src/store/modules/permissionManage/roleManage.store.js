import { createAction } from '@/common/axios.js'
import * as API from '@/api/permissionManage/roleManage.api.js'

export const getRoleList = (req) => {
  return createAction(req, API.getRoleList)
}
export const getAllPermissions = (req) => {
  return createAction(req, API.getAllPermissions)
}
export const editRoleSubmit = (req) => {
  return createAction(req, API.editRoleSubmit)
}

