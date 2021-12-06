// ********** VerifyForgotPasswordOtp Component **********
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridBoxLeft from '../../Shared/GridBoxLeft';
import { globalStyles } from '../../Layout/Styles';
import {
	userForgotPasswordResendOtpAction,
	userLogoutAction,
	userVerifyForgotPasswordOtpAction,
} from '../../../reduxState/aciton/authAction';
import AppBackdrop from '../../AppBackdrop';
import { OtpFormik } from '../CustomAuthFormikHook';
import AppSnackbar from '../../AppSnackbar';

const VerifyForgotPasswordOtp = () => {
	// ********** Location State **********
	const { state } = useLocation();

	// ********** State **********
	const [codeCounter, setCodeCounter] = useState(0);
	const [userEmail, setUseremail] = useState('');

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
	const userVerifyForgotPasswordOtp = useSelector((state) => state.userVerifyForgotPasswordOtp);
	const { vfsuccess, token, vfloading } = userVerifyForgotPasswordOtp;
	const userForgotPasswordResendOtp = useSelector((state) => state.userForgotPasswordResendOtp);
	const { loading } = userForgotPasswordResendOtp;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formData) => {
		const { d1, d2, d3, d4 } = formData;
		const passwordOtp = `${d1}${d2}${d3}${d4}`;
		const formValues = { phone: userEmail, otp: passwordOtp };
		dispatch(userVerifyForgotPasswordOtpAction(formValues));
	};

	// ********** handleResendOtp **********
	const handleResendOtp = () => {
		setCodeCounter(codeCounter + 1);
		const formData = { phone: userEmail };
		dispatch(userForgotPasswordResendOtpAction(formData));
	};

	// ********** handleLogout **********
	const handleLogout = () => {
		dispatch(userLogoutAction());
	};

	// ********** OtpFormik **********
	const formik = OtpFormik(handleFormSubmit);

	// ********** useEffect **********
	useEffect(() => {
		if (state?.phone) {
			const { phone } = state;
			setUseremail(phone);
		} else {
			navigate('/login');
		}
	}, [state]);

	useEffect(() => {
		if (vfsuccess) {
			navigate('/reset-password', { state: { token } });
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
export default VerifyForgotPasswordOtp;
