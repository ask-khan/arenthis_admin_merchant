import instance from '../../Config/axios';
import {
	GET_NOTIFICATIONS_REQUEST,
	GET_NOTIFICATIONS_SUCCESS,
	GET_NOTIFICATIONS_FAIL,
	READ_NOTIFICATIONS_REQUEST,
	READ_NOTIFICATIONS_SUCCESS,
	READ_NOTIFICATIONS_FAIL,
} from '../constants/notificaitonConstant';

// ******************************* Get Notification ****************************************
const getAllNotification =
	(Page = 0, Limit = 5) =>
	async (dispatch) => {
		try {
			dispatch({ type: GET_NOTIFICATIONS_REQUEST });
			const { data } = await instance.get(`/api/v1/notification/merchant?`);
			console.log(data);
			dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data, success: true });
		} catch (error) {
			console.log(error.response);
			dispatch({ type: GET_NOTIFICATIONS_FAIL, payload: error.response });
		}
	};

// ******************************* ReadAll  Notification ****************************************
const readAllNotification = (setUnRead) => async (dispatch) => {
	try {
		dispatch({ type: READ_NOTIFICATIONS_REQUEST });
		const { data } = await instance.patch(`/api/v1/notification/merchant/readAll`);
		setUnRead(0);
		dispatch({ type: READ_NOTIFICATIONS_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: READ_NOTIFICATIONS_FAIL, payload: error.response });
	}
};

export { getAllNotification, readAllNotification };
