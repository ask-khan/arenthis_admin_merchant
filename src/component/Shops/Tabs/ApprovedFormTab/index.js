// ********** ApprovedFormTab Component **********
import React, { useEffect, useState } from 'react';
import { Box, Fade, Grid, Snackbar, TextField, Typography, CardHeader, Divider, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../Layout/Styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { getRestaurantDetailAction } from '../../../../reduxState/aciton/shopAction';
import MapSection from './MapSection';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { outletUrl } from '../../../../utils/Urls';
import { useParams } from 'react-router';

import { getOutletDetialsAction } from '../../../../reduxState/aciton/restaurantAction';
import './style.css';
import { height } from 'dom-helpers';

// ********** Alert **********
const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

// ********** useStyles **********
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	sliderMediaCon: {
		height: 200,
	},
	sliderMedia: {
		height: 200,
	},
	mapCon: {
		height: '400px !important',
	},
	mapLoadingCon: {
		height: '400px !important',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const ApprovedFormTab = () => {
	// ********** classes **********
	const classes = useStyles();

	// ********** Slider settings **********
	const config = {
		dots: true,
		lazyLoad: true,

		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
	};

	// ********** initialValues **********
	const initialValues = {
		name: '',
		description: '',
		address: '',
	};

	const initialLocationValues = {
		address: '',
		lat: '',
		lng: '',
	};

	// ********** Initial Array for Restaurant Images **********
	const restauranImagesInitailValues = [];

	// ********** State **********
	const [restaurantDetail, setRestaurantDetail] = useState(initialValues);
	const [shopLocation, setShopLocation] = useState(initialLocationValues);
	const [restaurantImages, setRestaurantImages] = useState(restauranImagesInitailValues);

	console.log(restaurantImages);

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** Snackbar **********
	const [openSanckbar, setOpenSnackbar] = useState({ open: false, severity: '' });

	// ********** Redux State **********
	const dispatch = useDispatch();
	const getOutletDetails = useSelector((state) => state.getOutletDetails);
	const { error, loading, outlets } = getOutletDetails;

	// ********** useEffect **********

	let { slug } = useParams();

	useEffect(() => {
		if (slug) {
			console.log(slug);
			dispatch(getOutletDetialsAction(slug));
		}
	}, [slug]);

	useEffect(() => {
		if (outlets?.data) {
			console.log('restaurantInfo', outlets);
			const { name, description, location, coverImages, images, menuImages } = outlets.data;
			setRestaurantDetail({
				...restaurantDetail,
				name,
				description,
				address: location.address,
			});
			setShopLocation({
				...shopLocation,
				address: location.address,
				lat: location.coordinates[1],
				lng: location.coordinates[0],
			});
			setRestaurantImages([images, ...coverImages, ...menuImages]);
		}
	}, [outlets]);

	return (
		<>
			<Box>
				<Card>
					<CardHeader
						// subheader="The information about Restaurant approved form"
						// title="Approved Form"
						subheader='The information about Outlet'
						title='Outlet Details'
					/>
					<Divider />
					<CardContent>
						<Grid container spacing={2}>
							<Grid item md={6} xs={12}>
								<Typography variant='body1'>Outlet Name</Typography>
								<TextField
									className={gbclasses.inputRoot}
									variant='outlined'
									name='name'
									fullWidth
									size='small'
									autoComplete='off'
									value={restaurantDetail.name}
									disabled
								/>
							</Grid>

							<Grid item md={6} xs={12}>
								<Typography variant='body1'>Outlet Description</Typography>
								<TextField
									variant='outlined'
									placeholder='Description'
									name='description'
									fullWidth
									size='small'
									autoComplete='off'
									multiline={true}
									rows={3}
									value={restaurantDetail.description}
									disabled
								/>
							</Grid>

							<Grid item xs={12}>
								<Typography variant='body1'>Outlet Address</Typography>
								<TextField
									className={gbclasses.inputRoot}
									variant='outlined'
									fullWidth
									size='small'
									autoComplete='off'
									value={restaurantDetail.address}
									disabled
								/>
							</Grid>

							<Grid item xs={12}>
								<Box paddingTop={2}>
									<div className={classes.mapCon}>
										{restaurantDetail.name === '' ? (
											<div className={classes.mapLoadingCon}>
												<p>Loading...</p>
											</div>
										) : (
											<MapSection location={shopLocation} zoomLevel={17} />
										)}
									</div>
								</Box>
							</Grid>

							<Grid item xs={12}>
								<Box style={{ width: '100%' }}>
									{!!restaurantImages && (
										<>
											<Slider {...config}>
												{restaurantImages?.map((imgsrc, index) => (
													<div className={classes.sliderMediaCon} key={index}>
														<img src={`${outletUrl}${imgsrc}`} alt={index} />
														{/* <CardMedia className={classes.sliderMedia} image={`${outletUrl}${imgsrc}`} /> */}
													</div>
												))}
											</Slider>
										</>
									)}
								</Box>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					{/* <Box
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
						padding={2}
					>
						<Button color='primary' variant='contained'>
							Save details
						</Button>
					</Box> */}
				</Card>
			</Box>

			{/* ********** Snackbar ********** */}
			<Snackbar
				open={openSanckbar.open}
				autoHideDuration={6000}
				TransitionComponent={Fade}
				onClose={() => {
					setOpenSnackbar({ open: false });
				}}
			>
				<Alert
					onClose={() => {
						setOpenSnackbar({ open: false });
					}}
					severity={openSanckbar.severity}
				>
					{openSanckbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};
export default ApprovedFormTab;
