import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	animamtion: {
		backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
		backgroundSize: "cover",
		backgroundPosition: "center",

		height: "320px",
		marginBottom: "1rem",
	},
}));

function NotFound() {
	const classes = useStyles();
	return (
		<Grid item container alignItems="center" component={Paper} elevation={0}>
			<Grid item container justify="center">
				<Typography variant="h1"> 404 ⚠️ </Typography>
			</Grid>
			<Grid item container justify="center" className={classes.animamtion} />

			<Grid item container style={{ marginBottom: "2rem" }}>
				<Grid item container justify="center" alignItems="center">
					<Typography variant="h3"> Look like you're lost </Typography>
				</Grid>

				<Grid item container justify="center" alignItems="center">
					<Typography> The page you are looking for is not available! </Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default NotFound;
