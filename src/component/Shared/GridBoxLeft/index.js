// Note: GridBoxLeft component...!
import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppLogo from '../../Assets/images/AppLogo.png';

// Note: Handeling Material UI styling here...!
const useStyle = makeStyles((theme) => ({
	leftcon: {
		width: '30%',
		height: '80vh',
		[theme.breakpoints.down('xl')]: {
			width: '30%',
		},
		[theme.breakpoints.down('lg')]: {
			width: '35%',
			height: '90vh',
		},
		[theme.breakpoints.down('md')]: {
			width: '40%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '500px',
			height: 'auto !important',
		},
		backgroundColor: theme.palette.common.yellow,
	},

	logocon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		padding: theme.spacing(2, 0),
	},

	applogo: {
		width: '25%',
		objectFit: 'contain',
	},

	listcon: {
		listStyleType: 'none',
		fontSize: 20,
		padding: theme.spacing(2, 0),
		textAlign: 'center',
	},

	litext: {
		// fontFamily: "sen-serif !important",
		fontFamily: 'sans-serif !important',
	},
}));

const GridBoxLeft = () => {
	// Note: Toaccess Material UI...!
	const classes = useStyle();

	return (
		<>
			{/* Box: 1 */}
			<Grid item square container component={Paper} direction='column' elevation={0} className={classes.leftcon} justify='center'>
				<div className={classes.logocon}>
					<img alt='Arenthis' src={AppLogo} className={classes.applogo} />
				</div>

				<ul className={classes.listcon}>
					<li className={classes.litext}>Your Living My Everything</li>
				</ul>
			</Grid>
		</>
	);
};

export default GridBoxLeft;
