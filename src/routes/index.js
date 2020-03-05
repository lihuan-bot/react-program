import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit
} from '../views'

export const mainRouter = [{
pathname: '/login',
component: Login
}, {
  pathname: '/404',
  component: NotFound
}]

export const adminRouter = [{
  pathname:'/admin/dashboard',
  componemt: Dashboard
}, {
  pathname:'/admin/settings',
  componemt: Settings
}, {
  pathname:'/admin/article',
  componemt: ArticleList,
  ecact:true
}, {
  pathname:'/admin/article/edit/:id',
  componemt: ArticleEdit
}]