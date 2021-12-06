import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import instance from '../Config/axios';
// import { makeStyles } from '@material-ui/core/styles';
// import VerificationUserEmail from "../component/Auth/Verification";
import ApprovalForm from '../component/MerchantApprovalForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { userLogoutAction } from '../reduxState/aciton/authAction';
import VerifyEmailOtp from '../component/Auth/VerifyEmailOtp';
import ApprovalWaiting from '../component/ApprovalWaiting';
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
	loaderContainer: {
		position: 'absolute',
		top: '40vh',
		left: '50%',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	loader: {
		background: '#263238',
		color: '#263238',
	},
}));

async function checkTokenValidity() {
	// console.log("hello its me");
	try {
		// check if token is valid
		const response = await instance.get(`/auth/VerifyUser`);
		const { data } = await response;
		if (data) {
			cookies.set('userInfo', data, { path: '/' });
			return true;
		}
		console.log('VerifyUser Data', data);
	} catch (error) {
		console.log('VerifyUser Err', error);
		return false;
	}
}

export const PrivateRoute = ({ element: Element, path, ...props }) => {
	const classes = useStyles();
	const [auth, setAuth] = useState(false);
	const [isTokenValidated, setIsTokenValidated] = useState(false);
	const dispatch = useDispatch();

	let navigate = useNavigate();
	const userInfo = cookies.get('userInfo');
	const token = cookies.get('token');
	// console.log("from custom Route", userInfo);
	// console.log("kk", token);

	useEffect(() => {
		// console.log({ ...props });
		if (userInfo) {
			if (token) {
				// send jwt to API to see if it's valid
				try {
					checkTokenValidity().then((isTokenValid) => {
						if (isTokenValid) {
							setAuth(true);
						} else {
							// also remove from redux
							dispatch(userLogoutAction());
							cookies.remove('token');
							cookies.remove('userInfo');
						}
						setIsTokenValidated(true);
					});
				} catch (err) {
					// also remove from redux
					dispatch(userLogoutAction());
					cookies.remove('token');
					cookies.remove('userInfo');
					setIsTokenValidated(true);
				}
			}
		} else {
			setIsTokenValidated(true); // in case there is no token
		}
	}, []);

	if (!isTokenValidated) {
		return (
			<div className={classes.loaderContainer}>
				{/* <CircularProgress className={classes.loader} /> */}
				<Loader type='Circles' color='#263238' height={30} width={30} />
			</div>
		);
	} // or some kind of loading animation
	if (auth) {
		console.log(userInfo.data.user.verifyEmail, userInfo.data.user.formSubmit, 'auth');
		// return <Route path={path} element={<Element {...props} />} />;

		if (!userInfo.data.user.verifyEmail) {
			return <Route path='/verify-email-otp' element={<VerifyEmailOtp />} />;
		} else if (userInfo.data.user.verifyEmail && !userInfo.data.user.formSubmit) {
			return <Route path='/approval-form' element={<ApprovalForm />} />;
		}

		// else if (userInfo.data.user.verifyEmail && userInfo.data.user.formSubmit && !userInfo.data.user.approved) {
		// 	return <Route path='/approval-waiting' element={<ApprovalWaiting />} />;
		// }
		else {
			return <Route path={path} element={<Element {...props} />} />;
		}
	} else {
		return <Navigate to='/login' replace />;
	}
};

// No token routes - user not allowed with token
export const AuthRoute = ({ element: Component, path, ...rest }) => {
	const classes = useStyles();
	const [auth, setAuth] = useState(false);
	const [isTokenValidated, setIsTokenValidated] = useState(false);
	const dispatch = useDispatch();

	let userInfo = cookies.get('userInfo');
	let token = cookies.get('token');

	if (!token) {
		return <Route path={path} element={Component} />;
	} else {
		checkTokenValidity().then((isTokenValid) => {
			// console.log(isTokenValid, "token validity check");
			if (isTokenValid) {
				setAuth(true);
			} else {
				// also remove from redux
				dispatch(userLogoutAction());

				cookies.remove('token');
				cookies.remove('usreInfo');
			}
			setIsTokenValidated(true);
		});
	}

	if (!isTokenValidated) {
		return (
			<div className={classes.loaderContainer}>
				<CircularProgress className={classes.loader} />
			</div>
		);
	} // or some kind of loading animation

	if (auth) {
		return <Navigate to='/' replace />;
	} else {
		return <Route path={path} element={Component} />;
	}
};
