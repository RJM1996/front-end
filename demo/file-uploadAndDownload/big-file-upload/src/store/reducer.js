import defaultState from './state'
import * as types from './actionTypes'

// 根据 action 更新数据
function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_BREAD:
      return Object.assign({}, state, { breadList: action.data })
    case types.SET_MENU_INFO:
      return Object.assign({}, state, { menuInfo: action.data })
    case types.SET_COLLAPSED:
      return Object.assign({}, state, { menuCollapsed: action.data })
    default:
      return state
  }
}

export default reducer
