import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Grid, IconButton } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minWidth: 200,
		borderRadius: '5px',
		overflow: 'hidden',
		paddingBottom: '0px !important',
	},

	title: {
		fontSize: 24,
		fontWeight: 700,
		color: '#34314c',
		textAlign: 'center',
	},
	tagline: {
		fontSize: 11,
		lineHeight: '.5rem',
		textTransform: 'capitalize',
		color: 'rgba(52, 49, 76, 0.54) !important',
		textAlign: 'center',
	},
	icon: {
		marginTop: '.4rem',
	},
});

export default function SimpleCard({ icon, title, count }) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid item container>
					<Grid item xs={3} className={classes.icon}>
						<IconButton size='small' disableRipple>
							{icon}
						</IconButton>
					</Grid>

					<Grid item xs={7}>
						<Typography className={classes.title}>{count}</Typography>
						<Typography className={classes.tagline}>{title}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
