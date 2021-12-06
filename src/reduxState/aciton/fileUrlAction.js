import React from 'react';
import { FILE_URL_SUCCESS } from '../constants/filesConstant';


/**********************Aproval******************/
const filUrlAction = (fileData) => async (dispatch) => {

    dispatch({ type: FILE_URL_SUCCESS, payload: fileData });
    
};

export { filUrlAction }; 