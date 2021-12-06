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
import { Box, Checkbox, FormControlLabel, FormHelperText, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import { FormikProvider } from 'formik';
import { CreateRestaurantFormik } from '../../CustomDasboardFormikHook';
import { globalStyles } from '../../Layout/Styles';
import { Autocomplete } from '@material-ui/lab';
import instance from '../../../Config/axios';
import { useDispatch } from 'react-redux';
import { CreateRestaurantsAction } from '../../../reduxState/aciton/restaurantAction';

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

export default function CustomizedDialogs({ openRestaurantDailog, setOpenRestaurantDailog }) {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [frachiseData, setFranchiseData] = useState([]);
	const [franchiseSelect, setFranchiseSelect] = useState('');

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	//********** redux state************ */

	const dispatch = useDispatch();

	// ********** handleFormSubmit **********
	const handleFormSubmit = (formValues) => {
		let data;
		if (formValues) {
			data = { name: formValues.name, description: formValues.description };

			if (formValues.franchise) {
				data.franchise = true;
				data.franchiseId = formValues.franchiseId;
			} else {
				data.franchise = false;
				data.franchiseName = formValues.franchiseName;
			}

			dispatch(CreateRestaurantsAction(data, setOpen));
		}
	};

	// ********** RestaurantFormik **********
	const formik = CreateRestaurantFormik(handleFormSubmit);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const fetchApi = async () => {
		const res = await instance.get(`/api/v1/restaurant-franchise/merchant?active=true`);

		if (res.data.status === 'success') {
			let franchiseSelect = res.data.doc.data.map((x) => ({
				id: x._id,
				name: x.name,
			}));

			console.log(franchiseSelect);
			setFranchiseData(franchiseSelect);
		}
	};

	useEffect(() => {
		console.log(formik.values);
	}, [formik.values]);
	useEffect(() => {
		console.log(formik.errors);
	}, [formik.errors]);

	useEffect(() => {
		fetchApi();
	}, []);

	return (
		<div>
			<Button variant='contained' color='primary' style={{ marginRight: '.5rem' }} onClick={handleClickOpen}>
				Create Restaurant
			</Button>
			<Dialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
				<DialogTitle id='customized-dialog-title' onClose={handleClose}>
					Create Restaurant
				</DialogTitle>
				<form onSubmit={formik.handleSubmit}>
					<DialogContent dividers>
						<Grid item container square component={Paper} elevation={0} justify='center' alignItems='center'>
							<Grid item container direction='row' justify='center' alignItems='center'>
								<Box component={Grid} container>
									<FormikProvider value={formik}>
										<Grid item container className={gbclasses.regFormHeader}>
											<h6 className={gbclasses.apprHeading}>Restaurant Info</h6>
										</Grid>

										<Grid item container justify='center'>
											<Grid item container>
												<Typography className={gbclasses.inputLable}>Restaurant Name</Typography>
											</Grid>
											<TextField
												className={gbclasses.inputRoot}
												variant='outlined'
												placeholder='Restaurant Name'
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
												<Typography className={gbclasses.inputLable}> Restaurant Description</Typography>
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

										<Grid item container justify='flex-start' className={gbclasses.inputLable}>
											<FormControlLabel
												control={
													<Checkbox
														checked={formik.values.franchise}
														onChange={formik.handleChange}
														name='franchise'
														color='primary'
													/>
												}
												label={<Typography color='primary'>Franchise</Typography>}
											/>
											<Grid item container>
												<FormHelperText>please select this if you have default franchise</FormHelperText>
											</Grid>
										</Grid>

										<Grid item container justify='center' style={{ marginTop: '1rem' }}>
											<Grid item container>
												<Typography className={gbclasses.inputLable}> Franchises</Typography>
											</Grid>
											<Autocomplete
												fullWidth
												name='frachiseId'
												menustyle={{ fontSize: 15 }}
												liststyle={{ fontSize: 15 }}
												options={frachiseData}
												// groupBy={(option) => option.name}
												renderOption={(option) => <Typography style={{ fontSize: '15px' }}>{option.name}</Typography>}
												getOptionLabel={(option) => option.name}
												onChange={(e, value) => {
													setFranchiseSelect(value);
													formik.setFieldValue('franchiseId', value?.id || '');
												}}
												InputLabelProps={{
													classes: {
														root: classes.label,
														focused: classes.focused,
													},
												}}
												InputProps={{
													classes: {
														root: classes.outlinedInput,
														focused: classes.focused,
														notchedOutline: classes.notchedOutline,
													},
												}}
												includeInputInList
												disabled={formik.values.franchise ? false : true}
												renderInput={(params) => (
													<TextField
														{...params}
														size='small'
														name='frachiseId'
														placeholder='Select Franchise'
														variant='outlined'
													/>
												)}
											/>
											<FormHelperText className={gbclasses.errMsgCon}>
												{formik.touched.franchiseId && formik.errors.franchiseId && formik.errors.franchiseId}
											</FormHelperText>
										</Grid>
										<Grid item container justify='center'>
											<Grid item container>
												<Typography
													className={gbclasses.inputLable}
													style={{ color: formik?.values?.franchise ? '#a8a8a8' : '#00000' }}
												>
													{' '}
													Franchise Name
												</Typography>
											</Grid>
											<TextField
												className={gbclasses.inputRoot}
												variant='outlined'
												placeholder='Franchise Name'
												name='franchiseName'
												fullWidth
												size='small'
												autoComplete='off'
												value={formik.values.franchiseName}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												disabled={formik.values.franchise ? true : false}
												error={formik.touched.franchiseName && Boolean(formik.errors.franchiseName)}
											/>
											<FormHelperText className={gbclasses.errMsgCon}>
												{formik.touched.franchiseName && formik.errors.franchiseName && formik.errors.franchiseName}
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
