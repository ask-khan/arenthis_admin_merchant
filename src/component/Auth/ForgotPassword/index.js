// ********** ForgotPassword Component **********
import React, { useEffect } from 'react';
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridBoxLeft from '../../Shared/GridBoxLeft';
import { globalStyles } from '../../Layout/Styles';
import { userForgotPasswordAction } from '../../../reduxState/aciton/authAction';
import AppBackdrop from '../../AppBackdrop';
import { ForgotPasswordFormik } from '../CustomAuthFormikHook';
import AppSnackbar from '../../AppSnackbar';

const ForgotPassword = () => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** Redux State **********
	const dispatch = useDispatch();
	const userForgotPassword = useSelector((state) => state.userForgotPassword);
	const { success, loading, phone } = userForgotPassword;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formData) => {
		dispatch(userForgotPasswordAction(formData));
	};

	// ********** ForgotPasswordFormik **********
	const formik = ForgotPasswordFormik(handleFormSubmit);

	// ********** useEffect **********
	useEffect(() => {
		if (success) {
			navigate('/verify-forgot-passowrd-otp', { state: { phone } });
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
									<h4>Forgot Password</h4>
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
										fullWidth
										name='contact'
										autoComplete='off'
										inputProps={{ maxLength: 12 }}
										InputProps={{ startAdornment: <InputAdornment position='start'>+60</InputAdornment> }}
										value={formik.values.contact}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.contact && Boolean(formik.errors.contact)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.contact && formik.errors.contact && formik.errors.contact}
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

							<Link to='/login' className={gbclasses.FormLink}>
								<Typography className={gbclasses.formLinkText}>Back to login ?</Typography>
							</Link>
						</div>
					</Grid>
				</Grid>

				{/* ********** Snackbar ********** */}
				<AppSnackbar />
			</Grid>
		</>
	);
};
export default ForgotPassword;
