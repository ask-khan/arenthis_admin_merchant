// Note: All action functions of times are defined here...!

import {
}
    from "../constants/timeConstant";
import instance from "../../Config/axios";

// Note: Dispatch action to send data to the API...!
const sendData = (timesArr) => {
    return async () => {
        // console.log(timesArr);
        let api = '/api/v1/restuarants/Me';

        try {
            let response = await instance.patch(api, { 'hours': timesArr });
            console.log(response);
        }

        catch (error) {
            console.error(`${error}`);
        }
    }
}

export { sendData };