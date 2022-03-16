import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import store from '@/store'

function isPromise(obj) {
  return (
    !!obj && //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
    (typeof obj === 'object' || typeof obj === 'function') && // 初始promise 或 promise.then返回的
    typeof obj.then === 'function'
  )
}

function isPlainObject(obj) {
  let prototype

  return (
    Object.prototype.toString.call(obj) === '[object Object]' &&
    ((prototype = Object.getPrototypeOf(obj)), prototype === null || prototype === Object.getPrototypeOf({}))
  )
}

export default class AsyncBeforeEnter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // 注意：此处component和render不会同时使用，同Route中component和render，render方法优先级要高
      // 目标组件 同 <Route componet>
      Component: null,
      // 目标组件render 方法  同 <Route render>
      render: null,
      // 错误信息
      error: null,
      // 标记异步是否完成
      completed: false
    }
  }
  setBreadAndMenu(props) {
    let query = {}
    props.location.search
      .slice(1)
      .split('&')
      .forEach((item) => {
        query[item.split('=')[0]] = item.split('=')[1]
      })
    if (props.route.breadList) {
      let breadList = !Array.isArray(props.route.breadList)
        ? props.route.breadList[query.breadType] || []
        : props.route.breadList
      store.dispatch({ type: 'setBread', data: breadList })
    }
    if (props.route.menuInfo) {
      store.dispatch({ type: 'setMenuInfo', data: props.route.menuInfo })
    }
  }
  componentDidMount() {
    const enter = this.setBreadAndMenu({ ...this.props })
    if (isPromise(enter)) {
      // 判断是否是Promise
      enter
        .then((next) => {
          this.handleAfterEnter(next)
        })
        .catch((error) => {
          console.error(error)
          this.setState({ error })
        })
    } else {
      this.handleAfterEnter(enter)
    }
  }
  handleAfterEnter(next) {
    const { route = {}, ...props } = this.props
    // 如果结果是null 或者undefined 或者 true ： 不做任何处理直接渲染组件
    if (next === null || next === undefined || next === true) {
      this.completed(route.component, route.render)
      return
    }
    // 返回false：阻止组件的渲染
    if (next === false) {
      this.completed(null)
      return
    }

    // 返回 string ： 跳转的路由，类似http中302状态码
    // 这里使用 React Router 的 Redirect 做跳转
    if (typeof next === 'string') {
      this.completed(null, () => <Redirect to={next} from={props.location.pathname} />)
      return
    }
    // 返回React 组件
    if (typeof next === 'function' || React.isValidElement(next)) {
      this.completed(null, () => next)
      return
    }

    // 返回 Object: 如果有 redirect=true 的属性，做跳转
    // 否则使用 Route 组件渲染
    if (isPlainObject(next)) {
      const { redirect, ...nextProps } = next
      if (redirect === true) {
        this.completed(null, () => <Redirect {...nextProps} {...{ from: props.location.pathname }} />)
        return
      }
      this.completed(() => <Route {...nextProps} />)
      return
    }
    console.warn(`"${props.location.pathname} => beforeEnter"
        hook return values error. expected null? undefined? true? React.Component? HTMLElement? Route props?
        route props detail to see
        https://reacttraining.com/react-router/web/api/Route
        https://reacttraining.com/react-router/web/api/Redirect`)
    // 例外情况 阻止组件的渲染
    this.completed(null)
  }
  /**
   * 完成后改变state渲染组件：
   * @param component
   * @param render
   */
  completed(component, render) {
    this.setState({ Component: component, render, completed: true, error: null })
  }

  getExtraProps() {
    const { loading: Loading, ...props } = this.props
    return { ...props }
  }
  render() {
    const { Component, render, completed } = this.state
    if (!completed) {
      // 未完成
      return null
    }
    // 已完成
    if (render && typeof render === 'function') {
      return render(this.getExtraProps())
    }
    return Component ? <Component {...this.getExtraProps()} /> : null
  }
}
