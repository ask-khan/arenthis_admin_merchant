import {
	ADD_PRODUCTS_FAIL,
	ADD_PRODUCTS_REQUEST,
	ADD_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_SUCCESS,
} from '../constants/ProductsConstant';

// ************************************ Add PRODUCTS *************************************
function AddProductsReducer(state = { products: {} }, action) {
	switch (action.type) {
		case ADD_PRODUCTS_REQUEST:
			return { loading: true };
		case ADD_PRODUCTS_SUCCESS:
			return { loading: false, products: action.payload, success: true };
		case ADD_PRODUCTS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}
// ************************************ Get PRODUCTS *************************************
function GetProductsReducer(state = { products: {} }, action) {
	switch (action.type) {
		case GET_PRODUCTS_REQUEST:
			return { loading: true, products: {} };
		case GET_PRODUCTS_SUCCESS:
			return { loading: false, products: action.payload, success: true };
		case GET_PRODUCTS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

export { AddProductsReducer, GetProductsReducer };
