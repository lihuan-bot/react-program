import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications
} from '../views'

export const mainRoutes = [{
pathname: '/login',
component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
  pathname:'/admin/dashboard',
  componemt: Dashboard,
  title: '仪表盘',
  isNav:true,
  icon:'icon-dashboard'
}, {
  pathname:'/admin/article',
  componemt: ArticleList,
  title: '文章管理',
  isNav:true,
  ecact:true,
  icon:'icon-icon_A'
}, {
  pathname:'/admin/article/edit/:id',
  componemt: ArticleEdit
}, {
  pathname:'/admin/notifications',
  componemt: Notifications
},{
  pathname:'/admin/settings',
  componemt: Settings,
  title: '个人设置',
  isNav:true,
icon:'icon-setting'
}]