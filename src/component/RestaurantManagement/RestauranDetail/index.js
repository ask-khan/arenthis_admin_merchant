// ********** CompleteOrders Component **********
import React, { useEffect, useState } from 'react';
import { Box, Container, Card, Divider } from '@material-ui/core';
import { Button, Grid, makeStyles, Typography, TextField, CardContent, CardHeader } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsAction } from '../../../reduxState/aciton/restaurantAction';
import { Autocomplete } from '@material-ui/lab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { globalStyles } from '../../Layout/Styles';
import CustomTable from '../CustomTable';
import RestaurantDailog from '../Dailogs/RestaurantDailog';
import AppSnackbar from '../../AppSnackbar';

const useStyles = makeStyles((theme) => ({
	addProductBtnContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: theme.spacing(3),
	},

	addProductBtn: {
		color: 'white',
		backgroundColor: '#3E69CF',
		fontWeight: 'bold',
		'&:hover': {
			color: 'white',
			backgroundColor: '#3E69CF',
		},
	},

	notFoundContainer: {
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(3),
	},

	headingText: { fontSize: '24px', color: '#9e9e9e', fontWeight: 700 },
}));

const tableHead = [
	{ id: 'collapseIcon', label: '', minWidth: 10 },
	{ id: 'name', label: 'Name', minWidth: 10 },
	{ id: 'description', label: 'Description', minWidth: 10 },
	{ id: 'franchise', label: 'Franchise', minWidth: 10 },
	{ id: 'franchiseName', label: 'Franchise Name', minWidth: 10 },
	{ id: 'createdAt', label: 'Date', minWidth: 10 },
	{ id: 'action', label: 'Action', minWidth: 10 },
];
const innerTableHead = [
	{ id: 'name', label: 'Name', minWidth: 10 },
	{ id: 'type', label: 'Type', minWidth: 10 },
	{ id: 'price', label: 'Price', minWidth: 10 },
];

const sortBy = ['Name', 'Franchise', 'Created Date'];
const searchBy = ['Name', 'Franchise'];

