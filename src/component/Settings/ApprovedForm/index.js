// ********** ApprovedForm Component **********
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Typography, TextField, Link, Container } from '@material-ui/core';
import { globalStyles } from '../../Layout/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { merchantAprrovedDetailAction } from '../../../reduxState/aciton/approvalFormAction';
import { merchantUrl, avatarUrl } from '../../../utils/Urls';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, Divider, CardHeader, Button } from '@material-ui/core';
import { getMerchantInfoAction, getUserInfoAction } from '../../../reduxState/aciton/UserAction';

const ApprovedForm = () => {
	// ********** globalStyles **********
	const gbclasses = globalStyles();

	const initialValues = {
		merchantFirstName: '',
		merchantLastName: '',
		merchantEmail: '',
		picNumber: '',
		SSMRegistrationNo: '',
		ssmDocument: '',
		avatar: '',
	};

	const [userAprrovdDetail, setUserAprrovdDetail] = useState(initialValues);
	const [userInfo, setUserInfo] = useState({ avatar: '', username: '', firstName: '', lastName: '', userName: '' });

	// ********** Redux State **********
	const dispatch = useDispatch();
	const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
	const { merchantInformation, success: merchantInfoSuccess } = getMerchantInfo;

	const getUserInfo = useSelector((state) => state.getUserInfo);
	const { userInformation, updtsuccess } = getUserInfo;

	console.log(userInformation);

	//********Fields******************* */

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
			name: 'picNumber',
			placeholder: 'PIC Contact Number',
		},
		{
			name: 'accountEmail',
			placeholder: 'Account Email & Finance',
			optional: true,
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
			optional: true,
		},
	];

	// ********** Redux State **********
	useEffect(() => {
		dispatch(getMerchantInfoAction());
		dispatch(getUserInfoAction());
	}, []);

	// ********** useEffect **********

	useEffect(() => {
		if (merchantInformation) {
			const {
				companyName,
				companyRegisteredNumber,
				companyAddress,
				personInCharge,
				picNumber,
				accountEmail,
				icEmail,
				directorName,
				directorPhone,
				directorEmail,
				nric,
				bankName,
				accountName,
				accountNumber,
				sstRegistered,
				sstNumber,
			} = merchantInformation.data;

			setUserAprrovdDetail({
				companyName,
				companyRegisteredNumber,
				companyAddress,
				personInCharge,
				picNumber,
				accountEmail,
				icEmail,
				directorName,
				directorPhone,
				directorEmail,
				nric,
				bankName,
				accountName,
				accountNumber,
				sstRegistered,
				sstNumber,
			});
		}
	}, [merchantInformation]);

	useEffect(() => {
		if (userInformation) {
			console.log(userInformation.data);
			const { username, avatar, firstName, lastName, email } = userInformation.data;

			setUserInfo({ avatar, username, firstName, lastName, email });
		}
	}, [userInformation]);

	return (
		<div>
			<Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
				<Container maxWidth='xl'>
					<Grid container spacing={3} style={{ paddingBottom: '7rem' }}>
						<Grid item xs={12}>
							<Card>
								<CardHeader title='Approved Form' subheader='The information about Approved Form  by Admin' />
								<Divider />
								<CardContent>
									<Grid container spacing={2}>
										<Grid item container xs={12}>
											<Box paddingY={3}>
												<Avatar
													alt={userAprrovdDetail.merchantFirstName}
													style={{ width: 120, height: 120 }}
													src={`${avatarUrl}${userInfo.avatar}`}
												/>
											</Box>
										</Grid>

										<Grid item container className={gbclasses.regFormHeader}>
											<h6 className={gbclasses.appSecondHeading}>General Information</h6>
										</Grid>

										{generalInformation.map((x) => (
											<Grid item md={6} xs={12}>
												<Typography variant='body1'>{x.placeholder}</Typography>
												<TextField
													className={gbclasses.inputRoot}
													variant='outlined'
													placeholder={x.placeholder}
													fullWidth
													size='small'
													autoComplete='off'
													value={userAprrovdDetail[x.name] || ''}
													disabled
												/>
											</Grid>
										))}
										<Grid item md={6} xs={12}>
											<Typography variant='body1'>Person In Charge</Typography>
											<TextField
												className={gbclasses.inputRoot}
												variant='outlined'
												placeholder={'Person In Charge'}
												fullWidth
												size='small'
												autoComplete='off'
												value={`${userInfo.firstName} ${userInfo.lastName}` || ''}
												disabled
											/>
										</Grid>
										<Grid item md={6} xs={12}>
											<Typography variant='body1'>PIC Email</Typography>
											<TextField
												className={gbclasses.inputRoot}
												variant='outlined'
												placeholder={'PIC Email'}
												fullWidth
												size='small'
												autoComplete='off'
												value={userInfo.email || ''}
												disabled
											/>
										</Grid>

										<Grid item container className={gbclasses.regFormHeader}>
											<h6 className={gbclasses.appSecondHeading}>Authorizated Person</h6>
										</Grid>

										{authorizedPerson.map((x) => (
											<>
												{x.type == 'text' ? (
													<Grid item md={6} xs={12}>
														<Typography variant='body1'>{x.placeholder}</Typography>
														<TextField
															className={gbclasses.inputRoot}
															variant='outlined'
															placeholder={x.placeholder}
															fullWidth
															size='small'
															autoComplete='off'
															value={userAprrovdDetail[x.name] || ''}
															disabled
														/>
													</Grid>
												) : (
													<Grid item md={6} xs={12}>
														<Typography variant='body1'>NRIC</Typography>
														<Grid container alignItems='center' className={gbclasses.gridConFile}>
															<Link
																target='_blank'
																href={`${merchantUrl}${userInfo?.username}/${userAprrovdDetail[x.name]}`}
															>
																NRIC
															</Link>
														</Grid>
													</Grid>
												)}
											</>
										))}

										<Grid item container className={gbclasses.regFormHeader}>
											<h6 className={gbclasses.appSecondHeading}>Account & Finance</h6>
										</Grid>

										{account.map((x) => (
											<Grid item md={6} xs={12}>
												<Typography variant='body1'>{x.placeholder}</Typography>
												<TextField
													className={gbclasses.inputRoot}
													variant='outlined'
													placeholder={x.placeholder}
													fullWidth
													size='small'
													autoComplete='off'
													value={
														x.name === 'sstRegistered'
															? userAprrovdDetail[x.name]
																? 'Yes'
																: 'No'
															: userAprrovdDetail[x.name] || ''
													}
													disabled
												/>
											</Grid>
										))}
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</div>
	);
};

export default ApprovedForm;
