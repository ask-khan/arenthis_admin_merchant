import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Chart from './Chart/Chart';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},

	heading: {
		fontFamily: "sans-serif",
		paddingBottom: theme.spacing(2)
	},

}));

export default function StatsTab() {

	const classes = useStyles();

	return (
		<Grid container spacing={4}>
			<Grid item xs={12} sm={12} md={6}>
				<Paper className={classes.paper}>
					<h2 className={classes.heading}>Orders</h2>
					<Chart name="Orders" />
				</Paper>
			</Grid>
			<Grid item xs={12} sm={12} md={6}>
				<Paper className={classes.paper}>
					<h2 className={classes.heading}>Revenue</h2>
					<Chart name="Revenue" />
				</Paper>
			</Grid>
		</Grid>
	);
}
