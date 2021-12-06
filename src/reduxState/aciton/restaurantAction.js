import instance from '../../Config/axios';
import { toggleSnackbarOpenAction } from './snackbarAction';

const {
	ADD_RESTAURANTS_SUCCESS,
	ADD_RESTAURANTS_REQUEST,
	ADD_RESTAURANTS_FAIL,
	//Get
	GET_RESTAURANTS_SUCCESS,
	GET_RESTAURANTS_REQUEST,
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

// ******************************* Add PRODUCTS ****************************************
const CreateRestaurantsAction = (formValue, setOpen) => async (dispatch) => {
	console.log(formValue);
	try {
		dispatch({ type: ADD_RESTAURANTS_REQUEST });
		// create product
		instance.post(`/api/v1/restaurant-detail/merchant`, formValue).then((x) => {
			console.log(x.data);

			if (x.data.status === 'success') {
				setOpen(false);
				dispatch({ type: ADD_RESTAURANTS_SUCCESS, payload: x.data, success: true });
				dispatch(toggleSnackbarOpenAction(`Restaurant Created Successfully!`, 'success'));
			}
		});
	} catch (error) {
		let message = error.response.data.message;
		console.log(error.response.data.message);

		dispatch({ type: ADD_RESTAURANTS_FAIL, payload: error.response.data.message });
		dispatch(toggleSnackbarOpenAction(`${message}`, 'error'));
	}
};

const getRestaurantsAction = (url) => async (dispatch) => {
	try {
		dispatch({ type: GET_RESTAURANTS_REQUEST });
		const { data } = await instance.get(`${url}`);

		dispatch({ type: GET_RESTAURANTS_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: GET_RESTAURANTS_FAIL, payload: error.response });
	}
};

const getOutletsAction = (restuarantId) => async (dispatch) => {
	try {
		dispatch({ type: GET_OUTLETS_REQUEST });
		const { data } = await instance.get(`/api/v1/restaurant-outlet/merchant/${restuarantId}`);

		dispatch({ type: GET_OUTLETS_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: GET_OUTLETS_FAIL, payload: error.response });
	}
};

const CreateOutletsAction = (data, images, coverImages, menuImages, restaurantId, setOpen) => async (dispatch) => {
	const files = new FormData();

	files.append('images', images);
	files.append('coverImages', coverImages);
	files.append('menuImages', menuImages);

	try {
		dispatch({ type: ADD_OUTLETS_REQUEST });
		// create product
		instance
			.post(`/api/v1/restaurant-outlet/merchant/${restaurantId}`, data)
			.then(async (x) => {
				console.log(x.data);

				if (x.data.status === 'success') {
					const fileResponse = await instance.patch(`/api/v1/restaurant-outlet/merchant/upload-files/${x.data.data._id}`, files);

					console.log(fileResponse.data);

					setOpen(false);
					dispatch({ type: ADD_OUTLETS_SUCCESS, payload: x.data, success: true });
					dispatch(toggleSnackbarOpenAction(`Outlet Created Successfully!`, 'success'));
				}
			})
			.catch((error) => {
				let message = error.response.data.message;
				console.log(error.response.data.message);

				dispatch({ type: ADD_OUTLETS_FAIL, payload: error.response.data.message });
				dispatch(toggleSnackbarOpenAction(`${message}`, 'error', 10000));
			});
	} catch (error) {
		let message = error.response.data.message;
		console.log(error.response.data.message);

		dispatch({ type: ADD_OUTLETS_FAIL, payload: error.response.data.message });
		dispatch(toggleSnackbarOpenAction(`${message}`, 'error'));
	}
};

const getOutletDetialsAction = (slug) => async (dispatch) => {
	try {
		dispatch({ type: GET_OUTLETS_DETAILS_REQUEST });
		const { data } = await instance.get(`/api/v1/restaurant-outlet/merchant/outlet-details/${slug}`);

		dispatch({ type: GET_OUTLETS_DETAILS_SUCCESS, payload: data?.doc, success: true });
	} catch (error) {
		dispatch({ type: GET_OUTLETS_DETAILS_FAIL, payload: error.response });
	}
};

export { CreateRestaurantsAction, CreateOutletsAction, getRestaurantsAction, getOutletsAction, getOutletDetialsAction };
