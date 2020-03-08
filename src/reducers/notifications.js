import actionType from '../actions/actionType'
const initState = {
  isLoading: false,
  list:[{
    id:" ",
    title: "",
    desc:"",
    hasRead:false,
    avatar:""
  }]
  // }, 
  // {
  //   id:2,
  //   title: "22Ant Design, a design language for",
  //   desc:"222background applications, is refined by Ant UED Team",
  //   hasRead:true,
  //   avatar:' '
  // }]
}
export default(state = initState, action) => {
  switch(action.type) {
    case actionType.RECEIVED_NOTIFICATIONS:
      return {
        ...state,
        list: action.payload.list
      }
    case actionType.START_MARK_AS_READ:
      return {
        ...state,
        isLoading: true
      }
      case actionType.FINISH_MARK_AS_READ:
      return {
        ...state,
        isLoading: false
      }
    case actionType.MAKE_NOTIFICATION_AS_READ_BY_ID:
      const newList = state.list.map(item => {
        if(item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
      case actionType.MAKE_ALL_NOTIFICATION_AS_READ_BY_ID:
        return{
          ...state,
         list:state.list.map(item => {
           item.hasRead = true
           return item
         })
        }

    default:
      return state
  }
}