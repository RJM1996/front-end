import { createAction } from '@/common/axios.js'
import * as API from '@/api/permissionManage/userManage.api.js'

export const getUserList = (req) => {
  return createAction(req, API.getUserList)
}

export const editUserSubmit = (req) => {
  return createAction(req, API.editUserSubmit)
}

export const getRoleSelect = (req) => {
  return createAction(req, API.getRoleSelect)
}

