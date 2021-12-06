/***** Note: All create restaurant action functions are defined here *****/

import {
    FETCH_RESTAURANT_PRODUCTS,
    LISTED_STATUS,
    DELISTED_STATUS,
    EDIT_RESTAURANT_PRODUCT,
    ADD_RESTAURANT_PRODUCT
}
    from "../constants/createRestaurant";
import instance from "../../Config/axios";

/*****  Note: Dispatch action function to create restaurant post *****/
const createRestaurantProduct = (productObj) => {
    delete productObj.dishItemURL;

    return async (dispatch) => {
        console.log(productObj);
        let api = '/api/v1/restuarant/product/';

        try {
            let response = await instance.post(api, productObj);
            console.log(response);
            let actualData = response.data.doc.data;
            // console.log(actualData);

            dispatch({
                type: ADD_RESTAURANT_PRODUCT,
                payload: actualData
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

/*****  Note: Dispatch action function to fetch all restaurant post *****/
const fetchAllRestaurantProducts = () => {
    return async (dispatch) => {
        let api = '/api/v1/restuarant/product/Me';

        try {
            let response = await instance.get(api);
            let actualData = response.data.doc.data;
            // console.log(actualData);

            dispatch({
                type: FETCH_RESTAURANT_PRODUCTS,
                payload: actualData
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

/*****  Note: Dispatch action function to listed status *****/
const listedStatus = (rowIndex, foodObj) => {
    return async (dispatch) => {
        // console.log(rowIndex, foodObj);
        let api = `/api/v1/restuarant/product/status-Live/${foodObj._id}`;

        try {
            let response = await instance.patch(api);
            // console.log(response);
            let actualData = response.data.doc.data;
            // console.log(actualData);

            dispatch({
                type: LISTED_STATUS,
                payload: { rowIndex, actualData }
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

/*****  Note: Dispatch action function to delisted status *****/
const delistedStatus = (rowIndex, foodObj) => {
    return async (dispatch) => {
        // console.log(rowIndex, foodObj);
        let api = `/api/v1/restuarant/product/status-delisted/${foodObj._id}`;

        try {
            let response = await instance.patch(api);
            // console.log(response);
            let actualData = response.data.doc.data;
            // console.log(actualData);

            dispatch({
                type: DELISTED_STATUS,
                payload: { rowIndex, actualData }
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

/*****  Note: Dispatch action function to delisted status *****/
const editResProduct = (productObj) => {
    return async (dispatch) => {
        console.log(productObj);

        // Note: Fetching data from local storage...!
        let data = localStorage.getItem('UpdateItemObj');
        let dataInJSON = JSON.parse(data);
        let key = dataInJSON.rowIndex;
        // console.log(key);
        // console.log(dataInJSON);
        // console.log(dataInJSON.foodRowObj.slug);

        let api = `/api/v1/restuarant/product/${dataInJSON.foodRowObj.slug}`;

        try {
            let response = await instance.patch(api, productObj);
            console.log(response);
            let actualData = response.data.doc.data;
            dispatch({
                type: EDIT_RESTAURANT_PRODUCT,
                payload: { key, actualData }
            });
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

export {
    createRestaurantProduct,
    fetchAllRestaurantProducts,
    listedStatus,
    delistedStatus,
    editResProduct
};