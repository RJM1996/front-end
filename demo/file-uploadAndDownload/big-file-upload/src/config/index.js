const config = {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: '',
    pro: '/api'
  },
  /**
   * @description http请求成功状态码
   */
  httpStatus: 200,
  /**
   * @description http请求登录过期状态码
   */
  expiryStatus: 2005,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {},
  // token 的key名
  TOKEN_KEY: 'token'
}

export default config
