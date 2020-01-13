import Mock from 'mockjs'

import * as cccccccc from './CCCCCCCC/cccccccc'
import * as cccccccc from './CCCCCCCC/cccccccc'
import * as bbbbbb from './BBBBBBB/bbbbbb'
import * as aaaaaa from './AAAAAA/aaaaaa'
import * as user from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 50
})

Mock.mock(/\/user\/info/, user.getUserInfo)
Mock.mock(/\/user\/login/, user.login)
Mock.mock(/\/user\/logout/, user.logout)