const CompleteOrders = () => {
	const classes = useStyles();

	// ********** State **********
	const [tableData, setTableData] = useState([]);
	const [selectSort, setselectSort] = useState();
	const [selectSortBy, setSelectSoryby] = useState(false);

	const [selectedSearch, setSelectedSearch] = useState();
	const [search, setSearch] = useState('');

	const [Page, setPage] = useState(1);
	const [Limit, setLimit] = useState(10);

	//*******************Dailog state*********** */

	const [openRestaurantDailog, setOpenRestaurantDailog] = useState(false);
	const [openOutletDailog, setOpenOutletDailog] = useState(false);

	// ********** Redux State **********
	const dispatch = useDispatch();
	const getRestaurants = useSelector((state) => state.getRestaurants);
	const { restaurants, loading } = getRestaurants;

	const addRestaurant = useSelector((state) => state.addRestaurant);
	const { success } = addRestaurant;
	const addOutlets = useSelector((state) => state.addOutlets);
	const { success: OutletSuccess } = addOutlets;

	// ********** handle **********
	const filterSort = () => {
		if (selectSort === 'Name') {
			return 'name';
		} else if (selectSort === 'Franchise') {
			return 'franchise';
		} else if (selectSort === 'Created Date') {
			return 'createdAt';
		}
	};

	const filterSearch = () => {
		if (selectedSearch === 'Name') {
			return { selectQuery: 'name', query: search?.split(' ')?.join('+') };
		}
	};

	const handleSort = () => {
		let url;
		let sortBy = selectSort ? filterSort() : 'createdAt';
		let sortQuery = selectSortBy ? `+${sortBy}` : `-${sortBy}`;
		url = `/api/v1/restaurant-detail/merchant/myRestaurants?sort=${sortQuery}`;
		dispatch(getRestaurantsAction(url));
	};

	const handleSearch = () => {
		if (search && selectedSearch) {
			let selectQuery = filterSearch().selectQuery;
			let query = filterSearch().query;
			let url;
			url = `/api/v1/restaurant-detail/merchant/myRestaurants?${selectQuery}=${query}`;
			dispatch(getRestaurantsAction(url));
			setSearch('');
		}
	};

	const handleReset = () => {
		let url = `/api/v1/restaurant-detail/merchant/myRestaurants?page=${Page}&limit=${Limit}`;
		setselectSort();
		setSelectedSearch();
		setSearch('');
		setSelectSoryby(false);
		dispatch(getRestaurantsAction(url));
	};

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********** useEffect **********
	useEffect(() => {
		let url = `/api/v1/restaurant-detail/merchant/myRestaurants?page=${Page}&limit=${Limit}`;
		dispatch(getRestaurantsAction(url));
	}, [success, OutletSuccess, Page, Limit]);

	useEffect(() => {
		if (restaurants?.results > 0) {
			setTableData(restaurants.doc.data);
		} else {
			setTableData([]);
		}
	}, [restaurants]);

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
					<Grid container direction='row' justifyContent='space-between' alignItems='center'>
						<Grid item container sm>
							<CardHeader title='Restaurant Management' subheader='The information about Restuarants and their outlets' />
						</Grid>

						<Grid item container sm justify='flex-end'>
							<RestaurantDailog />
						</Grid>
					</Grid>
					<Divider />

					<CardContent>
						<Grid container wrap='wrap'>
							<Grid item style={{ minHeight: '85vh' }} xs={12}>
								<Grid container spacing={3}>
									<Grid item xs={12} md={5}>
										<Box padding={3} display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center'>
											<div>
												<Autocomplete
													id='select sort'
													style={{ width: 180 }}
													menustyle={{ fontSize: 15 }}
													liststyle={{ fontSize: 15 }}
													inputValue={selectSort}
													options={sortBy}
													renderOption={(option) => <Typography style={{ fontSize: '15px' }}>{option}</Typography>}
													getOptionLabel={(option) => option}
													onChange={(event, newValue) => {
														setselectSort(newValue);
													}}
													includeInputInList
													renderInput={(params) => <TextField {...params} size='small' label='Sort By' variant='outlined' />}
												/>
											</div>
											<div className={gbclasses.cusPdLeftRight} />
											<div>
												{selectSortBy && (
													<Button
														variant='contained'
														color='primary'
														style={{ marginRight: '.5rem' }}
														onClick={() => setSelectSoryby(false)}
													>
														<ArrowUpwardIcon size='small' />
													</Button>
												)}
												{!selectSortBy && (
													<Button
														variant='contained'
														color='primary'
														style={{ marginRight: '.5rem' }}
														onClick={() => setSelectSoryby(true)}
													>
														<ArrowDownwardIcon size='small' />
													</Button>
												)}
											</div>
											<div className={gbclasses.cusPdLeftRight} />
											<div>
												<Button color='primary' variant='contained' onClick={() => handleSort()}>
													Sort
												</Button>
											</div>
										</Box>
									</Grid>
									<Grid item xs={12} md={7}>
										<Box padding={3} display='flex' flexDirection='row' justifyContent='flex-end' alignItems='center'>
											<div>
												<Autocomplete
													id='select search'
													style={{ width: 180 }}
													menustyle={{ fontSize: 15 }}
													liststyle={{ fontSize: 15 }}
													options={searchBy}
													renderOption={(option) => <Typography style={{ fontSize: '15px' }}>{option}</Typography>}
													getOptionLabel={(option) => option}
													onChange={(event, newValue) => {
														setSelectedSearch(newValue);
													}}
													includeInputInList
													renderInput={(params) => <TextField {...params} size='small' label='Search By' variant='outlined' />}
												/>
											</div>
											<div className={gbclasses.cusPdLeftRight} />
											<div>
												<TextField
													variant='outlined'
													placeholder='Search'
													name='search'
													fullWidth
													style={{ width: 180 }}
													size='small'
													autoComplete='off'
													value={search}
													onChange={(e) => {
														setSearch(e.target.value);
													}}
												/>
											</div>
											<div className={gbclasses.cusPdLeftRight} />
											<div>
												<Button color='primary' variant='contained' onClick={() => handleSearch()}>
													Search
												</Button>
											</div>
											<div className={gbclasses.cusPdLeftRight} />
											<div>
												<Button color='primary' variant='contained' onClick={() => handleReset()}>
													Reset
												</Button>
											</div>
										</Box>
									</Grid>
								</Grid>

								<CustomTable
									tableData={tableData && tableData}
									tableHead={tableHead}
									innerTableHead={innerTableHead}
									loading={loading}
								/>
							</Grid>
						</Grid>
					</CardContent>

					<Divider />
				</Card>
			</Container>

			<AppSnackbar />
		</Box>
	);
};

export default CompleteOrders;
