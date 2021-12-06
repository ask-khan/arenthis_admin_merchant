import { CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, CREATE_RESTAURANT_FAIL, GET_RESTAURANT_DETAIL_REQUEST, GET_RESTAURANT_DETAIL__SUCCESS, GET_RESTAURANT_DETAIL_FAIL } from '../constants/shopConstant';

// ********** createRestaurantReducer **********
function createRestaurantReducer(state = {}, action) { 
	switch (action.type) {
		case CREATE_RESTAURANT_REQUEST:
			return { loading: true };
		case CREATE_RESTAURANT_SUCCESS:
			return { loading: false, data: action.payload, success: true };
		case CREATE_RESTAURANT_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ********** createRestaurantReducer **********
function getRestaurantDetailReducer(state = {}, action) { 
	switch (action.type) {
		case GET_RESTAURANT_DETAIL_REQUEST:
			return { loading: true };
		case GET_RESTAURANT_DETAIL__SUCCESS: 
			return { loading: false, restaurantInfo: action.payload, restsuccess: true };  
		case GET_RESTAURANT_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export { createRestaurantReducer, getRestaurantDetailReducer }; 