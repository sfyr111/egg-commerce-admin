/**
 * create by yangran on 2018/3/1
 */

import React from 'react'
import Index from '../index/index'
import Product from '../product/product'
import Categories from '../categories/categories'
import CategoriesList from '../categories-list/categories-list'
import Order from '../order/order'
import Users from '../users/users'

import { router } from '../../router/router'
import { connect } from 'react-redux'
import { logout } from '../../redux/user.redux'
import { Layout, Menu, Icon } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom'

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
      { path: '/categories/1level', title: '一级分类', },
      { path: '/categories/2level', title: '二级分类', },
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
      openKeys: null
    }
  }
  componentDidMount() {
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

  render() {
    const { pathname } = this.props.location
    const page = navList.find(item => item.path === pathname)
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
              onClick={({ key }) => this.props.history.push(`${key}`)}
              onOpenChange={this.openMenu}
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={this.state.openKeys}
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
            >
              {navList.map(item => (
                item.path === '/index' ? <Menu.Item key={item.path}><Icon type={item.icon} />{item.title}</Menu.Item>
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
              <span className="title">{page ? page.title : ''}</span>
              <span onClick={this.props.logout} style={{ marginRight: 50, float: 'right', cursor: 'pointer' }}>登出</span>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#f0f2f5', minHeight: 280 }}>
              <Switch>
                {router.map(item => <Route exact key={item.path} path={item.path} componet={item.component} />)}
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