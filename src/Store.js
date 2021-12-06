import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';

import {
	cancelOrderReducer,
	clashProductsReducer,
	completeOrderReducer,
	GetOrderByIdReducer,
	GetOrderReducer,
	returnOrderReducer,
	returnProductsReducer,
	verifyOrderReducer,
} from './reduxState/reducers/orderReducer';
import { AddProductsReducer, GetProductsReducer } from './reduxState/reducers/ProductsReducer';
import {
	getMerchantInfoReducer,
	getUserByIdReducer,
	getUserInfoReducer,
	getUserReducer,
	userUpdateAvatarReducer,
	userUpdatePasswordReducer,
	userUpdateProfileReducer,
} from './reduxState/reducers/UserReducer';
import restaurantProducts from './reduxState/reducers/createRestaurantReducer';
import restaurantTimeSchedule from './reduxState/reducers/timeReducer';
import {
	userForgotPasswordReducer,
	userForgotPasswordResendOtpReducer,
	userLoginReducer,
	userPasswordRestoreReducer,
	userRegisterReducer,
	userResendOtpReducer,
	userVerifyEmailOtpReducer,
	userVerifyForgotPasswordOtpReducer,
} from './reduxState/reducers/authReducer';
import { approvalFormReducer, aprrovedDetailReducer } from './reduxState/reducers/approvalFormReducer';
import { fileUrlReducer } from './reduxState/reducers/fileUrlReducer';
import { createRestaurantReducer, getRestaurantDetailReducer } from './reduxState/reducers/shopReducer';
import { generateRestaurantSecKeyReducer, getRestaurantSecKeyReducer } from './reduxState/reducers/secretKeyReducer';
import { snackbarReducer } from './reduxState/reducers/snackbarReducer';
import { USER_LOGOUT } from './reduxState/constants/authConstant';
import { getNotificationsReducer } from './reduxState/reducers/notificationReducer';
import { readAllNotification } from './reduxState/aciton/notificationAction';
import {
	addOutletsReducers,
	addRestaurantReducer,
	getOutletDetailReducers,
	getOutletsReducers,
	getRestaurantReducer,
} from './reduxState/reducers/restaurantReducer';
const cookies = new Cookies();

const userInfo = cookies.get('userInfo') || null;

const initialState = {
	userLogin: { userInfo },
};

const appReducer = combineReducers({
	// Note: Restaurant States...!
	resProductsStates: restaurantProducts,
	resTimeStates: restaurantTimeSchedule,

	// auth
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userForgotPassword: userForgotPasswordReducer,
	userPasswordRestore: userPasswordRestoreReducer,
	userResendOtp: userResendOtpReducer,
	userForgotPasswordResendOtp: userForgotPasswordResendOtpReducer,
	userVerifyEmailOtp: userVerifyEmailOtpReducer,
	userVerifyForgotPasswordOtp: userVerifyForgotPasswordOtpReducer,

	// file url
	fileUrl: fileUrlReducer,

	// approval form
	merchantApprovalForm: approvalFormReducer,
	merchantAprrovedDetail: aprrovedDetailReducer,

	//  user'
	getUser: getUserReducer,
	getUserbyId: getUserByIdReducer,
	userUpdatePassword: userUpdatePasswordReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userUpdateAvatar: userUpdateAvatarReducer,
	getUserInfo: getUserInfoReducer,
	getMerchantInfo: getMerchantInfoReducer,

	//secret key
	genRestaurantSecKey: generateRestaurantSecKeyReducer,
	getRestaurantSecKey: getRestaurantSecKeyReducer,

	// Shop
	createRestaurant: createRestaurantReducer,
	getRestaurantDetail: getRestaurantDetailReducer,

	//snackbar
	customSnackbar: snackbarReducer,

	//Products
	addProduct: AddProductsReducer,
	getProduct: GetProductsReducer,

	// order
	getOrder: GetOrderReducer,
	getOrderById: GetOrderByIdReducer,

	//order status verify
	verifyOrder: verifyOrderReducer,
	completeOrder: completeOrderReducer,
	cancelOrder: cancelOrderReducer,
	returnOrder: returnOrderReducer,

	// order Product
	returnProduct: returnProductsReducer,
	clashProductsReducer: clashProductsReducer,

	//get Notification
	getNotifications: getNotificationsReducer,
	readNotification: readAllNotification,

	//Restaurant Management
	getRestaurants: getRestaurantReducer,
	addRestaurant: addRestaurantReducer,

	//Outlets
	getOutlets: getOutletsReducers,
	addOutlets: addOutletsReducers,
	getOutletDetails: getOutletDetailReducers,
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
