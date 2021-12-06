import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';
import Head from '../../MetaTags';

const Profile = () => (
	<Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
		<Head parent={'Profile'} child={'Arenthis Admin Pannel'} />
		<Container maxWidth='lg'>
			<Grid container spacing={3}>
				<Grid item lg={4} md={6} xs={12}>
					<AccountProfile />
				</Grid>
				<Grid item lg={8} md={6} xs={12}>
					<AccountProfileDetails />
				</Grid>
			</Grid>
		</Container>
	</Box>
);

export default Profile;
