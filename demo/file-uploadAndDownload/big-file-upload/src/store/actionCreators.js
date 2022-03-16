// 定义 action 的生成函数
import * as types  from './actionTypes'

export const getListAction = (data) => ({
  type: types.GET_LIST,
  data
})

export const setBreadAction = (data) => ({
  type: types.SET_BREAD,
  data
})


export const setMenuInfoAction = (data) => ({
  type: types.SET_MENU_INFO,
  data
})

export const setCollapsed = (data) => ({
  type: types.SET_COLLAPSED,
  data
})

export const getMediateInfo = (data) => ({
  type: types.GET_MEDIATEINFO,
  data
})

export const getMediateSelect = (data) => ({
  type: types.GET_MEDIATESELECT,
  data
})
