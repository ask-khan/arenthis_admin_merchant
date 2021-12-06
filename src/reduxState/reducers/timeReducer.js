// Note: Reducer of times are defined here...!

import {
}
    from "../constants/timeConstant";

let INIT_STATE = {
    restaurantTimeSchedule: []
}

const createRestaurantTimesReducer = (state = INIT_STATE, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default createRestaurantTimesReducer;