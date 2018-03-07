/**
 * create by yangran on 2018/3/1
 */

import React from 'react'

import { router } from '../../router/router'
import { connect } from 'react-redux'
import { logout } from '../../redux/user.redux'
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Route, Redirect, Switch, Link } from 'react-router-dom'

import './dashboard.styl'

const { Header, Content, Footer, Sider } = Layout;
const navList = [
  {
    path: '/index',
    icon: 'home',
    title: '首页',
  },
  {
    path: '/product',
    icon: 'appstore',
    title: '商品管理',
    sub: [
      { path: '/product/list', title: '商品列表', },
      { path: '/product/add', title: '添加商品', },
    ]
  },
  {
    path: '/categories',
    icon: 'appstore-o',
    title: '分类管理',
    sub: [
      // { path: '/categories/1level', title: '一级分类', },
      // { path: '/categories/2level', title: '二级分类', },
      { path: '/categories/list', title: '分类列表', },
      { path: '/categories/add', title: '添加分类', },
    ]
  },
  {
    path:'/order',
    icon:'credit-card',
    title:'订单管理',
    sub: [
      { path: '/order/list', title: '订单列表', },
    ]
  },
  {
    path:'/users',
    icon:'user',
    title:'用户列表',
    sub: [
      { path: '/users/list', title: '用户列表', },
    ]
  },
]

@connect(
  state => state.user,
  { logout }
)
class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
      openKeys: null,
      breadcrumbItems: [router[0]]
    }
  }
  componentDidMount() {
    this.setBreadcrumnb(this.props.location.pathname)
    this.setMenuOpen(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.username) this.props.history.push('/login')
  }

  setMenuOpen = props => {
    const { pathname } = props.location
    this.setState({
      openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))],
    })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  openMenu = (data) => {
    this.setState({
      openKeys: data
    })
  }

  setBreadcrumnb = pathname => {
    if (pathname === '/index') this.setState({ breadcrumbItems: [ this.state.breadcrumbItems[0] ] })
    else {
      const routeItem = router.filter(item => item.path === pathname)
      this.setState({ breadcrumbItems: [ this.state.breadcrumbItems[0], ...routeItem ] })
    }
  }

  clickMenuItem = ({ key }) => {
    this.props.history.push(`${key}`)
    this.setBreadcrumnb(key)
  }

  render() {
    const { pathname } = this.props.location
    return (
      <div id="dashboard">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              onClick={this.clickMenuItem}
              onOpenChange={this.openMenu}
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={this.state.openKeys}
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
            >
              {navList.map(item => (
                item.path === '/index' ? <Menu.Item key={item.path}><Icon type={item.icon} /><span>{item.title}</span></Menu.Item>
                : <Menu.SubMenu key={item.path} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                  {!item.hasOwnProperty('sub') ? null : item.sub.map(subItem => <Menu.Item key={subItem.path}>{subItem.title}</Menu.Item>)}
                </Menu.SubMenu>
              ))}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <span>管理员: {this.props.username}</span>
              <span onClick={this.props.logout} style={{ marginRight: 50, float: 'right', cursor: 'pointer' }}>登出</span>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 0, background: '#f0f2f5', height: '100%' }}>
              <Breadcrumb>
                {this.state.breadcrumbItems.map(item => (<Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>))}
              </Breadcrumb>
              <Switch>
                {router.map(item => <Route exact key={item.path} path={item.path} component={item.component} />)}
                <Route render={() => <Redirect to='/404' />} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              egg-commerce-admin ©2018 Created by sfyi111
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Dashboard