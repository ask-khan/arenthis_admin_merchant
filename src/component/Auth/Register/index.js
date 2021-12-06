// ********** Register Component **********
import React, { useEffect } from 'react';
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridBoxLeft from '../../Shared/GridBoxLeft';
import { globalStyles } from '../../Layout/Styles';
import { userRegisterAction } from '../../../reduxState/aciton/authAction';
import AppBackdrop from '../../AppBackdrop';
import { RegisterFormik } from '../CustomAuthFormikHook';
import AppSnackbar from '../../AppSnackbar';

const Register = () => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** Redux State **********
	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { success, loading } = userRegister;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (values) => {
		const { firstName, lastName, email, password, contact } = values;
		const formData = { firstName, lastName, email, password, phone: { countryCode: 60, contact: contact } };
		dispatch(userRegisterAction(formData));
	};

	// ********** RegisterFormik **********
	const formik = RegisterFormik(handleFormSubmit);

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
				<Grid
					item
					container
					square
					component={Paper}
					elevation={0}
					className={gbclasses.regFormCon}
					justify='center'
					alignItems='center'
				>
					<Grid item container direction='row' justify='center' alignItems='center'>
						<form onSubmit={formik.handleSubmit}>
							<Box component={Grid} container>
								<Grid item container className={gbclasses.regFormHeader}>
									<h4 className={gbclasses.regHeading}>Register</h4>
									<Link to='/login' className={gbclasses.FormLink}>
										<Typography className={gbclasses.formLinkText}>Already have an account ?</Typography>
									</Link>
								</Grid>

								<Grid item container justify='center' className={gbclasses.regFormSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>First Name</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										variant='outlined'
										placeholder='First Name'
										name='firstName'
										fullWidth
										size='small'
										autoComplete='off'
										value={formik.values.firstName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.firstName && Boolean(formik.errors.firstName)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.firstName && formik.errors.firstName && formik.errors.firstName}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.regFormSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Last Name</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										variant='outlined'
										placeholder='Last Name'
										name='lastName'
										fullWidth
										size='small'
										autoComplete='off'
										value={formik.values.lastName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.lastName && Boolean(formik.errors.lastName)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.lastName && formik.errors.lastName && formik.errors.lastName}
									</FormHelperText>
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

								<Grid item container justify='center' className={gbclasses.regFormSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Email</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										type='email'
										variant='outlined'
										placeholder='Email'
										name='email'
										fullWidth
										size='small'
										autoComplete='off'
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.email && Boolean(formik.errors.email)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.email && formik.errors.email && formik.errors.email}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.regFormSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Password</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										type='password'
										variant='outlined'
										placeholder='Password'
										name='password'
										fullWidth
										size='small'
										autoComplete='off'
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.password && Boolean(formik.errors.password)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.password && formik.errors.password && formik.errors.password}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.regFormSubCon}>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Confirm Password</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										type='password'
										variant='outlined'
										placeholder='Confirm Password'
										name='confirmPassword'
										fullWidth
										size='small'
										autoComplete='off'
										value={formik.values.confirmPassword}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.confirmPassword && formik.errors.confirmPassword && formik.errors.confirmPassword}
									</FormHelperText>
								</Grid>

								<Grid item container justify='center' className={gbclasses.btncon}>
									<Button type='submit' fullWidth variant='contained' className={gbclasses.button}>
										Submit
									</Button>
								</Grid>
							</Box>
						</form>
					</Grid>
				</Grid>

				{/* ********** Snackbar ********** */}
				<AppSnackbar />
			</Grid>
		</>
	);
};
export default Register;
