import actionType from './actionType'
import { getNotifications } from '../network'

const startMarkAsRead = () => {
  return {
    type: actionType.START_MARK_AS_READ
  }
}
const finishMarkAsRead = () => {
  return {
    type: actionType.FINISH_MARK_AS_READ
  }
}
export const markNotificationAsReadById = id => {
  return dispatch => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
      dispatch({
        type: actionType.MAKE_NOTIFICATION_AS_READ_BY_ID,
        payload: {
          id
        }
      })
      dispatch(finishMarkAsRead())
    }, 200);
  }
}
export const markAllNotificationAsReadById = () => {
  return dispatch => {
    dispatch(startMarkAsRead())
    setTimeout(() => {
      dispatch({
        type: actionType.MAKE_ALL_NOTIFICATION_AS_READ_BY_ID
      })
      dispatch(finishMarkAsRead())
    }, 300);
  }
}
export const getAllNotification = () => {
  return dispatch => {
    dispatch(startMarkAsRead())
    getNotifications()
    .then(res => {
      dispatch({
        type: actionType.RECEIVED_NOTIFICATIONS,
        payload:{
        list: res.data.list
        }
      })
      
    })
      dispatch(finishMarkAsRead())
    
  }
}