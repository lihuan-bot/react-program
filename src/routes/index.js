import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications,
  NoAuth,
  Profile
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
  icon:'icon-dashboard',
  roles:["001","002","003"]
}, {
  pathname:'/admin/article',
  componemt: ArticleList,
  title: '文章管理',
  isNav:true,
  ecact:true,
  icon:'icon-icon_A',
  roles:["001","002","003"]
}, {
  pathname:'/admin/article/edit/:id',
  componemt: ArticleEdit,
  roles:["001"]
}, {
  pathname:'/admin/notifications',
  componemt: Notifications,
  roles:["001","002","003"]
},{
  pathname:'/admin/noauth',
  componemt: NoAuth,
  roles:["001","002","003"]
},{
  pathname:'/admin/profile',
  componemt: Profile,
  roles:["001","002","003"]
},{
  pathname:'/admin/settings',
  componemt: Settings,
  title: '设置',
  isNav:true,
  icon:'icon-setting',
  roles:["001","002","003"]
}]