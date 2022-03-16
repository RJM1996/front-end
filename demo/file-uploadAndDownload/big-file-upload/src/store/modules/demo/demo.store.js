// 页面中调用的请求函数在此生成

import { createAction } from '@/common/axios.js'
import * as API from '@/api/demo/demo.api.js'
import { getListAction } from '@/store/actionCreators.js'

export const getListAPI = (req) => {
  // 如果这个接口返回的数据需要保存在全局的 state 中, 那么可以导入相应的 actionCreators, 传入 createAction 即可
  return createAction(req, API.getListAPI, getListAction)
}

export const getTableAPI = (req) => {
  return createAction(req, API.getTableAPI)
}

export const getDataAPI = (req) => {
  return createAction(req, API.getDataAPI)
}

export const getSearchAPI = (req) => {
  return createAction(req, API.getSearchAPI)
}
