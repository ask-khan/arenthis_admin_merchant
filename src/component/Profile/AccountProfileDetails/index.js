// ********** AccountProfileDetails Component **********
import React, { useEffect, useState } from 'react';
import { Box, Button, Fade, Grid, Snackbar, TextField, Card, CardHeader, Divider, CardContent, Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../Layout/Styles';
import Cookies from 'universal-cookie';
import { userUpdateProfileAction } from '../../../reduxState/aciton/UserAction';
import { AccountProfileDetailFormik } from '../../CustomDasboardFormikHook';
import AppSnackbar from '../../AppSnackbar';

const AccountProfileDetails = () => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** Redux State **********
	const dispatch = useDispatch();
	const getUserInfo = useSelector((state) => state.getUserInfo);
	const { userInformation, updtsuccess } = getUserInfo;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formData) => {
		if (userInformation) {
			dispatch(userUpdateProfileAction(formData));
		}
	};

	// ********** AccountProfileDetailFormik **********
	const formik = AccountProfileDetailFormik(handleFormSubmit);

	// ********** useEffect **********
	useEffect(() => {
		if (userInformation) {
			const { firstName, lastName, email } = userInformation.data;
			formik.setFieldValue('firstName', firstName);
			formik.setFieldValue('lastName', lastName);
			formik.setFieldValue('email', email);
		}
	}, [userInformation]);

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<Card>
					<CardHeader subheader='The information can be edited' title='Profile' />
					<Divider />
					<CardContent>
						<Grid container spacing={2}>
							<Grid item md={6} xs={12}>
								<Typography variant='body1'>First Name</Typography>
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
							<Grid item md={6} xs={12}>
								<Typography variant='body1'>Last Name</Typography>
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
							<Grid item xs={12}>
								<Typography variant='body1'>Email</Typography>
								<TextField
									className={gbclasses.inputRoot}
									variant='outlined'
									placeholder='Email'
									name='email'
									fullWidth
									size='small'
									autoComplete='off'
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									disabled
									error={formik.touched.email && Boolean(formik.errors.email)}
								/>
								<FormHelperText className={gbclasses.errMsgCon}>
									{formik.touched.email && formik.errors.email && formik.errors.email}
								</FormHelperText>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<Box
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
						padding={2}
					>
						<Button color='primary' variant='contained' type='submit'>
							Save details
						</Button>
					</Box>
				</Card>
			</form>

			{/* ********** Snackbar ********** */}
			<AppSnackbar />
		</>
	);
};
export default AccountProfileDetails;
