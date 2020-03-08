import actionType from '../actions/actionType'
const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))
const initState = {
  ...userInfo,
  isLogin,
  isLoading:false
}
export default (state= initState, action) => {
  switch(action.type) {
    case actionType.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
      case actionType.LOGIN_SUCCESS:
        return {
          ...state,
          ...action.payload.userInfo,
          isLogin:true,
          isLoading:false
        }
        case actionType.LOGIN_FAILED:
          return {
            id:"",
            displayName:"",
            avatat:"",
            isLogin:false,
            isLoading:false
          }
    default:
      return state
  }
}