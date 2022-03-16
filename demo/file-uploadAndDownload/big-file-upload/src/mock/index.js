// 使用 mockjs 拦截请求, 模拟响应
import Mock from 'mockjs'

Mock.setup({
  timeout: '400-800'
})

// 匹配 @/mock/modules 目录下所有以 .mock.js 结尾的文件, 自动引入
const context = require.context('./modules', true, /\.mock.js$/)
context.keys().forEach((key) => {
  const module = context(key)
  Object.keys(module).forEach((apiName) => {
    // console.log(apiName, module[apiName])
    const mockMap = module[apiName] // 一个mock映射对象
    let { url, urlReg, method, func } = mockMap
    if (urlReg) {
      // 使用正则表达式做映射
      Mock.mock(urlReg, method, func)
    } else {
      // 使用url字符串做映射
      // 如果url是绝对路径,就不采用mock
      if (url.indexOf('http://') === -1) {
        if (Object.keys(mockMap).length === 2) {
          Mock.mock(url, func)
        } else if (Object.keys(mockMap).length === 3) {
          if (['get', 'GET'].includes(method)) {
            url = new RegExp(url + '.*')
            Mock.mock(url, method, func)
          } else {
            Mock.mock(url, func)
          }
        }
      }
    }
  })
})
