import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import store from '@/store'
import { setCollapsed } from '@/store/actionCreators.js'
import { logoutAPI, getUserInfoAPI } from '@/store/modules/login/login.store.js'
import { Layout, Menu, Breadcrumb, Avatar, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { MenuUnfoldOutlined, MenuFoldOutlined, AppstoreOutlined, BarChartOutlined, CloudOutlined, SettingOutlined } from '@ant-design/icons'
import './style/layout.less'

const { Header, Sider, Content } = Layout

class LayoutUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      collapsed: false,
      menuList: []
    }
  }
  componentDidMount() {
    this._getUserInfo()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      // 当路由改变时,更新左边导航菜单
      this._getUserInfo()
    }
  }
  // 获取用户信息和导航菜单
  _getUserInfo = () => {
    getUserInfoAPI({})
      .then((res) => {
        this.setState({
          username: res.name,
          menuList: res.menuList
        })
      })
      .catch((err) => {
        // 获取用户信息和导航菜单出错,应该跳到登录页面
        this._logout()
      })
  }
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed }, () => {
      // 将菜单栏是否收起的状态存入store
      store.dispatch(setCollapsed(this.state.collapsed))
    })
  }
  // 点击一二级菜单均用store管理展开月当前激菜单
  clickMenu = (e) => {
    store.dispatch({ type: 'setMenuInfo', data: { ...store.getState().menuInfo, active: e.key } })
    // // 跳转相同标签刷新当前页面
    if (this.props.history.location.pathname === e.key) window.location.reload()
    this.props.history.push(e.key)
  }
  selectSubMenu = (e) => {
    let open = [...e].pop() ? [[...e].pop()] : []
    store.dispatch({ type: 'setMenuInfo', data: { ...store.getState().menuInfo, open } })
  }

  renderMenu = (menuList) => {
    return menuList.map((item, index) => {
      const iconMap = {
        AppstoreOutlined: AppstoreOutlined,
        BarChartOutlined: BarChartOutlined,
        CloudOutlined: CloudOutlined,
        SettingOutlined: SettingOutlined
      }

      const icon = React.createElement(iconMap[item.icon])
      const menuItem =
        item.children && item.children.length ? (
          <Menu.SubMenu key={item.key} icon={icon} title={item.title}>
            {item.children.map((_item, _index) => (
              <Menu.Item key={_item.path}>{_item.title}</Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.path} icon={icon}>
            {item.title}
          </Menu.Item>
        )
      return menuItem
    })
  }

  _logout = () => {
    logoutAPI()
      .then((res) => {
        this.props.history.push({ pathname: '/login' })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { collapsed } = this.state

    return (
      <Layout>
        <Sider
          className='my-sider'
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint='lg'
          onBreakpoint={(broken) => {
            this.setState({ collapsed: broken })
          }}>
          <div className='logo'></div>
          <Menu
            theme='dark'
            mode='inline'
            onClick={this.clickMenu}
            onOpenChange={this.selectSubMenu}
            openKeys={store.getState().menuInfo.open}
            selectedKeys={store.getState().menuInfo.active}>
            {this.renderMenu(this.state.menuList)}
          </Menu>
        </Sider>
        <Layout className='site-layout' style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Header className={'site-layout-header'}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle
            })}
            <Breadcrumb className={'breadcrumb'}>
              {store.getState().breadList.map((item, index) => {
                const breadChildren = item.path ? <Link to={item.path}>{item.title}</Link> : item.title
                return <Breadcrumb.Item key={index}>{breadChildren}</Breadcrumb.Item>
              })}
            </Breadcrumb>
            <div className='userInfo'>
              <Space>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                <span>{this.state.username}</span>
                <span>
                  <a onClick={this._logout}>退出</a>
                </span>
              </Space>
            </div>
          </Header>
          <Content className={'site-layout-content'}>{this.props.children}</Content>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(LayoutUI)
