import { HashRouter } from 'react-router-dom'
import React from 'react'
import Router from '@/router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN' // 引入中文包

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Router />
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
