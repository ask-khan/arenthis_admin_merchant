// ********** Login Component **********
import React, { useEffect } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction, facebookLoginAction, googleLoginAction } from '../../../reduxState/aciton/authAction';
import GridBoxLeft from '../../Shared/GridBoxLeft';
import { globalStyles } from '../../Layout/Styles';
import AppBackdrop from '../../AppBackdrop';
import { LoginFormik } from '../CustomAuthFormikHook';
import AppSnackbar from '../../AppSnackbar';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Key } from 'react-feather';

const Login = () => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** Redux State **********
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { success, loading } = userLogin;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formData) => {
		dispatch(userLoginAction(formData));
	};

	const handleFBclick = (response) => {
		// console.log(response, "serving from Fb Click");
	};

	const handleFBresponse = (response) => {
		// console.log(response, "serving from Fb response");
		if (response) {
			const { userID, accessToken } = response;
			dispatch(facebookLoginAction({ userID, accessToken }));
		}
	};

	const handleResponseGoogle = (response) => {
		// console.log(response, "serving from Google response");
		// alert("Google login");

		if (!response.error) {
			dispatch(googleLoginAction({ token: response.tokenId }));
		}
	};

	// ********** LoginFormik **********
	const formik = LoginFormik(handleFormSubmit);

	// ********** useEffect **********
	useEffect(() => {
		if (success) {
			navigate('/admin');
		}
	}, [success]);

	return (
		<>
			{/* ********** AppBackdrop For Loading ********** */}
			{loading && <AppBackdrop isBackdropOpen={loading} />}

			<Grid item container className={gbclasses.gridCon}>
				{/* ********** Box 1 ********** */}
				<GridBoxLeft />

				{/* ********** Box 2 ********** */}
				<Grid item container square component={Paper} elevation={0} className={gbclasses.formCon} justify='center' alignItems='center'>
					<Grid item container direction='row' justify='center' alignItems='center'>
						<form onSubmit={formik.handleSubmit}>
							<Box component={Grid} container>
								<Grid item container className={gbclasses.heading}>
									<h4>Arenthis Merchant Admin</h4>
								</Grid>
								<Grid item container className={gbclasses.subheading}>
									<h5>Log In</h5>
								</Grid>

								<Grid item container justify='center' className={gbclasses.formSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Phone Number</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										type='text'
										variant='outlined'
										placeholder='Phone Number'
										name='contact'
										fullWidth
										size='small'
										inputProps={{ maxLength: 12 }}
										InputProps={{ startAdornment: <InputAdornment position='start'>+60</InputAdornment> }}
										autoComplete='off'
										value={formik.values.contact}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.contact && Boolean(formik.errors.contact)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.contact && formik.errors.contact && formik.errors.contact}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.formSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Password</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										type='password'
										variant='outlined'
										placeholder='Secret Key'
										name='secretKey'
										fullWidth
										size='small'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<Key size={15} color='#6b778c' />
												</InputAdornment>
											),
										}}
										autoComplete='off'
										value={formik.values.secretKey}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.secretKey && Boolean(formik.errors.secretKey)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.secretKey && formik.errors.secretKey && formik.errors.secretKey}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.btncon}>
									<Button type='submit' fullWidth variant='contained' className={gbclasses.button}>
										Submit
									</Button>
								</Grid>
							</Box>
						</form>

						<div className={gbclasses.navcon}>
							<Link to='/register' className={gbclasses.FormLink}>
								<Typography className={gbclasses.formLinkText}>Create Account ?</Typography>
							</Link>

							<Link to='/forgot-password' className={gbclasses.FormLink}>
								<Typography className={gbclasses.formLinkText}>Forgot password ?</Typography>
							</Link>
						</div>

						{/* <Grid item container justify='space-between' alignItems='center' style={{ marginTop: '2rem' }}>
							<GoogleLogin
								clientId='254858952171-8kofj16lp9oc3bp1u2clt2h5qj2rrae7.apps.googleusercontent.com'
								buttonText='Google'
								onSuccess={(response) => handleResponseGoogle(response)}
								onFailure={(response) => handleResponseGoogle(response)}
								isSignedIn={true}
								cookiePolicy={'single_host_origin'}
							/>
							,
							<FacebookLogin
								appId='2737248189863814'
								// autoLoad={true}
								// fields="name,email,picture"
								onClick={(r) => handleFBclick(r)}
								callback={(r) => handleFBresponse(r)}
								textButton='Facebook'
								// cssClass="my-facebook-button-class"
								icon='fa-facebook'
								size='small'
							/>
						</Grid> */}
					</Grid>
				</Grid>

				{/* ********** Snackbar ********** */}
				<AppSnackbar />
			</Grid>
		</>
	);
};
export default Login;
