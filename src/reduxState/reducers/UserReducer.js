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

// ************************************ Add User *************************************
function getUserReducer(state = { users: [] }, action) {
	switch (action.type) {
		case GET_USERS_REQUEST:
			return { loading: true };
		case GET_USERS_SUCCESS:
			return { loading: false, users: action.payload, success: true };
		case GET_USERS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************User by id  *************************************
function getUserByIdReducer(state = { }, action) {
	switch (action.type) {
		case GET_USERS_BY_ID_REQUEST:
			return { loading: true };
		case GET_USERS_BY_ID_SUCCESS:
			return { loading: false, user: action.payload, success: true };
		case GET_USERS_BY_ID_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************User Update Password  *************************************  
function userUpdatePasswordReducer(state = { }, action) {
	switch (action.type) {
		case USER_UPDATE_PASSWORD_REQUEST:
			return { loading: true };
		case USER_UPDATE_PASSWORD_SUCCESS:
			return { loading: false, message: action.payload, success: true };
		case USER_UPDATE_PASSWORD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};


// ************************************User Update Profile  *************************************  
function userUpdateProfileReducer(state = { }, action) {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, message: action.payload, success: true };
		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// ************************************User Update Avatar  *************************************  
function userUpdateAvatarReducer(state = { }, action) {
	switch (action.type) {
		case USER_UPDATE_AVATAR_REQUEST:
			return { loading: true };
		case USER_UPDATE_AVATAR_SUCCESS:
			return { loading: false, avtarData: action.payload, success: true };
		case USER_UPDATE_AVATAR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// ************************************getUserInfoReducer*************************************  
function getUserInfoReducer(state = { }, action) {
	switch (action.type) {
		case GET_USER_INFO_REQUEST:
			return { loading: true,  };
		case GET_USER_INFO_SUCCESS:
			return { loading: false, userInformation: action.payload, updtsuccess: true }; 
		case GET_USER_INFO_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// ************************************getUserInfoReducer*************************************  
function getMerchantInfoReducer(state = { }, action) {
	switch (action.type) {
		case GET_MERCHANT_INFO_REQUEST:
			return { loading: true,  };
		case GET_MERCHANT_INFO_SUCCESS:
			return { loading: false, merchantInformation: action.payload, success: true };    
		case GET_MERCHANT_INFO_FAIL:
			return { loading: false, error: action.payload }; 
		default:
			return state;
	}
};

export { getUserReducer, getUserByIdReducer, userUpdateProfileReducer, userUpdatePasswordReducer, userUpdateAvatarReducer, getUserInfoReducer,  getMerchantInfoReducer }; 
