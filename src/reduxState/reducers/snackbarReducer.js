import { TOGGLE_SNACKBAR_CLOSE, TOGGLE_SNACKBAR_OPEN } from '../constants/snackbarConstant';

const initialState = {
	toggleSnackbar: false,
	snackbarMessage: null,
};

function snackbarReducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SNACKBAR_OPEN:
			console.log(action.message);
			return {
				...state,
				toggleSnackbar: true,
				snackbarMessage: action.message,
				snackbarMessageType: action.msgType,
				snacbarDuration: action.duration,
			};
		case TOGGLE_SNACKBAR_CLOSE:
			return { ...state, toggleSnackbar: false, snackbarMessage: null };
		default: {
			return state;
		}
	}
}

export { snackbarReducer };
