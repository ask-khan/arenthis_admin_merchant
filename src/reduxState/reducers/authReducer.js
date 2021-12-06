import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_RESTORED_PASSWORD_REQUEST,
	USER_RESTORED_PASSWORD_SUCCESS,
	USER_RESTORED_PASSWORD_FAIL,
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
	USER_LOGOUT,
	USER_FORGOT_PASSWORD_RESEND_OTP_REQUEST,
	USER_FORGOT_PASSWORD_RESEND_OTP_SUCCESS,
	USER_FORGOT_PASSWORD_RESEND_OTP_FAIL,
} from '../constants/authConstant';

// **********************************user Login Reducer******************************************
function userLoginReducer(state = {}, action) {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************user Register Reducer*************************************
function userRegisterReducer(state = {}, action) {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************user Forgot Password Reducer*************************************
function userForgotPasswordReducer(state = {}, action) {
	switch (action.type) {
		case USER_FORGOT_PASSWORD_REQUEST:
			return { loading: true, email: action.payload };
		case USER_FORGOT_PASSWORD_SUCCESS:
			return { loading: false, message: action.payload.message, success: true, phone: action.payload.phone };
		case USER_FORGOT_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}
// ************************************user Password Restore Reducer*************************************
function userPasswordRestoreReducer(state = {}, action) {
	switch (action.type) {
		case USER_RESTORED_PASSWORD_REQUEST:
			return { loading: true };
		case USER_RESTORED_PASSWORD_SUCCESS:
			return { loading: false, message: action.payload, success: true };
		case USER_RESTORED_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************user Resend Otp Reducer*************************************
function userResendOtpReducer(state = {}, action) {
	switch (action.type) {
		case USER_RESEND_OTP_REQUEST:
			return { loading: true };
		case USER_RESEND_OTP_SUCCESS:
			return { loading: false, message: action.payload.message, success: true };
		case USER_RESEND_OTP_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************user Resend Otp Reducer*************************************
function userForgotPasswordResendOtpReducer(state = {}, action) {
	switch (action.type) {
		case USER_FORGOT_PASSWORD_RESEND_OTP_REQUEST:
			return { loading: true };
		case USER_FORGOT_PASSWORD_RESEND_OTP_SUCCESS:
			return { loading: false, otpmessage: action.payload, success: true };
		case USER_FORGOT_PASSWORD_RESEND_OTP_FAIL:
			return { loading: false, otperror: action.payload };
		default:
			return state;
	}
}

// ************************************user Verify Email Otp Reducer*************************************
function userVerifyEmailOtpReducer(state = {}, action) {
	switch (action.type) {
		case USER_VERIFY_EMAIL_OTP_REQUEST:
			return { vfloading: true };
		case USER_VERIFY_EMAIL_OTP_SUCCESS:
			return { vfloading: false, vfmessage: action.payload.message, vfsuccess: true };
		case USER_VERIFY_EMAIL_OTP_FAIL:
			return { vfloading: false, vferror: action.payload };
		default:
			return state;
	}
}

// ************************************user Verify Forgot Password Otp Reducer*************************************
function userVerifyForgotPasswordOtpReducer(state = {}, action) {
	switch (action.type) {
		case USER_VERIFY_FORGOT_PASSWORD_OTP_REQUEST:
			return { vfloading: true };
		case USER_VERIFY_FORGOT_PASSWORD_OTP_SUCCESS:
			return { vfloading: false, token: action.payload, vfsuccess: true };
		case USER_VERIFY_FORGOT_PASSWORD_OTP_FAIL:
			return { vfloading: false, vferror: action.payload };
		default:
			return state;
	}
}

export {
	userLoginReducer,
	userRegisterReducer,
	userForgotPasswordReducer,
	userPasswordRestoreReducer,
	userResendOtpReducer,
	userForgotPasswordResendOtpReducer,
	userVerifyEmailOtpReducer,
	userVerifyForgotPasswordOtpReducer,
};
