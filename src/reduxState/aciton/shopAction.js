import instance from '../../Config/axios';
import { CREATE_RESTAURANT_FAIL, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, GET_RESTAURANT_DETAIL_FAIL, GET_RESTAURANT_DETAIL_REQUEST, GET_RESTAURANT_DETAIL__SUCCESS } from '../constants/shopConstant';
import { toggleSnackbarOpenAction } from './snackbarAction';   

// *********************************createRestaurantAction*************************************
const createRestaurantAction = (formValues, location) => async (dispatch) => {
    console.log("formValues",formValues) 
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    const { name, description, address, bannerPhoto, coverPhoto } = formValues;
    const formData = { name, description, "location": { "coordinates": [location.lng, location.lat], address } }; 
    const filesData = new FormData();  
    filesData.append('coverImage', coverPhoto); 
    filesData.append('images', bannerPhoto);
    try {
        await instance.post('/api/v1/restuarants/', formData)
        .then(async (data) => {
            await instance.patch('/api/v1/restuarants/changeStatus/'); 
            await instance.patch('/api/v1/restuarants/uploads-file', filesData);
            dispatch(toggleSnackbarOpenAction('Congrats restaurant created waiting for approval!', 'success')); 
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data, success: true });
        })
    } catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAIL, payload: error?.response });
        dispatch(toggleSnackbarOpenAction(`${error?.response?.data?.message}`, 'error')) 
    }
};

/**********************getRestaurantDetailAction******************/ 
const getRestaurantDetailAction = () => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_DETAIL_REQUEST });
	try {
		const { data } = await instance.get('/api/v1/restuarants/Me');   
        // console.log("getRestaurantDetailAction",data); 
        const { status, doc } = data;      
        if(status === 'success'){ 
            dispatch({ type: GET_RESTAURANT_DETAIL__SUCCESS, payload: doc, success: true });   
        }
	} catch (error) {
        console.log(error);
		dispatch({ type: GET_RESTAURANT_DETAIL_FAIL, payload: error?.response });  
	}
};
export {
    createRestaurantAction,
    getRestaurantDetailAction,
};