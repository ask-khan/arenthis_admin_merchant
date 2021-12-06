import { Box, Container, Grid } from '@material-ui/core';
import Budget from './Budget';
import TotalCustomers from './TotalCustomers';
import TasksProgress from './TasksProgress';
import TotalProfit from './TotalProfit';
import TotalSale from './TotalSale';
import AppSnackbar from '../../AppSnackbar';
import { toggleSnackbarOpenAction } from '../../../reduxState/aciton/snackbarAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const DashboardStats = ({ internalMarketer }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (!internalMarketer) {
			dispatch(toggleSnackbarOpenAction('Please wait for the Internal Marketer assign from the Arenthis!', 'info', 100000));
		}
	}, [internalMarketer]);

	return (
		<>
			<Box
				paddingY={3}
				style={{
					backgroundColor: 'background.default',
					minHeight: '100%',
				}}
			>
				<Container maxWidth='xl'>
					<Grid container spacing={3}>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<Budget />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TotalCustomers />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TasksProgress />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TotalProfit />
						</Grid>
						<Grid item xs={12}>
							<TotalSale />
						</Grid>
					</Grid>
				</Container>

				<AppSnackbar />
			</Box>
		</>
	);
};

export default DashboardStats;
