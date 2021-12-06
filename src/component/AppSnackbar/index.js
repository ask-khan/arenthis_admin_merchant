import { useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { toggleSnackbarCloseAction } from '../../reduxState/aciton/snackbarAction';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const AppSnackbar = () => {
	const handleClose = () => {
		dispatch(toggleSnackbarCloseAction());
	};

	console.log('call');
	// ********** Redux State **********
	const dispatch = useDispatch();
	const customSnackbar = useSelector((state) => state.customSnackbar);
	const { toggleSnackbar, snackbarMessage, snackbarMessageType, snacbarDuration } = customSnackbar;

	console.log(snackbarMessage);

	// ********** useEffect **********
	useEffect(() => {
		if (toggleSnackbar) {
			handleClose();
		}
	}, []);

	return (
		<Snackbar open={toggleSnackbar} autoHideDuration={snacbarDuration ? snacbarDuration : 3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={snackbarMessageType}>
				{snackbarMessage}
			</Alert>
		</Snackbar>
	);
};

export default AppSnackbar;
