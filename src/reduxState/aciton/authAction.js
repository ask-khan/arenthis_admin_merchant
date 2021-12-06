import Cookies from 'universal-cookie';
import instance from '../../Config/axios';
import { toggleSnackbarOpenAction } from './snackbarAction';

const cookies = new Cookies();

const {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_LOGIN_FAIL,
	USER_LOGOUT,

	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_RESEND_OTP_REQUEST,
	USER_RESEND_OTP_SUCCESS,
	USER_RESEND_OTP_FAIL,
	USER_VERIFY_EMAIL_OTP_REQUEST,
	USER_VERIFY_EMAIL_OTP_SUCCESS,
	USER_VERIFY_EMAIL_OTP_FAIL,
	USER_FORGOT_PASSWORD_REQUEST,
	USER_FORGOT_PASSWORD_SUCCESS,
	USER_FORGOT_PASSWORD_FAIL,
	USER_VERIFY_FORGOT_PASSWORD_OTP_REQUEST,
	USER_VERIFY_FORGOT_PASSWORD_OTP_SUCCESS,
	USER_VERIFY_FORGOT_PASSWORD_OTP_FAIL,
	USER_FORGOT_PASSWORD_RESEND_OTP_REQUEST,
	USER_FORGOT_PASSWORD_RESEND_OTP_SUCCESS,
	USER_FORGOT_PASSWORD_RESEND_OTP_FAIL,
	USER_RESTORED_PASSWORD_REQUEST,
	USER_RESTORED_PASSWORD_SUCCESS,
	USER_RESTORED_PASSWORD_FAIL,
} = require('../constants/authConstant');

// ********** userLoginAction **********
const userLoginAction = (formData) => async (dispatch) => {
	const formValues = { phone: { countryCode: '60', contact: formData.contact }, password: formData.secretKey };
	dispatch({ type: USER_LOGIN_REQUEST, payload: formData });
	console.log('formValues', formValues);
	try {
		// const { data } = await instance.post('/auth/login-Restaurant', formValues);
		const { data } = await instance.post('/auth/merchantLogin', formValues);
		if (data) {
			cookies.set('userInfo', data, { path: '/' });
			cookies.set('token', data.token, { path: '/' });
			dispatch(toggleSnackbarOpenAction(`Login successfull!`, 'success'));
			dispatch({ type: USER_LOGIN_SUCCESS, payload: data && data, success: true });
		}
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message });
		dispatch(toggleSnackbarOpenAction(`${error.response?.data?.message}`, 'error'));
	}
};

// *********************************FacebookLoginAction*************************************
const facebookLoginAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_LOGIN_REQUEST, payload: formData });
	try {
		const { data } = await instance.post('/auth/merchant-facebookLogin', formData);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data && data, success: true });
		if (data) {
			cookies.set('userInfo', data, { path: '/' });
			cookies.set('token', data.token, { path: '/' });
		}
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message });
		dispatch(toggleSnackbarOpenAction(`${error.response?.data?.message}`, 'error'));
	}
};
// *********************************GoogleLoginAction*************************************
const googleLoginAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_LOGIN_REQUEST, payload: formData });
	try {
		const { data } = await instance.post('/auth/merchant-GoogleLogin', formData);
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data && data, success: true });
		if (data) {
			cookies.set('userInfo', data, { path: '/' });
			cookies.set('token', data.token, { path: '/' });
		}
	} catch (error) {
		dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data?.message });
		dispatch(toggleSnackbarOpenAction(`${error.response?.data?.message}`, 'error'));
	}
};

// *********************************userLogoutAction*************************************
const userLogoutAction = () => async (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	cookies.remove('userInfo', { path: '/' });
	cookies.remove('token', { path: '/' });
	window.location.href = '/';
};

// *********************************userRegisterAction*************************************
const userRegisterAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: formData });
	try {
		const { data } = await instance.post('/api/v1/users/register-merchant', formData);
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data, success: true });
		if (data) {
			cookies.set('userInfo', data, { path: '/' });
			cookies.set('token', data.token, { path: '/' });
		}
	} catch (error) {
		console.log(error?.response?.data);
		dispatch({ type: USER_REGISTER_FAIL, payload: error?.response });

		if (error.response.data.errors.length > 0) {
			let err = error.response.data.errors;
			err.forEach((message) => {
				dispatch(toggleSnackbarOpenAction(`${message.message}`, 'error'));
			});
		}
	}
};

// *********************************userForgotPasswordAction*************************************
const userForgotPasswordAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_FORGOT_PASSWORD_REQUEST, payload: formData });
	try {
		let value = { phone: { countryCode: '60', contact: formData.contact } };

		const { data } = await instance.post('/auth/forgotPassword', value);
		const { message, status } = data;
		if (status === 'success') {
			console.log(value);
			dispatch(toggleSnackbarOpenAction(`${message}`, 'success'));
			dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: { message, phone: value.phone }, success: true });
		}
	} catch (error) {
		dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: error?.response });
		dispatch(toggleSnackbarOpenAction(`${error.response?.data?.Error}`, 'error'));
	}
};

