import instance from '../../Config/axios';

const {
	ADD_PRODUCTS_REQUEST,
	ADD_PRODUCTS_FAIL,
	ADD_PRODUCTS_SUCCESS,
	GET_PRODUCTS_REQUEST,
	GET_PRODUCTS_FAIL,
	GET_PRODUCTS_SUCCESS,
} = require('../constants/ProductsConstant');

// ******************************* Add PRODUCTS ****************************************
const AddProductAction = (product, CImage, Pimages) => async (dispatch) => {
	const coverImage = new FormData();
	const productImages = new FormData();

	console.log(product, CImage, Pimages, 'data from product Action');

	try {
		dispatch({ type: ADD_PRODUCTS_REQUEST, payload: product });
		// create product

		const data = Promise.all([
			instance.post('/api/products/create', product).then((x) => {
				//
				//  upload cover image
				coverImage.append('productId', x.data._id);
				coverImage.append('File', CImage);
				instance.post(`/api/products/upload-cover-photo`, coverImage);

				// upload product images
				productImages.append('productId', x.data._id);
				[...Pimages].forEach((image) => {
					productImages.append('File', image);
				});
				instance.post(`/api/products/upload-photos`, productImages);
			}),
		]);
		dispatch({ type: ADD_PRODUCTS_SUCCESS, payload: data, success: true });
	} catch (error) {
		console.log(error.response);
		dispatch({ type: ADD_PRODUCTS_FAIL, payload: error.response });
	}
};

const GetProductAction = (Page, Limit) => async (dispatch) => {
	try {
		dispatch({ type: GET_PRODUCTS_REQUEST });
		const { data } = await instance.post(`/api/products?page=${Page}&perPage=${Limit}`);

		dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response });
	}
};

export { AddProductAction, GetProductAction };
