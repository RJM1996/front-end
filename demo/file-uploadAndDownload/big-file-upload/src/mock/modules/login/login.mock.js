import * as API from '@/api/login/login.api.js'

export const loginAPI = {
  ...API.loginAPI,
  func: (req) => {
    return {
      code: 200,
      msg: 'ok',
      data: '登录成功'
    }
    // return {
    //   code: 1001,
    //   msg: '密码错误',
    //   data: {}
    // }
  }
}

export const logoutAPI = {
  ...API.logoutAPI,
  func: (req) => {
    return {
      code: 200,
      msg: 'ok',
      data: '退出成功'
    }
  }
}

export const getUserInfoAPI = {
  ...API.getUserInfoAPI,
  func: (req) => {
    let data = {
      name: 'admin',
      menuList: [
        {
          title: '首页',
          icon: 'AppstoreOutlined',
          path: '/index'
        },
        {
          title: 'Form',
          icon: 'BarChartOutlined',
          path: '/formDemo'
        },
        {
          title: 'Table',
          icon: 'BarChartOutlined',
          path: '/tableDemo'
        },
        {
          title: 'TableForm',
          icon: 'BarChartOutlined',
          path: '/tableFormDemo'
        },
        {
          title: 'Search',
          icon: 'BarChartOutlined',
          path: '/searchDemo'
        },
        {
          title: 'SearchTableDemo',
          icon: 'BarChartOutlined',
          path: '/searchTableDemo'
        },
        {
          title: '菜单一',
          key: 'menuFirst',
          icon: 'CloudOutlined',
          children: [
            {
              title: '文件上传和下载',
              path: '/uploadAndDownload'
            }
          ]
        },
        {
          title: '权限管理',
          key: 'permissionManage',
          icon: 'CloudOutlined',
          children: [
            {
              title: '用户管理',
              path: '/userManage'
            },
            {
              title: '角色管理',
              path: '/roleManage'
            }
          ]
        }
      ]
    }
    return {
      code: 200,
      msg: 'ok',
      data
    }
  }
}
