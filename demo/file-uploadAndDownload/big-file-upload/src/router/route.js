import Login from '@/pages/login/Login.jsx'
import Layout from '@/pages/layout/Layout.jsx'

import FormDemo from '@/pages/example/formDemo/FormDemo.jsx'
import TableDemo from '@/pages/example/tableDemo/TableDemo.jsx'
import TableFormDemo from '@/pages/example/tableFormDemo/TableFormDemo.jsx'
import SearchDemo from '@/pages/example/searchDemo/SearchDemo.jsx'
import SearchTableDemo from '@/pages/example/searchTableDemo/SearchTableDemo.jsx'
import UploadAndDownload from '@/pages/example/bigFileUpload/UploadAndDownload.jsx'

import UserManage from '@/pages/permissionManage/userManage/UserManage.jsx'
import RoleManage from '@/pages/permissionManage/roleManage/RoleManage.jsx'

export const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/formDemo',
        component: FormDemo,
        breadList: [{ title: 'Form' }],
        menuInfo: { active: ['/formDemo'] }
      },
      {
        path: '/tableDemo',
        component: TableDemo,
        breadList: [{ title: 'Table' }],
        menuInfo: { active: ['/tableDemo'] }
      },
      {
        path: '/tableFormDemo',
        component: TableFormDemo,
        breadList: [{ title: 'TableForm' }],
        menuInfo: { active: ['/tableFormDemo'] }
      },
      {
        path: '/searchDemo',
        component: SearchDemo,
        breadList: [{ title: 'SearchDemo' }],
        menuInfo: { active: ['/searchDemo'] }
      },
      {
        path: '/searchTableDemo',
        component: SearchTableDemo,
        breadList: [{ title: 'SearchTableDemo' }],
        menuInfo: { active: ['/searchTableDemo'] }
      },
      {
        path: '/uploadAndDownload',
        component: UploadAndDownload,
        breadList: [{ title: 'UploadAndDownload' }],
        menuInfo: { open: ['menuFirst'], active: ['/uploadAndDownload'] }
      },
      {
        path: '/userManage',
        component: UserManage,
        breadList: [{ title: '权限管理' }, { title: '用户管理' }],
        menuInfo: { open: ['permissionManage'], active: ['/userManage'] }
      },
      {
        path: '/roleManage',
        component: RoleManage,
        breadList: [{ title: '权限管理' }, { title: '角色管理' }],
        menuInfo: { open: ['permissionManage'], active: ['/roleManage'] }
      },
      { path: '*', redirect: '/index', to: '/index', menuInfo: { active: ['/index'] } }
    ]
  }
]
