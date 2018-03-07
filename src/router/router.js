import React from 'react'

import Index from '../component/index/index'
import Product from '../component/product/product'
import Categories from '../component/categories/categories'
import CategoriesList from '../component/categories-list/categories-list'
import CategoriesAdd from '../component/categories-add/categories-add'
import Order from '../component/order/order'
import Users from '../component/users/users'

export const router = [
  { path: '/index', title: '首页', component: Index },
  { path: '/product/list', title: '商品列表', component: null, },
  { path: '/product/add', title: '添加商品', component: null, },
  // { path: '/categories/1level', title: '一级分类', component: CategoriesList, },
  // { path: '/categories/2level', title: '二级分类', component: null, },
  { path: '/categories/list', title: '分类列表', component: CategoriesList },
  { path: '/categories/list/:id', title: '分类列表', component: CategoriesList },
  { path: '/categories/add', title: '添加分类', component: CategoriesAdd, },
  { path: '/order/list', title: '订单列表', component: null, },
  { path: '/users/list', title: '用户列表', component: null, },
]