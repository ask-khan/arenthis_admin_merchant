import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  READ_NOTIFICATIONS_REQUEST,
  READ_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATIONS_FAIL,
} from "../constants/notificaitonConstant";

// ************************************ GET NOATIFICATION *************************************
function getNotificationsReducer(state = { notifications: {} }, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { loading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      return { loading: false, notifications: action.payload, success: true };
    case GET_NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
// ************************************ Read All Notificatiion *************************************
function ReadAllNotification(state = { notifications: {} }, action) {
  switch (action.type) {
    case READ_NOTIFICATIONS_REQUEST:
      return { loading: true };
    case READ_NOTIFICATIONS_SUCCESS:
      return { loading: false, notifications: action.payload, success: true };
    case READ_NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { getNotificationsReducer, ReadAllNotification };
