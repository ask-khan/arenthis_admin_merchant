import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ManageTab from '../Tabs/ManageTab';
import TimmingTab from '../Tabs/Timmings';
import FeaturedTab from '../Tabs/FeaturedTab';
import ReviewsTab from '../Tabs/ReviewsTab';
import StatsTab from '../Tabs/StatsTab';
import { Container, Card, CardContent, Divider, Grid } from '@material-ui/core';
import Head from '../../../MetaTags';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		width: '100%',
		height: '100% !important',
		textTransform: 'none',
		'& span.MuiTab-wrapper': {
			textTransform: 'none',
		},
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		width: '15% !important',
	},

	tabpanelcon: {
		width: '85% !important',
		height: '100% !important',
	},
}));

const TabPanel = (props) => {
	const classes = useStyles();
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			className={classes.tabpanelcon}
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => ({
	id: `vertical-tab-${index}`,
	'aria-controls': `vertical-tabpanel-${index}`,
});

const Restaurant = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	//****************************** */

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const verticalTabsLables = [
		{
			lable: 'Manage',
		},
		{
			lable: 'Timmings',
		},
		{
			lable: 'Featured',
		},
		{
			lable: 'Reviews',
		},
		{
			lable: 'Stats',
		},
		// {
		// 	lable: 'Approved',
		// },
	];

	const verticalTabsPanels = [
		{
			title: 'Manage',
			tabComponent: <ManageTab />,
		},
		{
			title: 'Timmings',
			tabComponent: <TimmingTab />,
		},
		{
			title: 'Featured',
			tabComponent: <FeaturedTab />,
		},
		{
			title: 'Reviews',
			tabComponent: <ReviewsTab />,
		},
		{
			title: 'Stats',
			tabComponent: <StatsTab />,
		},
		// {
		// 	title: 'Approved',
		// 	tabComponent: <ApprovedFormTab />,
		// },
	];

	return (
		<Box
			paddingY={3}
			style={{
				backgroundColor: 'background.default',
				minHeight: '100%',
			}}
		>
			<Head parent={'Restaurant'} child={'Arenthis Admin Pannel'} />
			<Container maxWidth='xl'>
				<Card style={{ height: '100%' }}>
					<CardContent>
						<Grid container wrap='wrap'>
							<Grid item xs={12}>
								<div className={classes.root}>
									{/* Tabs */}
									<Tabs
										orientation='vertical'
										variant='scrollable'
										value={value}
										indicatorColor='primary'
										textColor='primary'
										onChange={handleChange}
									>
										{verticalTabsLables?.map((tab, index) => (
											<Tab key={index} label={tab.lable} {...a11yProps(index)} />
										))}
									</Tabs>

									<>
										{verticalTabsPanels?.map((panel, index) => (
											<TabPanel value={value} index={index} key={index}>
												{panel.tabComponent}
											</TabPanel>
										))}
									</>
								</div>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
				</Card>
			</Container>
		</Box>
	);
};

export default Restaurant;
