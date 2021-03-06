import axios from 'axios'
import { message } from 'antd'
// const isDev = process.env.NODE_ENV === "development"
const service = axios.create({
  baseURL:"http://rap2.taobao.org:38080/app/mock/246369"
})
const request = axios.create({
  baseURL:"http://rap2.taobao.org:38080/app/mock/246369"
})

service.interceptors.request.use(  config => {
  config.data = Object.assign({}, config.data, {
    // authToken: window.localStorage.getItem('authToken') 
    authToken: 'test'
  })
  return config
})

service.interceptors.response.use(resp => {
  if(resp.data.code === 200) {
    return resp.data
  } else {
    // 全局处理错误
    message.error(resp.data.errMsg)
  }
})

export const getArticles = (offset=0,limited=20) => {
  return service.post('/api/v1/articleList',{
    offset,
    limited
  })
}
export const deleteArtileById = id => {
  return service.post('/api/v1/articleDelite',{
    id
  })
}
export const getArticleById = id => {
  return service.post(`/api/v1/article/${id}`)
}
export const saveArticleById = (id, data)=> {
  return service.post(`/api/v1/articleEdit/${id}`,data)
}
export const getArticleAmount = ()=> {
  return service.post('/api/v1/articleAmount')
}
export const getNotifications = () => {
  return service.post('/api/v1/notification')
}
export const loginRequest = (userInfo) => {
  return request.post('/api/v1/login',userInfo)
}