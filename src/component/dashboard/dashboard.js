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

import { connect } from 'react-redux'
import { logout } from '../../redux/user.redux'
import { Layout, Menu, Icon } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom'

import './dashboard.styl'

const { Header, Content, Footer, Sider } = Layout;

@connect(
  state => state.user,
  { logout }
)
class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const navList = [
      {
        path: '/index',
        icon: 'home',
        title: '首页',
        component: Index,
      },
      {
        path: '/product',
        icon: 'appstore',
        title: '商品管理',
        component: Product,
      },
      {
        path: '/categories',
        icon: 'appstore-o',
        title: '分类管理',
        component: Categories,
      },
      {
        path: '/categories/:id',
        component: CategoriesList
      },
      {
        path:'/order',
        icon:'credit-card',
        title:'订单管理',
        component: Order
      },
      {
        path:'/users',
        icon:'user',
        title:'用户列表',
        component: Users
      },
    ]
    const { pathname } = this.props.location
    const page = navList.find(item => item.path === pathname)
    return (
      <div id="dashboard">
        {this.props.username ? null : <Redirect to='/login' />}
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu onClick={({ key }) => this.props.history.push(key)} theme="dark" mode="inline" defaultSelectedKeys={['/index']}>
              {navList.map(item => item.hasOwnProperty('title')
                ? (<Menu.Item key={item.path}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>)
                : null)}
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
                {pathname === '/' ? <Redirect to='/index' /> : null}
                {navList.map(item => <Route key={item.path} path={item.path} component={item.component} exact />)}
              </Switch>
              {/*{page ? <Route key={page ? page.path : ''} path={page ? page.path : '/login'} component={page ? page.component : null} /> : <Redirect to='/index' />}*/}
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Dashboard