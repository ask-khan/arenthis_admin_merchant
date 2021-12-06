import { Box, Container, Card, CardContent, Typography, Divider, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Head from '../../../MetaTags';
import { toggleSnackbarOpenAction } from '../../../reduxState/aciton/snackbarAction';
import { useDispatch } from 'react-redux';
import AppSnackbar from '../../AppSnackbar';

const DashboardApprovalWaiting = ({ isApproved, internalMarketer }) => {
	const initialSteps = ['Merchant Register', 'Approval', 'Create Shop'];

	// ********** State ********** //

	const [activeStep, setActiveStep] = useState(1);

	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();
	// ********** handle ********** //

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	// ********** UseEffect ********** //

	useEffect(() => {
		if (isApproved) {
			setActiveStep(2);
		}
	}, [isApproved]);

	return (
		<Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
			<Head parent={'Dashboard Approval Waiting'} child={'Arenthis Admin Pannel'} />
			<Container maxWidth='xl'>
				<Card>
					<CardContent>
						<Grid container wrap='wrap'>
							<Grid
								item
								style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '85vh' }}
								xs={12}
							>
								<Typography color='textPrimary' gutterBottom variant='h3'>
									Congratulations You are now a part of Arenthis family
								</Typography>
								<Typography color='textPrimary' gutterBottom variant='h3'>
									Your account is {isApproved ? 'one' : 'two'} step away from compeletion
								</Typography>

								<Box>
									<Stepper activeStep={activeStep} orientation='vertical'>
										{initialSteps.map((label, index) => (
											<Step key={label}>
												<StepLabel>{label}</StepLabel>
											</Step>
										))}
									</Stepper>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
				</Card>
			</Container>

			{/* <Snackbar open={internalMarketer} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					This is a success message!
				</Alert>
			</Snackbar> */}
		</Box>
	);
};

export default DashboardApprovalWaiting;
