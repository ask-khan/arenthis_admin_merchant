// ********** ForgotPassword Component **********
import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Grid, Paper, TextField, Typography, FormControlLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridBoxLeft from '../Shared/GridBoxLeft';
import { globalStyles } from '../Layout/Styles';
import { Field, FormikProvider } from 'formik';
import { merchantApprovalFormAction } from '../../reduxState/aciton/approvalFormAction';
import AppBackdrop from '../AppBackdrop';
import { ApprovalFormik } from '../CustomDasboardFormikHook';
import CustomFileInput from '../CustomFileInput';
import { getMerchantInfoAction } from '../../reduxState/aciton/UserAction';
import AppSnackbar from '../AppSnackbar';

const ApprovalForm = () => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** userData **********
	const userData = {
		firstName: '',
		lastName: '',
		email: '',
	};

	// ********** State **********
	const [userDetail, setUserDetail] = useState(userData);
	const [isFormSubmit, setIsFormSubmit] = useState(false);

	// ********** Redux State **********
	const dispatch = useDispatch();
	const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
	const { merchantInformation, success: merchantInfoSuccess } = getMerchantInfo;
	const merchantApprovalForm = useSelector((state) => state.merchantApprovalForm);
	const { success, loading } = merchantApprovalForm;

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formValues) => {
		dispatch(merchantApprovalFormAction(formValues));
		setIsFormSubmit(!isFormSubmit);
	};
	// ********** handle **********
	const handleVerifyCode = (x) => {
		console.log(x);
		// /api/v1/merchants/verify-referralCode
	};

	// ********** ApprovalFormik **********
	const formik = ApprovalFormik(handleFormSubmit);

	// ********** useEffect **********
	useEffect(() => {
		dispatch(getMerchantInfoAction());
	}, []);

	useEffect(() => {
		if (merchantInformation) {
			const { firstName, lastName, email } = merchantInformation.data;
			setUserDetail({
				...userDetail,
				firstName,
				lastName,
				email,
			});
		}
	}, [merchantInformation]);

	useEffect(() => {
		if (success) {
			window.location.href = '/admin';
		}
	}, [success]);

	useEffect(() => {
		console.log(formik.values, 'formik.vlaue');
	}, [formik.values]);

	let generalInformation = [
		{
			name: 'companyName',
			placeholder: 'Company Name',
		},
		{
			name: 'companyRegisteredNumber',
			placeholder: 'Company Registration Number',
		},
		{
			name: 'companyAddress',
			placeholder: 'Company Address',
		},
		{
			name: 'personInCharge',
			placeholder: 'Person in Change',
			value: `${userDetail.firstName} ${userDetail.lastName}`,
			disable: true,
		},
		{
			name: 'picNumber',
			placeholder: 'PIC Contact Number',
		},
		{
			name: 'accountEmail',
			placeholder: 'Account Email & Finance',
			optional: true,
		},
		{
			name: 'icEmail',
			placeholder: 'PIC Email',
			value: `${userDetail.email}`,
			disabled: true,
		},
	];

	let authorizedPerson = [
		{
			name: 'directorName',
			placeholder: 'Director Name',
			type: 'text',
		},
		{
			name: 'directorPhone',
			placeholder: 'Director Phone',
			type: 'text',
		},
		{
			name: 'directorEmail',
			placeholder: 'Director Email',
			type: 'text',
		},
		{
			name: 'nric',
			placeholder: 'NRIC',
			type: 'file',
		},
	];
	let account = [
		{
			name: 'bankName',
			placeholder: 'Bank Name',
			type: 'text',
		},
		{
			name: 'accountName',
			placeholder: 'Account Name',
			type: 'text',
		},
		{
			name: 'accountNumber',
			placeholder: 'Account Number',
			type: 'text',
		},
		{
			name: 'sstRegistered',
			placeholder: 'SSt Registered',
			type: 'checkbox',
		},
		{
			name: 'sstNumber',
			placeholder: 'SST Number',
			type: 'text',
		},
	];

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
								<FormikProvider value={formik}>
									<Grid item container className={gbclasses.regFormHeader}>
										<h4 className={gbclasses.apprHeading}>Approval Form</h4>
									</Grid>

									<Grid item container className={gbclasses.regFormHeader}>
										<h6 className={gbclasses.appSecondHeading}>General Information</h6>
									</Grid>

									{generalInformation.map((x) => {
										return (
											<Grid item container justify='center' key={x.name}>
												<Grid item container>
													<Typography className={gbclasses.inputLable}>
														{x.placeholder}
														{x.optional && `  (optional)`}
													</Typography>
												</Grid>
												<TextField
													style={{ marginBottom: x.name === 'companyAddress' ? '2rem' : undefined }}
													className={gbclasses.inputRoot}
													variant='outlined'
													placeholder={x.placeholder}
													name={x.name}
													fullWidth
													size='small'
													autoComplete='off'
													value={x.name === 'personInCharge' || x.name == 'icEmail' ? x.value : formik.values[`${x.name}`]}
													disabled={x.disabled ? true : false}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													multiline={x.name === 'companyAddress' ? true : false}
													rows={x.name === 'companyAddress' ? 3 : 1}
													error={formik.touched[`${x.name}`] && Boolean(formik.errors[`${x.name}`])}
												/>
												<FormHelperText className={gbclasses.errMsgCon}>
													{formik.touched[`${x.name}`] && formik.errors[`${x.name}`] && formik.errors[`${x.name}`]}
												</FormHelperText>
											</Grid>
										);
									})}

									<Grid item container className={gbclasses.regFormHeader}>
										<h6 className={gbclasses.appSecondHeading}>Authorizated Person</h6>
									</Grid>

									{authorizedPerson.map((x) => {
										return (
											<Grid item container justify='center' key={x.name}>
												<Grid item container>
													<Typography className={gbclasses.inputLable}>
														{x.placeholder}
														{x.optional && `  (optional)`}
													</Typography>
												</Grid>
												{x.type == 'text' ? (
													<>
														<TextField
															className={gbclasses.inputRoot}
															variant='outlined'
															placeholder={x.placeholder}
															name={x.name}
															fullWidth
															size='small'
															autoComplete='off'
															value={formik.values[`${x.name}`]}
															disabled={x.disabled ? true : false}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															error={formik.touched[`${x.name}`] && Boolean(formik.errors[`${x.name}`])}
														/>
														<FormHelperText className={gbclasses.errMsgCon}>
															{formik.touched[`${x.name}`] && formik.errors[`${x.name}`] && formik.errors[`${x.name}`]}
														</FormHelperText>
													</>
												) : (
													<>
														<Field
															name={x.name}
															component={CustomFileInput}
															setFieldValue={formik.setFieldValue}
															onBlur={formik.handleBlur}
															value={formik.values[`${x.name}`]}
															onChange={formik.handleChange}
															error={formik.values[`${x.name}`] && Boolean(formik.values[`${x.name}`])}
															isFormSubmit={isFormSubmit}
															acceptedType='application/pdf,image/*'
														/>
														<FormHelperText className={gbclasses.errMsgCon}>
															{formik.touched[`${x.name}`] && formik.errors[`${x.name}`] && formik.errors[`${x.name}`]}
														</FormHelperText>
													</>
												)}
											</Grid>
										);
									})}

									<Grid item container className={gbclasses.regFormHeader}>
										<h6 className={gbclasses.appSecondHeading}>Account & Finance</h6>
									</Grid>

									{account.map((x) => {
										return (
											<Grid item container justify='center' key={x.name}>
												{x.type == 'checkbox' ? (
													<Grid item container justify='flex-start'>
														<FormControlLabel
															control={
																<Checkbox
																	checked={formik.values[`${x.name}`]}
																	onChange={formik.handleChange}
																	name={x.name}
																	color='primary'
																/>
															}
															label={<Typography color='primary'>SST Registered</Typography>}
														/>
													</Grid>
												) : (
													<>
														<Grid item container>
															<Typography className={gbclasses.inputLable}>
																{x.placeholder} {x.optional && '(optional)'}
															</Typography>
														</Grid>
														<TextField
															className={gbclasses.inputRoot}
															variant='outlined'
															placeholder={x.placeholder}
															name={x.name}
															fullWidth
															size='small'
															autoComplete='off'
															value={formik.values[`${x.name}`]}
															disabled={x.disabled ? true : false}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															error={formik.touched[`${x.name}`] && Boolean(formik.errors[`${x.name}`])}
														/>
													</>
												)}
												<FormHelperText className={gbclasses.errMsgCon}>
													{formik.touched[`${x.name}`] && formik.errors[`${x.name}`] && formik.errors[`${x.name}`]}
												</FormHelperText>
											</Grid>
										);
									})}

									<Grid item container className={gbclasses.regFormHeader}>
										<h6 className={gbclasses.appSecondHeading}>Referral Code</h6>
									</Grid>
									<Grid item container>
										<Typography className={gbclasses.inputLable}>Referral code</Typography>
									</Grid>
									<TextField
										className={gbclasses.inputRoot}
										variant='outlined'
										placeholder={'Referral Code'}
										name={'referrerCode'}
										fullWidth
										size='small'
										autoComplete='off'
										value={formik.values.referrerCode}
										onChange={formik.handleChange}
										inputProps={{ maxLength: 5 }}
										onBlur={formik.handleBlur}
										error={formik.touched.referrerCode && Boolean(formik.errors.referrerCode)}
									/>
									<FormHelperText className={gbclasses.errMsgCon}>
										{formik.touched.referrerCode && formik.errors.referrerCode && formik.errors.referrerCode}
									</FormHelperText>
									<Grid item container justify='center' className={gbclasses.btncon}>
										<Button type='submit' fullWidth variant='contained' className={gbclasses.button}>
											Submit
										</Button>
									</Grid>
								</FormikProvider>
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
export default ApprovalForm;
