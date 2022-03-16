import './styles/common.less'

import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import store from '@/store'

// 非生产环境时,引入mockjs模拟响应
if (process.env.NODE_ENV !== 'production') require('@/mock')
const render = () => ReactDOM.render(<App />, document.getElementById('root'))
render()
store.subscribe(render)
