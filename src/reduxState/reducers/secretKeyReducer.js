import { GENERATE_RESTAURANT_SECRETKEY_REQUEST, GENERATE_RESTAURANT_SECRETKEY_SUCCESS, GENERATE_RESTAURANT_SECRETKEY_FAIL, GET_RESTAURANT_SECRETKEY_REQUEST, GET_RESTAURANT_SECRETKEY_SUCCESS, GET_RESTAURANT_SECRETKEY_FAIL } from '../constants/generteSecretKeyConstant';

// ********** generateRestaurantSecretKeyReducer **********
function generateRestaurantSecKeyReducer(state = {}, action) { 
	switch (action.type) {
		case GENERATE_RESTAURANT_SECRETKEY_REQUEST:
			return { loading: true };
		case GENERATE_RESTAURANT_SECRETKEY_SUCCESS:
			return { loading: false, message: action.payload, success: true }; 
		case GENERATE_RESTAURANT_SECRETKEY_FAIL:
			return { loading: false, error: action.payload }; 
		default: 
			return state;
	};
}; 

// ********** getRestaurantSecretKeyReducer **********
function getRestaurantSecKeyReducer(state = {}, action) {  
	switch (action.type) {
		case GET_RESTAURANT_SECRETKEY_REQUEST:
			return { getloading: true };
		case GET_RESTAURANT_SECRETKEY_SUCCESS:
			return { getloading: false, restaurantSecretKey: action.payload, getsuccess: true }; 
		case GET_RESTAURANT_SECRETKEY_FAIL:
			return { getloading: false, geterror: action.payload }; 
		default: 
			return state;
	};
}; 

export { generateRestaurantSecKeyReducer, getRestaurantSecKeyReducer };   