// ********** ForgotPassword Component **********
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridBoxLeft from '../../Shared/GridBoxLeft';
import { globalStyles } from '../../Layout/Styles';
import { userLogoutAction, userResendOtpAction, userVerifyEmailOtpAction } from '../../../reduxState/aciton/authAction';
import AppBackdrop from '../../AppBackdrop';
import { OtpFormik } from '../CustomAuthFormikHook';
import AppSnackbar from '../../AppSnackbar';
import { getUserInfoAction } from '../../../reduxState/aciton/UserAction';

const VerifyEmailOtp = () => {
	// ********** State **********
	const [codeCounter, setCodeCounter] = useState(0);

	const [phone, setPhone] = useState({});

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** handleFocusChange **********
	const handleFocusChange = (e) => {
		const { maxLength, value, name } = e.target;
		const [fieldName, fieldIndex] = name;

		let fieldIntIndex = parseInt(fieldIndex, 10);

		// Check if no of char in field == maxlength
		if (value.length >= maxLength) {
			// It should not be last input field
			if (fieldIntIndex < 4) {
				// Get the next input field using it's name
				const nextfield = document.querySelector(`input[name=d${fieldIntIndex + 1}]`);

				// If found, focus the next field
				if (nextfield !== null) {
					nextfield.focus();
				}
			}
		}
	};

	// ********** Redux State **********
	const dispatch = useDispatch();
	const userResendOtp = useSelector((state) => state.userResendOtp);
	const { loading } = userResendOtp;

	const getUserInfo = useSelector((state) => state.getUserInfo);
	const { userInformation } = getUserInfo;

	const userVerifyEmailOtp = useSelector((state) => state.userVerifyEmailOtp);
	const { vfsuccess, vfloading } = userVerifyEmailOtp;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formData) => {
		const { d1, d2, d3, d4 } = formData;
		const emailOtp = `${d1}${d2}${d3}${d4}`;
		dispatch(userVerifyEmailOtpAction(phone, emailOtp));
	};

	// ********** handleResendOtp **********
	const handleResendOtp = () => {
		setCodeCounter(codeCounter + 1);
		dispatch(userResendOtpAction());
	};

	// ********** handleLogout **********
	const handleLogout = () => {
		dispatch(userLogoutAction());
	};

	// ********** OtpFormik **********
	const formik = OtpFormik(handleFormSubmit);

	// ********** useEffect **********
	useEffect(() => {
		dispatch(getUserInfoAction());
	}, []);

	useEffect(() => {
		if (userInformation) {
			setPhone(userInformation.data.phone);
		}
	}, [userInformation]);

	useEffect(() => {
		if (vfsuccess) {
			navigate('/admin');
		}
	}, [vfsuccess]);

	return (
		<>
			{/* ********** AppBackdrop For Loading ********** */}
			{loading && <AppBackdrop isBackdropOpen={loading} />}
			{vfloading && <AppBackdrop isBackdropOpen={vfloading} />}

			<Grid item container className={gbclasses.gridCon}>
				{/* ********** Box 1 ********** */}
				<GridBoxLeft />

				{/* ********** Box 2 ********** */}
				<Grid item container square component={Paper} elevation={0} className={gbclasses.formCon} justify='center' alignItems='center'>
					<Grid item container direction='row' justify='center' alignItems='center'>
						<form onSubmit={formik.handleSubmit}>
							<Box component={Grid} container>
								<Grid item container className={gbclasses.heading}>
									<h4>Verify Otp</h4>
								</Grid>

								<Grid item container direction='row' justify='center' alignItems='center' className={gbclasses.otpInputCon}>
									<TextField
										className={gbclasses.otpInputRoot}
										variant='outlined'
										placeholder='0'
										name='d1'
										size='small'
										margin='none'
										autoComplete='off'
										inputProps={{ maxLength: 1 }}
										value={formik.values.d1}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.d1 && Boolean(formik.errors.d1)}
										onInput={handleFocusChange}
									/>

									<div className={gbclasses.cussperator} />

									<TextField
										className={gbclasses.otpInputRoot}
										variant='outlined'
										placeholder='0'
										name='d2'
										size='small'
										margin='none'
										autoComplete='off'
										inputProps={{ maxLength: 1 }}
										value={formik.values.d2}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.d2 && Boolean(formik.errors.d2)}
										onInput={handleFocusChange}
									/>

									<div className={gbclasses.cussperator} />

									<TextField
										className={gbclasses.otpInputRoot}
										variant='outlined'
										placeholder='0'
										name='d3'
										size='small'
										margin='none'
										autoComplete='off'
										inputProps={{ maxLength: 1 }}
										value={formik.values.d3}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.d3 && Boolean(formik.errors.d3)}
										onInput={handleFocusChange}
									/>

									<div className={gbclasses.cussperator} />

									<TextField
										className={gbclasses.otpInputRoot}
										variant='outlined'
										placeholder='0'
										name='d4'
										size='small'
										margin='none'
										autoComplete='off'
										inputProps={{ maxLength: 1 }}
										value={formik.values.d4}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.d4 && Boolean(formik.errors.d4)}
										onInput={handleFocusChange}
									/>

									<FormHelperText className={gbclasses.otpErrMsgCon}>
										{Object.keys(formik.errors).length > 0 && 'All field is required and must only contain number'}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.btncon}>
									<Button type='submit' fullWidth variant='contained' className={gbclasses.button}>
										Submit
									</Button>
								</Grid>
							</Box>
						</form>

						<Grid item container justify='center'>
							{codeCounter === 3 ? (
								<Button onClick={handleLogout} fullWidth variant='contained' className={gbclasses.lightbutton}>
									Logout
								</Button>
							) : (
								<Button onClick={handleResendOtp} fullWidth variant='contained' className={gbclasses.lightbutton}>
									Resend Code
								</Button>
							)}
						</Grid>
					</Grid>
				</Grid>

				{/* ********** Snackbar ********** */}
				<AppSnackbar />
			</Grid>
		</>
	);
};
export default VerifyEmailOtp;
