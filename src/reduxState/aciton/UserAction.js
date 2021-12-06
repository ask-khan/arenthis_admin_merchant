import Cookies from 'universal-cookie';
import instance from '../../Config/axios';
import {
	GET_USERS_REQUEST,
	GET_USERS_SUCCESS,
	GET_USERS_FAIL,
	GET_USERS_BY_ID_REQUEST,
	GET_USERS_BY_ID_SUCCESS,
	GET_USERS_BY_ID_FAIL,
	USER_UPDATE_PASSWORD_REQUEST,
	USER_UPDATE_PASSWORD_SUCCESS,
	USER_UPDATE_PASSWORD_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_AVATAR_REQUEST,
	USER_UPDATE_AVATAR_SUCCESS,
	USER_UPDATE_AVATAR_FAIL,
	GET_USER_INFO_REQUEST,
	GET_USER_INFO_SUCCESS,
	GET_USER_INFO_FAIL,
	GET_MERCHANT_INFO_REQUEST,
	GET_MERCHANT_INFO_SUCCESS,
	GET_MERCHANT_INFO_FAIL,
} from '../constants/Userconstant';
import { toggleSnackbarOpenAction } from './snackbarAction';

const cookies = new Cookies();

// ******************************* Get User ****************************************
const getUserAction = (Page, Limit) => async (dispatch) => {
	try {
		dispatch({ type: GET_USERS_REQUEST });
		const { data } = await instance.post(`/api/customers?page=${Page}&perPage=${Limit}`);
		dispatch({ type: GET_USERS_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log(error.response);
		dispatch({ type: GET_USERS_FAIL, payload: error.response });
	}
};

// ******************************* Get User BY ID****************************************
const getUserByIdAction = (userId) => async (dispatch) => {
	try {
		dispatch({ type: GET_USERS_BY_ID_REQUEST });
		const { data } = await instance.get(`/api/customers/${userId}`);
		dispatch({ type: GET_USERS_BY_ID_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log(error.response);
		dispatch({ type: GET_USERS_BY_ID_FAIL, payload: error.response });
	}
};

// *********************************userUpdatePasswordAction*************************************
const userUpdatePasswordAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_UPDATE_PASSWORD_REQUEST, payload: formData });
	const { password, newPassword } = formData;
	const bodyParameters = { password, newPassword };
	try {
		const { data } = await instance.patch(`/api/v1/users/updateMyPassword/`, bodyParameters);
		const { status, token } = data;
		if (status === 'success') {
			cookies.remove('token', token, { path: '/' });
			cookies.set('token', token, { path: '/' });
			dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data, success: true });
			dispatch(toggleSnackbarOpenAction('Congrats password  is update!', 'success'));
		}
	} catch (error) {
		dispatch({ type: USER_UPDATE_PASSWORD_FAIL, payload: error.response });
		dispatch(toggleSnackbarOpenAction(`${error?.response?.data?.message}`, 'error'));
	}
};

// *********************************userUpdateProfileAction*************************************
const userUpdateProfileAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: formData });
	try {
		const { data } = await instance.patch(`/api/v1/users/updateUser`, formData);
		const { status } = data;
		if (status === 'success') {
			dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data, success: true });
			dispatch(toggleSnackbarOpenAction('Congrats profile  is update!', 'success'));
		}
	} catch (error) {
		dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: error.response });
		dispatch(toggleSnackbarOpenAction('Something went wrong!', 'error'));
	}
};

// *********************************userUpdateAvatarAction*************************************
const userUpdateAvatarAction = (formValues) => async (dispatch) => {
	dispatch({ type: USER_UPDATE_AVATAR_REQUEST, payload: formValues });

	const formData = new FormData();
	formData.append('avatar', formValues);

	try {
		const { data } = await instance.patch(`/api/v1/users/upload-avatar`, formData);
		const { status } = data;
		if (status === 'success') {
			dispatch({ type: USER_UPDATE_AVATAR_SUCCESS, payload: data, success: true });
			dispatch(toggleSnackbarOpenAction('Congrats profile picture is update!', 'success'));
		}
	} catch (error) {
		dispatch({ type: USER_UPDATE_AVATAR_FAIL, payload: error.response });
		dispatch(toggleSnackbarOpenAction('Something went wrong!', 'error'));
	}
};

// *********************************getUserInfoAction*************************************
const getUserInfoAction = () => async (dispatch) => {
	dispatch({ type: GET_USER_INFO_REQUEST });
	try {
		const { data } = await instance.get(`/api/v1/users/Me`);
		const { status, doc } = data;
		if (status === 'success') {
			dispatch({ type: GET_USER_INFO_SUCCESS, payload: doc, updtsuccess: true });
		}
	} catch (error) {
		dispatch({ type: GET_USER_INFO_FAIL, payload: error.response });
	}
};

// *********************************getMerchantInfoAction*************************************
const getMerchantInfoAction = () => async (dispatch) => {
	dispatch({ type: GET_MERCHANT_INFO_REQUEST });
	try {
		const { data } = await instance.get(`/api/v1/merchants/merchantInfo`);
		const { status } = data;
		if (status === 'success') {
			dispatch({ type: GET_MERCHANT_INFO_SUCCESS, payload: data, updtsuccess: true });
		}
	} catch (error) {
		dispatch({ type: GET_MERCHANT_INFO_FAIL, payload: error.response });
	}
};

export {
	getUserAction,
	getUserByIdAction,
	userUpdateProfileAction,
	userUpdatePasswordAction,
	userUpdateAvatarAction,
	getUserInfoAction,
	getMerchantInfoAction,
};
