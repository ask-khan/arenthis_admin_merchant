// ********** Timings Component **********
import React, { useEffect, useState } from 'react';
import { Box, Container, Card, Divider, Typography } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
// import { CreateRsTMFormik } from '../../CustomDasboardFormikHook';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../../Layout/Styles';
import TimingsTable from './Table';
// import { creatRestaurantTimingsAction, getMyRestaurant } from '../../../reduxState/aciton/RestaurantAction';
// import { FormSetFieldValues } from './TimingsTable/FormSetFieldValues';

const tableColumns = [
	{ id: 'days', label: 'Days' },
	{ id: 'startTime', label: 'Start Time' },
	{ id: 'closingTime', label: 'Closing Time' },
	{ id: 'open', label: 'Open' },
];

const tableRows = [
	{ id: 'mon', label: 'Monday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
	{ id: 'tue', label: 'Tuesday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
	{ id: 'wed', label: 'Wednesday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
	{ id: 'thu', label: 'Thursday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
	{ id: 'fri', label: 'Friday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
	{ id: 'sat', label: 'Saturday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
	{ id: 'sun', label: 'Sunday', statTime: 'statTime', closingTime: 'ClosingTime', restaurantOpen: 'open' },
];

const Timings = () => {
	// ********** State **********
	const [tableData, setTableData] = useState([]);
	const [resDetail, setResDetail] = useState(null);
	const [hasHours, setHasHours] = useState(false);

	// ********** Redux State **********
	const dispatch = useDispatch();
	// const myRestaurant = useSelector((state) => state.myRestaurant);
	// const { restaurant, loading } = myRestaurant;

	// const createRestTimings = useSelector((state) => state.createRestTimings);
	// const { success } = createRestTimings;

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// // ********** handleFormSubmit **********
	// const handleFormSubmit = (formData) => {
	// 	if (resDetail !== null) {
	// 		dispatch(creatRestaurantTimingsAction(formData, resDetail));
	// 	}
	// };

	// ********** CreateRsTMFormik **********
	// const formik = CreateRsTMFormik(handleFormSubmit);

	// // ********** useEffect **********
	// useEffect(() => {
	// 	dispatch(getMyRestaurant());
	// }, [success]);

	// useEffect(() => {
	// 	if (restaurant) {
	// 		setResDetail(restaurant?.doc?.data);
	// 		if (Array.isArray(restaurant?.doc?.data?.hours) && restaurant?.doc?.data?.hours.length > 0) {
	// 			setHasHours(true);
	// 		}
	// 	}
	// }, [restaurant, resDetail]);

	// useEffect(() => {
	// 	if (hasHours) {
	// 		FormSetFieldValues(formik, resDetail);
	// 	}
	// }, [hasHours]);

	return (
		<Box
			paddingY={3}
			style={{
				backgroundColor: 'background.default',
				minHeight: '100%',
			}}
		>
			<Container maxWidth='xl'>
				<Card>
					<Grid container wrap='wrap'>
						<Grid item style={{ minHeight: '85vh' }} xs={12}>
							{/* <form onSubmit={formik.handleSubmit}> */}
							<Grid item xs={12}>
								<Box padding={3} width={1} display='flex' justifyContent='space-between' alignItems='center'>
									<div>
										<Typography variant='h4' className={gbclasses.textBold}>
											Outlet Timings
										</Typography>
									</div>
									<div>
										<Button color='primary' variant='contained' type='submit'>
											Save Timings
										</Button>
									</div>
								</Box>
							</Grid>

							<TimingsTable
								hasHours={hasHours}
								resDetail={resDetail}
								// formik={formik}
								tableColumns={tableColumns}
								// loading={loading}
								tableRows={tableRows}
							/>
							{/* </form> */}
						</Grid>
					</Grid>
					<Divider />
				</Card>
			</Container>
		</Box>
	);
};

export default Timings;
