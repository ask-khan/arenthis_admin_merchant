import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const useStyles = makeStyles((theme) => ({
	DashboardLayoutRoot: {
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%',
	},

	DashboardLayoutWrapper: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
		paddingTop: 64,
		[theme.breakpoints.up('lg')]: {
			paddingLeft: 280,
		},
	},

	DashboardLayoutContainer: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
	},

	DashboardLayoutContent: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
	},
}));

const Layout = () => {
	const classes = useStyles();

	const [isMobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<div className={classes.DashboardLayoutRoot}>
			<DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<DashboardSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
			<div className={classes.DashboardLayoutWrapper}>
				<div className={classes.DashboardLayoutContainer}>
					<div className={classes.DashboardLayoutContent}>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
