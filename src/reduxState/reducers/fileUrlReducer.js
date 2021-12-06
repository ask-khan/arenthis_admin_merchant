import { FILE_URL_FAIL, FILE_URL_REQUEST, FILE_URL_SUCCESS } from "../constants/filesConstant";

// ************************************ file Url Reducer *************************************
function fileUrlReducer(state = { filesArray: []}, action) { 
	switch (action.type) {
		case FILE_URL_REQUEST:
			return { loading: true };
		case FILE_URL_SUCCESS:
			return { loading: false, filesArray : [...state.filesArray,action.payload], success: true };
		case FILE_URL_FAIL:
			return { loading: false, };
		default:
			return state;
	}
}

export { fileUrlReducer }; 