// ********** CreateRestaurant Component **********
import React, { useEffect, useState } from 'react';
import { Box, Button, Fade, Grid, makeStyles, Snackbar, TextField, Typography } from '@material-ui/core';
import { Card, CardHeader, Divider, CardContent, Container } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../Layout/Styles';
import { CreateShopFormik } from '../../../CustomDasboardFormikHook';
import CustomFileInput from '../../../CustomFileInput';
import { Field, FormikProvider } from 'formik';
import { createRestaurantAction } from '../../../../reduxState/aciton/shopAction';
import Head from '../../../../MetaTags';
import GoogleMapReact from 'google-map-react';
import AppSnackbar from '../../../AppSnackbar';
import { Alert, AlertTitle } from '@material-ui/lab';

const CreateRestaurant = () => {
	// ********** initailLocation **********
	const initailLocation = {
		lat: null,
		lng: null,
	};

	// ********** State **********
	const [isFormSubmit, setIsFormSubmit] = useState(false);
	const [mapZoom, setmapZoom] = useState(16);
	const [location, setLocation] = useState(initailLocation);
	const [isGetlocation, setIsGetLocation] = useState(false);

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Navigation **********
	let navigate = useNavigate();

	// ********** handleChangeLocation  **********
	const handleChangeLocation = ({ lat, lng }) => {
		setLocation({ lat, lng });
	};

	// ********** loadMap  **********
	const loadMap = (map, maps) => {
		let marker = new maps.Marker({
			position: { lat: location.lat, lng: location.lng },
			map,
			draggable: true,
		});
	};

	// ********** Redux State **********
	const dispatch = useDispatch();

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formData) => {
		dispatch(createRestaurantAction(formData, location));
		setIsFormSubmit(!isFormSubmit);
		formik.resetForm();
	};

	// ********** CreateShopFormik **********
	const formik = CreateShopFormik(handleFormSubmit);

	// ********** useEffect **********

	useEffect(() => {
		if (navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						...location,
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => console.log(error)
			);
			console.log(navigator);
			setIsGetLocation(true);
		}
	}, []);

	return (
		<>
			<Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
				<Head parent={'Create Restaurant'} child={'Arenthis Admin Pannel'} />
				<Container maxWidth='lg'>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<form onSubmit={formik.handleSubmit}>
								<FormikProvider value={formik}>
									<Alert severity='info'>
										<AlertTitle>info</AlertTitle>
										Please wait for the <strong>Internal marketer</strong> assign from the Arenthis
									</Alert>
									<Card>
										<CardHeader subheader='The information about restaurant' title='Create Restaurant' />
										<Divider />
										<CardContent>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<Typography variant='body1'>Restaurant Name</Typography>
													<TextField
														className={gbclasses.inputRoot}
														variant='outlined'
														placeholder='Name'
														name='name'
														fullWidth
														size='small'
														autoComplete='off'
														value={formik.values.name}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														error={formik.touched.name && Boolean(formik.errors.name)}
													/>
													<FormHelperText className={gbclasses.errMsgCon}>
														{formik.touched.name && formik.errors.name && formik.errors.name}
													</FormHelperText>
												</Grid>
												<Grid item xs={12}>
													<Typography variant='body1'>Restaurant Description</Typography>
													<TextField
														className={gbclasses.multiLineinputRoot}
														variant='outlined'
														placeholder='Description'
														name='description'
														fullWidth
														size='small'
														autoComplete='off'
														value={formik.values.description}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														error={formik.touched.description && Boolean(formik.errors.description)}
														multiline
														rows={4}
													/>
													<FormHelperText className={gbclasses.errMsgCon}>
														{formik.touched.description && formik.errors.description && formik.errors.description}
													</FormHelperText>
												</Grid>

												<Grid item md={6} xs={12}>
													<Typography variant='body1'>Banner Photo</Typography>
													<Field
														name='bannerPhoto'
														component={CustomFileInput}
														setFieldValue={formik.setFieldValue}
														onBlur={formik.handleBlur}
														value={formik.values.bannerPhoto}
														onChange={formik.handleChange}
														error={formik.touched.bannerPhoto && Boolean(formik.errors.bannerPhoto)}
														isFormSubmit={isFormSubmit}
														acceptedType='image/*'
													/>
													<FormHelperText className={gbclasses.errMsgCon}>
														{formik.touched.bannerPhoto && formik.errors.bannerPhoto && formik.errors.bannerPhoto}
													</FormHelperText>
												</Grid>

												<Grid item md={6} xs={12}>
													<Typography variant='body1'>Cover Photo</Typography>
													<Field
														name='coverPhoto'
														component={CustomFileInput}
														setFieldValue={formik.setFieldValue}
														onBlur={formik.handleBlur}
														value={formik.values.coverPhoto}
														onChange={formik.handleChange}
														error={formik.touched.coverPhoto && Boolean(formik.errors.coverPhoto)}
														isFormSubmit={isFormSubmit}
														acceptedType='image/*'
													/>
													<FormHelperText className={gbclasses.errMsgCon}>
														{formik.touched.coverPhoto && formik.errors.coverPhoto && formik.errors.coverPhoto}
													</FormHelperText>
												</Grid>

												<Grid item xs={12}>
													<div id='googleMapCon' style={{ width: '100%', height: '250px' }}>
														{isGetlocation === false ? (
															<Box display='flex' justifyContent='center' alignItems='center' height='250px'>
																<Typography variant='body1'>Loading....</Typography>
															</Box>
														) : (
															<GoogleMapReact
																bootstrapURLKeys={{ key: 'AIzaSyD4C7Anz8evWvt2I6Vn6OvoD-eWHuItegc' }}
																defaultCenter={{ lat: location.lat, lng: location.lng }}
																defaultZoom={mapZoom}
																yesIWantToUseGoogleMapApiInternals
																onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
																onClick={handleChangeLocation}
															/>
														)}
													</div>
													<FormHelperText>Please change location, otherwise it will use your current location</FormHelperText>
												</Grid>

												<Grid item xs={12}>
													<Typography variant='body1'>Restaurant Address</Typography>
													<TextField
														className={gbclasses.inputRoot}
														variant='outlined'
														placeholder='Address'
														name='address'
														fullWidth
														size='small'
														autoComplete='off'
														value={formik.values.address}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														error={formik.touched.address && Boolean(formik.errors.address)}
													/>
													<FormHelperText className={gbclasses.errMsgCon}>
														{formik.touched.address && formik.errors.address && formik.errors.address}
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
								</FormikProvider>
							</form>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* ********** Snackbar ********** */}
			<AppSnackbar />
		</>
	);
};
export default CreateRestaurant;
