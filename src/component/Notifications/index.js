import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Card,
	CardHeader,
	List,
	Button,
	ListItem,
	ListItemAvatar,
	ListItemText,
	IconButton,
	Avatar,
	Divider,
	Grid,
} from '@material-ui/core';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Head from '../../MetaTags';
import { useDispatch } from 'react-redux';
import { getAllNotification } from '../../reduxState/aciton/notificationAction';
import { useSelector } from 'react-redux';

const timeSince = (date) => {
	var seconds = Math.floor((new Date() - date) / 1000);

	var interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) + ' seconds';
};

const Notifications = () => {
	const dispatch = useDispatch();
	const [notifications, setNotifications] = useState([]);

	const initialNotifcations = [
		{
			id: 1,
			name: 'Dropbox',
			imageUrl: 'https://bit.ly/3uOTWwK',
			updatedAt: moment().subtract(2, 'hours'),
		},
		{
			id: 2,
			name: 'Medium Corporation',
			imageUrl: 'https://bit.ly/3uOTWwK',
			updatedAt: moment().subtract(2, 'hours'),
		},
		{
			id: 3,
			name: 'Slack',
			imageUrl: 'https://bit.ly/3uOTWwK',
			updatedAt: moment().subtract(3, 'hours'),
		},
		{
			id: 4,
			name: 'Lyft',
			imageUrl: 'https://bit.ly/3uOTWwK',
			updatedAt: moment().subtract(5, 'hours'),
		},
		{
			id: 5,
			name: 'GitHub',
			imageUrl: 'https://bit.ly/3uOTWwK',
			updatedAt: moment().subtract(9, 'hours'),
		},
		{
			id: 6,
			name: 'Facebook',
			imageUrl: 'https://bit.ly/3uOTWwK',
			updatedAt: moment().subtract(2, 'hours'),
		},
	];

	const getNotifications = useSelector((state) => state.getNotifications);
	const { notifications: newNotifications } = getNotifications;

	useEffect(() => {
		dispatch(getAllNotification(0, 4));
	}, []);

	useEffect(() => {
		if (newNotifications && newNotifications?.results > 0) {
			setNotifications(newNotifications?.doc?.data);
		} else if (newNotifications?.results == 0) {
			setNotifications([]);
		}
	}, [newNotifications]);

	return (
		<Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
			<Head parent={'Notifications'} child={'Arenthis Admin Pannel'} />
			<Container maxWidth='xl'>
				<Grid container>
					<Grid item xs={12}>
						<Card style={{ height: '100%' }}>
							<CardHeader subtitle={`${notifications.length} in total`} title='Latest Notifications' />
							<Divider />
							<List>
								{notifications.map((notification, i) => (
									<ListItem divider={i < notifications.length - 1} key={notification.id}>
										<ListItemAvatar>
											<Avatar style={{ height: 45, width: 45 }} alt={notification?.name} src={notification?.imageUrl} />
										</ListItemAvatar>

										<ListItemText primary={notification.message} secondary={`${timeSince(new Date(notification.date))} ago`} />
										<IconButton edge='end' size='small'>
											<MoreVertIcon />
										</IconButton>
									</ListItem>
								))}
							</List>
							<Divider />
							<Box padding={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<Button color='primary' endIcon={<ArrowRightIcon />} size='small' variant='text'>
									View all
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Notifications;
