import React from 'react';
import { GENERATE_RESTAURANT_SECRETKEY_REQUEST, GENERATE_RESTAURANT_SECRETKEY_SUCCESS, GENERATE_RESTAURANT_SECRETKEY_FAIL, GET_RESTAURANT_SECRETKEY_REQUEST, GET_RESTAURANT_SECRETKEY_SUCCESS, GET_RESTAURANT_SECRETKEY_FAIL } from '../constants/generteSecretKeyConstant';
import instance from '../../Config/axios';
import { toggleSnackbarOpenAction } from './snackbarAction';


/**********************genRestaurantSecKeyAction******************/
const genRestaurantSecKeyAction = () => async (dispatch) => {
    dispatch({ type: GENERATE_RESTAURANT_SECRETKEY_REQUEST}); 
	try {
		const { data } = await instance.post('/api/v1/merchants/generateRestaurantKey');      
        const { status, message } = data;
		if(status === "success"){
			dispatch(toggleSnackbarOpenAction(message, 'success')); 
            dispatch({ type: GENERATE_RESTAURANT_SECRETKEY_SUCCESS, payload: message, success: true }); 
        } 
	} catch (error) {
		dispatch({ type: GENERATE_RESTAURANT_SECRETKEY_FAIL, payload: error?.response });   
		dispatch(toggleSnackbarOpenAction('Something went wrong!', 'error')); 
	}
};

/**********************getRestaurantSecKeyAction******************/
const getRestaurantSecKeyAction = () => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_SECRETKEY_REQUEST}); 
	try {
		const { data } = await instance.get('/api/v1/merchants/getRestaurantkey');  
        const { status } = data; 
		if(status === "success"){
            dispatch({ type: GET_RESTAURANT_SECRETKEY_SUCCESS, payload: data.data.SecretKey, success: true }); 
        } 
	} catch (error) {
        console.log(error);
		dispatch({ type: GET_RESTAURANT_SECRETKEY_FAIL, payload: error?.response });   
	}
};

export { genRestaurantSecKeyAction, getRestaurantSecKeyAction };    