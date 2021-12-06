import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Box, FormHelperText, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import { Field, FormikProvider } from 'formik';
import { CreateOutletFormik } from '../../CustomDasboardFormikHook';
import { globalStyles } from '../../Layout/Styles';
import { useDispatch } from 'react-redux';
import { CreateOutletsAction } from '../../../reduxState/aciton/restaurantAction';
import CustomFileInput from '../../CustomFileInput';
import GoogleMapReact from 'google-map-react';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const useStyles = makeStyles(() => ({
	label: {
		'&$focused': {
			color: 'red',
		},
	},
	focused: {},
	outlinedInput: {
		'&$focused $notchedOutline': {
			border: '1px solid red',
		},
	},
	notchedOutline: {},
}));

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, setOpen, restaurantId }) {
	const classes = useStyles();

	// ********** initailLocation **********
	let initailLocation = {
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

	//********** redux state************ */

	const dispatch = useDispatch();

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formValues) => {
		// console.log(location);
		// console.log(formValues);
		let data;
		let images;
		let coverImages;
		let menuImages;

		if (formValues) {
			data = {
				name: formValues.name,
				description: formValues.description,
				location: {
					coordinates: [location.lng, location.lat],
					address: formValues.address,
				},
			};

			images = formValues.profileImage;
			coverImages = formValues.coverPhoto;
			menuImages = formValues.menuPhoto;

			// console.log(data, images, coverImages, menuImages);

			dispatch(CreateOutletsAction(data, images, coverImages, menuImages, restaurantId, setOpen));
		}
	};

	// ********** RestaurantFormik **********
	const formik = CreateOutletFormik(handleFormSubmit);

	const handleClose = () => {
		formik.resetForm();
		setOpen(false);
	};

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
			setIsGetLocation(true);
		}
	}, []);

	return (
		<div>
			<Dialog
				onClose={handleClose}
				scroll={'paper'}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'
				open={open}
			>
				<DialogTitle id='scroll-dialog-title' onClose={handleClose}>
					Create Outlet
				</DialogTitle>
				<form onSubmit={formik.handleSubmit}>
					<DialogContent dividers>
						<Grid item container square component={Paper} elevation={0} justify='center' alignItems='center'>
							<Grid item container direction='row' justify='center' alignItems='center'>
								<Box component={Grid} container>
									<FormikProvider value={formik}>
										<Grid item container className={gbclasses.regFormHeader}>
											<h6 className={gbclasses.apprHeading}>Outlet Info</h6>
										</Grid>

										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}>Outlet Name</Typography>
											</Grid>
											<TextField
												className={gbclasses.inputRoot}
												variant='outlined'
												placeholder='Outlet Name'
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

										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}> Outlet Description</Typography>
											</Grid>
											<TextField
												style={{ marginBottom: '2rem' }}
												className={gbclasses.inputRoot}
												variant='outlined'
												placeholder='Description'
												name='description'
												fullWidth
												size='small'
												autoComplete='off'
												multiline={true}
												rows={3}
												value={formik.values.description}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												error={formik.touched.description && Boolean(formik.errors.description)}
											/>
											<FormHelperText className={gbclasses.errMsgCon}>
												{formik.touched.description && formik.errors.description && formik.errors.description}
											</FormHelperText>
										</Grid>

										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}> Outlet Profile Image</Typography>
											</Grid>
											<Field
												name='profileImage'
												component={CustomFileInput}
												setFieldValue={formik.setFieldValue}
												onBlur={formik.handleBlur}
												value={formik.values.profileImage}
												onChange={formik.handleChange}
												error={formik.touched.profileImage && Boolean(formik.errors.profileImage)}
												isFormSubmit={isFormSubmit}
												acceptedType='image/*'
											/>
											<FormHelperText className={gbclasses.errMsgCon}>
												{formik.touched.profileImage && formik.errors.profileImage && formik.errors.profileImage}
											</FormHelperText>
										</Grid>
										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}> Outlet Cover Image (banner) </Typography>
											</Grid>
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
												multiple
											/>
											<FormHelperText className={gbclasses.errMsgCon}>
												{formik.touched.coverPhoto && formik.errors.coverPhoto && formik.errors.coverPhoto}
											</FormHelperText>
										</Grid>

										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}> Menu Image</Typography>
											</Grid>
											<Field
												name='menuPhoto'
												component={CustomFileInput}
												setFieldValue={formik.setFieldValue}
												onBlur={formik.handleBlur}
												value={formik.values.menuPhoto}
												onChange={formik.handleChange}
												error={formik.touched.menuPhoto && Boolean(formik.errors.menuPhoto)}
												isFormSubmit={isFormSubmit}
												acceptedType='image/*'
												multiple
											/>
											<FormHelperText className={gbclasses.errMsgCon}>
												{formik.touched.menuPhoto && formik.errors.menuPhoto && formik.errors.menuPhoto}
											</FormHelperText>
										</Grid>

										<Grid item container justify='center'>
											<div id='googleMapCon' style={{ width: '100%', height: '200px', marginTop: '1rem', marginBottom: '1rem' }}>
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
										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}> Outlet Address</Typography>
											</Grid>
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
									</FormikProvider>
								</Box>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant='contained' color='primary'>
							cancel
						</Button>
						<Button type='submit' variant='contained' color='primary'>
							Create Restaurant
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}