// *********************************userForgotPasswordResendOtpAction*************************************
const userForgotPasswordResendOtpAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_FORGOT_PASSWORD_RESEND_OTP_REQUEST });
	try {
		const { data } = await instance.post('/auth/forgotPassword', formData);
		const { message, status } = data;
		if (status === 'success') {
			dispatch(toggleSnackbarOpenAction(`${message}`, 'success'));
			dispatch({ type: USER_FORGOT_PASSWORD_RESEND_OTP_SUCCESS, payload: message, success: true });
		} else {
			dispatch(toggleSnackbarOpenAction(`Something went wrong!`, 'error'));
		}
	} catch (error) {
		dispatch({ type: USER_FORGOT_PASSWORD_RESEND_OTP_FAIL, payload: error?.response });
	}
};

// *********************************userPasswordRestoreAction*************************************
const userPasswordRestoreAction = (token, password) => async (dispatch) => {
	dispatch({ type: USER_RESTORED_PASSWORD_REQUEST, payload: password });
	const bodyParameters = { password };
	try {
		const { data } = await instance.patch(`/auth/resetPassword/${token}`, bodyParameters);
		const { status, message } = data;
		if (status === 'success') {
			dispatch(toggleSnackbarOpenAction(message, 'success'));
			dispatch({ type: USER_RESTORED_PASSWORD_SUCCESS, payload: message, success: true });
			dispatch({ type: USER_LOGOUT });
		}
	} catch (error) {
		dispatch({ type: USER_RESTORED_PASSWORD_FAIL, payload: error?.response });
		dispatch(toggleSnackbarOpenAction(`Something went wrong!`, 'error'));
	}
};

// *********************************userResendOtpAction*************************************
const userResendOtpAction = () => async (dispatch) => {
	dispatch({ type: USER_RESEND_OTP_REQUEST });
	try {
		const { data } = await instance.patch('/auth/generateEmailOtp');
		console.log('userResendOtpAction', data);
		const { status, message } = data;
		if (status === 'success') {
			dispatch(toggleSnackbarOpenAction(`${message}`, 'success'));
			dispatch({ type: USER_RESEND_OTP_SUCCESS, payload: data, success: true });
		}
	} catch (error) {
		dispatch({ type: USER_RESEND_OTP_FAIL, payload: error?.response });
		dispatch(toggleSnackbarOpenAction(`Something went wrong!`, 'error'));
	}
};

// *********************************userVerifyEmailOtpAction*************************************
const userVerifyEmailOtpAction = (phone, emailOtp) => async (dispatch) => {
	dispatch({ type: USER_VERIFY_EMAIL_OTP_REQUEST });
	const bodyParameters = { phone, otp: emailOtp };
	try {
		const { data } = await instance.patch('/auth/verifyUserOtp', bodyParameters);
		const { status, message } = data;
		if (status === 'success') {
			dispatch(toggleSnackbarOpenAction(`${message}`, 'success'));
			cookies.remove('userInfo', { path: '/' });
			cookies.set('userInfo', data, { path: '/' });
			dispatch({ type: USER_VERIFY_EMAIL_OTP_SUCCESS, payload: data, success: true });
		}
	} catch (error) {
		let msg = error?.response?.data?.message || 'Incorrect Otp!';
		dispatch({ type: USER_VERIFY_EMAIL_OTP_FAIL, payload: error?.response });
		dispatch(toggleSnackbarOpenAction(`${msg}`, 'error'));
	}
};

// *********************************userVerifyForgotPasswordOtpAction*************************************
const userVerifyForgotPasswordOtpAction = (formData) => async (dispatch) => {
	dispatch({ type: USER_VERIFY_FORGOT_PASSWORD_OTP_REQUEST, payload: formData });

	console.log(formData, 'formdata');
	try {
		const { data } = await instance.patch('/auth/verifyPasswordOtp', formData);
		const { status } = data;
		if (status === 'success') {
			const { token } = data;
			dispatch({ type: USER_VERIFY_FORGOT_PASSWORD_OTP_SUCCESS, payload: token, vfsuccess: true });
		}
	} catch (error) {
		dispatch({ type: USER_VERIFY_FORGOT_PASSWORD_OTP_FAIL, payload: error?.response });
		dispatch(toggleSnackbarOpenAction(`${error?.response?.data?.messages}`, 'error'));
	}
};

export {
	userLoginAction,
	userLogoutAction,
	userRegisterAction,
	userForgotPasswordAction,
	userPasswordRestoreAction,
	userResendOtpAction,
	userForgotPasswordResendOtpAction,
	userVerifyEmailOtpAction,
	userVerifyForgotPasswordOtpAction,
	facebookLoginAction,
	googleLoginAction,
};
