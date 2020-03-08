import actionType from './actionType'
import { loginRequest } from '../network'

const startLogin = () => {
  return {
    type: actionType.START_LOGIN
  }
}
const loginSuccess = (userInfo) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    payload:{
      userInfo
    }
  }
}
const loginFailed = () => {
  window.localStorage.removeItem('authToken')
  window.sessionStorage.removeItem('authToken')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('userInfo')
  return {
    type: actionType.LOGIN_FAILED
  }
}
export const logout = () => {
  return dispatch => {
    // 实际项目要请求
    dispatch(loginFailed())
  }
}
export const login = (userInfo) =>{
  return dispatch => {
    dispatch(startLogin())
    loginRequest(userInfo)
    .then(res => {
      if(res.data.code === 200) {  
        if(userInfo.remember === true) {
          window.localStorage.setItem('authToken',res.data.data.authToken)
          window.localStorage.setItem('userInfo',JSON.stringify(res.data.data))
        }else {
          window.sessionStorage.setItem('authToken',res.data.data.authToken)
          window.sessionStorage.setItem('userInfo',JSON.stringify(res.data.data))
        }
        dispatch(loginSuccess(res.data.data))
      }else {
        dispatch(loginFailed())
      }
      
    })
  }
}