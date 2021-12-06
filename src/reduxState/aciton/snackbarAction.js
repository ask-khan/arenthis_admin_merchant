import { TOGGLE_SNACKBAR_CLOSE, TOGGLE_SNACKBAR_OPEN } from '../constants/snackbarConstant';

const toggleSnackbarOpenAction = (message, msgType, duration) => async (dispatch) => {
	console.log(message);
	dispatch({ type: TOGGLE_SNACKBAR_OPEN, message, msgType, duration });
};

const toggleSnackbarCloseAction = () => async (dispatch) => {
	dispatch({ type: TOGGLE_SNACKBAR_CLOSE });
};

export { toggleSnackbarOpenAction, toggleSnackbarCloseAction };
