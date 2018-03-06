export const router = [
  { path: '/index', title: '首页', component: '/index' },
  { path: '/product/list', title: '商品列表', component: '/product/list', },
  { path: '/product/add', title: '添加商品', component: '/product/add', },
  { path: '/categories/1level', title: '一级分类', component: '/categories/1level', },
  { path: '/categories/2level', title: '二级分类', component: '/categories/2level', },
  { path: '/categories/add', title: '添加分类', component: '/categories/add', },
  { path: '/categories/:id', component: '/categories/:id' },
  { path: '/order/list', title: '订单列表', component: '/order/list', },
  { path: '/users/list', title: '用户列表', component: '/users/list', },
]