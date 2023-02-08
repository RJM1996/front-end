import AsyncBeforeEnter from './asyncBeforeEnter'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from '@/common/util.js'

const privateRoute = (route) => {
  // const isLogin = getToken()
  const isLogin = true

  return (
    <Route
      path={route.path}
      exact={route.exact}
      strict={route.strict}
      location={route.location}
      sensitive={route.sensitive}
      children={route.children}
      render={(props) => {
        // beforeEnter
        const { beforeEnter, extraProps, ...nextProps } = route
        // 如果有钩子函数，执行带有异步组件
        if (route.breadList || route.menuInfo) {
          return <AsyncBeforeEnter route={nextProps} {...props} {...extraProps} />
        }
        // 页面跳转前, 根据是否登录判断要跳转的页面
        const result =
          route.render && typeof route.render ? (
            route.render({ ...props, ...extraProps, route: nextProps })
          ) : route.component ? (
            <route.component route={nextProps} {...props} {...extraProps} />
          ) : null
        // 1. 已经登录, 要跳转非登录页, 直接渲染
        if (isLogin && route.path !== '/login') {
          return result
        }
        // 2. 已经登录, 要跳转登录页, 重定向到主页
        if (isLogin && route.path === '/login') {
          return <Redirect to='/' />
        }
        // 3. 未登录, 要跳转登录页, 直接渲染
        if (!isLogin && ['/login', '/smsDetail'].includes(route.path)) {
          return result
        }
        // 4. 未登录, 要跳转非登录页, 重定向到登录页
        if (!isLogin && route.path !== '/login') {
          return <Redirect to='/login' />
        }

        // 直接渲染
        return result
      }}
    />
  )
}
export default privateRoute
