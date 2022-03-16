import { createAction } from '@/common/axios.js'
import * as API from '@/api/login/login.api.js'

export const loginAPI = (req) => {
  return createAction(req, API.loginAPI, null, 'login')
}
export const logoutAPI = (req) => {
  return createAction(req, API.logoutAPI, null, 'logout')
}
export const getUserInfoAPI = (req) => {
  return createAction(req, API.getUserInfoAPI)
}
