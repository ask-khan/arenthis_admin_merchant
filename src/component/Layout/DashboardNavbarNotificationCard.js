import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {
	Box,
	Container,
	Card,
	CardHeader,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider,
	Avatar,
	Typography,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	ntCardCon: {
		minWidth: 350,
	},
	tinyBtn: {
		textTransform: 'none',
		padding: '5px 20px !important',
	},
}));

const DashboardNavbarNotificationCard = ({ openCard, cardRef, handleClose, handleListKeyDown, notifications }) => {
	const classes = useStyles();

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
	];

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

	return (
		<div className={classes.root}>
			<div>
				<Popper open={openCard} anchorEl={cardRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<Card className={classes.ntCardCon} style={{ height: '100%', maxWidth: '390px' }} elevation={6}>
										<CardHeader
											style={{ padding: '16px 16px 0px 16px !important' }}
											subtitle={`${initialNotifcations.length} in total`}
											title='Latest Notifications'
										/>
										<List>
											{notifications?.length > 0 &&
												notifications?.map((notification, i) => (
													<ListItem divider={i < notifications.length - 1} key={notification._id}>
														<ListItemAvatar>
															<Avatar
																style={{ height: 45, width: 45 }}
																alt={notification?.name}
																src={notification?.imageUrl}
															/>
														</ListItemAvatar>
														<ListItemText
															primary={
																<Typography component='span' variant='body2'>
																	{notification.message}
																</Typography>
															}
															secondary={`${timeSince(new Date(notification.date))} ago`}
														/>
													</ListItem>
												))}
										</List>
										<Divider />
										<Box paddingY={1} style={{ display: 'flex', justifyContent: 'center' }}>
											<Button className={classes.tinyBtn} color='primary'>
												Mark all as read
											</Button>
										</Box>
									</Card>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
};

export default DashboardNavbarNotificationCard;
