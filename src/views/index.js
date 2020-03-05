// import Loadable from 'react-loadable'
// import { Loading } from '../components'

// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import ArticleList from './Article'
// import ArticleEdit from './Article/Edit'


import test from '../lazy'
const Dashboard=test(()=>import('./Dashboard'))
const Login=test(()=>import('./Login'))
const NotFound=test(()=>import('./NotFound'))
const Settings=test(()=>import('./Settings'))
const ArticleList=test(()=>import('./Article'))
const ArticleEdit=test(()=>import('./Article/Edit'))

// const Dashboard = Loadable({
//   loader: () => import('./Dashboard'),
//   loading:Loading
// })
// const Login = Loadable({
//   loader: () => import('./Login'),
//   loading:Loading
// })
// const NotFound = Loadable({
//   loader: () => import('./NotFound'),
//   loading:Loading
// })
// const Settings = Loadable({
//   loader: () => import('./Settings'),
//   loading:Loading
// })
// const ArticleList = Loadable({
//   loader: () => import('./Article'),
//   loading:Loading
// })
// const ArticleEdit = Loadable({
//   loader: () => import('./Article/Edit'),
//   loading:Loading
// })



export {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit
}