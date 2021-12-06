const {
	ADD_RESTAURANTS_REQUEST,
	ADD_RESTAURANTS_SUCCESS,
	ADD_RESTAURANTS_FAIL,
	//Get
	GET_RESTAURANTS_REQUEST,
	GET_RESTAURANTS_SUCCESS,
	GET_RESTAURANTS_FAIL,
	//Add
	ADD_OUTLETS_REQUEST,
	ADD_OUTLETS_SUCCESS,
	ADD_OUTLETS_FAIL,
	// Get
	GET_OUTLETS_REQUEST,
	GET_OUTLETS_SUCCESS,
	GET_OUTLETS_FAIL,

	//
	GET_OUTLETS_DETAILS_REQUEST,
	GET_OUTLETS_DETAILS_SUCCESS,
	GET_OUTLETS_DETAILS_FAIL,
} = require('../constants/restaurantsConstant');

// ************************************ Add PRODUCTS *************************************
function addRestaurantReducer(state = { restaurant: {} }, action) {
	console.log(action.type);
	switch (action.type) {
		case ADD_RESTAURANTS_REQUEST:
			return { loading: true };
		case ADD_RESTAURANTS_SUCCESS:
			return { loading: false, restaurant: action.payload, success: true };
		case ADD_RESTAURANTS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}
// ************************************ Get PRODUCTS *************************************
function getRestaurantReducer(state = { restaurants: {} }, action) {
	switch (action.type) {
		case GET_RESTAURANTS_REQUEST:
			return { loading: true, restaurants: {} };
		case GET_RESTAURANTS_SUCCESS:
			return { loading: false, restaurants: action.payload, success: true };
		case GET_RESTAURANTS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************ ADD Outlets *************************************
function addOutletsReducers(state = { outlets: {} }, action) {
	switch (action.type) {
		case ADD_OUTLETS_REQUEST:
			return { loading: true, outlets: {} };
		case ADD_OUTLETS_SUCCESS:
			return { loading: false, outlets: action.payload, success: true };
		case ADD_OUTLETS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************ Get Outlets *************************************
function getOutletsReducers(state = { outlets: {} }, action) {
	switch (action.type) {
		case GET_OUTLETS_REQUEST:
			return { loading: true, outlets: {} };
		case GET_OUTLETS_SUCCESS:
			return { loading: false, outlets: action.payload, success: true };
		case GET_OUTLETS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************ Get Outlet *************************************
function getOutletDetailReducers(state = { outlet: {} }, action) {
	switch (action.type) {
		case GET_OUTLETS_DETAILS_REQUEST:
			return { loading: true, outlets: {} };
		case GET_OUTLETS_DETAILS_SUCCESS:
			return { loading: false, outlets: action.payload, success: true };
		case GET_OUTLETS_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export { addRestaurantReducer, getRestaurantReducer, getOutletsReducers, addOutletsReducers, getOutletDetailReducers };
