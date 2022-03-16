// 仓库管理文件
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
// 增强函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(
  reducer,
  enhancer
  // applyMiddleware(thunk) // 不支持dev-tools
  // 不支持dev-tools
)
export default store
