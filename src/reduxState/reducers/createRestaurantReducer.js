/***** Note: All create restaurant cases are defined here *****/

import {
    FETCH_RESTAURANT_PRODUCTS,
    LISTED_STATUS,
    DELISTED_STATUS,
    EDIT_RESTAURANT_PRODUCT,
    ADD_RESTAURANT_PRODUCT
}
    from "../constants/createRestaurant";

let INIT_STATE = {
    restaurantProducts: []
}

const createRestaurantReducer = (state = INIT_STATE, action) => {
    switch (action.type) {

        case ADD_RESTAURANT_PRODUCT:
            let resProductsCloneForAdd = state.restaurantProducts;
            resProductsCloneForAdd.push(action.payload);
            console.log(resProductsCloneForAdd);

            for (let i = 0; i < resProductsCloneForAdd.length; i++) {
                resProductsCloneForAdd[i].seeMoreFlag = false;
                resProductsCloneForAdd[i].variationFlag = false;
            }

            return {
                ...state,
                restaurantProducts: resProductsCloneForAdd
            }

        case EDIT_RESTAURANT_PRODUCT:
            let resProductsCloneForUpdate = state.restaurantProducts.slice(0);
            resProductsCloneForUpdate.splice(action.payload.key, 1, action.payload.actualData);
            // console.log(resProductsCloneForUpdate);

            return {
                ...state,
                restaurantProducts: resProductsCloneForUpdate
            }

        case DELISTED_STATUS:
            let resProductsCloneDelistedUpdate = state.restaurantProducts.splice(0);
            resProductsCloneDelistedUpdate.splice(action.payload.rowIndex, 1, action.payload.actualData);
            // console.log(resProductsCloneDelistedUpdate);

            return {
                ...state,
                restaurantProducts: resProductsCloneDelistedUpdate
            }

        case LISTED_STATUS:
            let resProductsCloneListedUpdate = state.restaurantProducts.slice(0);
            resProductsCloneListedUpdate.splice(action.payload.rowIndex, 1, action.payload.actualData);
            // console.log(resProductsCloneListedUpdate);

            return {
                ...state,
                restaurantProducts: resProductsCloneListedUpdate
            }

        case FETCH_RESTAURANT_PRODUCTS:
            let resProductsClone = state.restaurantProducts.slice(0);
            resProductsClone.push(action.payload);

            // console.log(resProductsClone[0]);

            return {
                ...state,
                restaurantProducts: resProductsClone[0]
            }

        default:
            return state;
    }
}

export default createRestaurantReducer;