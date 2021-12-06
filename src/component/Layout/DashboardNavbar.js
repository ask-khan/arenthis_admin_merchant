import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePubNub } from 'pubnub-react';
import useSound from 'use-sound';
import { AppBar, Badge, Box, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { SignalCellularNullSharp } from '@material-ui/icons';

import { getAllNotification, readAllNotification } from '../../reduxState/aciton/notificationAction';
import PropTypes from 'prop-types';
import DashboardLogo from '../DashboardAssets/DashboardLogo.png';
import DashboardNavbarNotificationCard from './DashboardNavbarNotificationCard';
import { globalStyles } from '../Layout/Styles';
import { userLogoutAction } from '../../reduxState/aciton/authAction';
import { channels } from '../../utils/punbnubChannels';
import beep from '../../../src/component/Assets/sounds/beep.mp3';
import { getMerchantInfoAction } from '../../reduxState/aciton/UserAction';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
	//pubnub
	const pubnub = usePubNub();
	const [play] = useSound(beep);

	// ********* State *********
	const [merchantId, setMerchantId] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [unRead, setUnRead] = useState(0);
	const [openCard, setOpenCard] = useState(false);
	const cardRef = useRef(null);

	// ********** globalStyles **********
	const gbclasses = globalStyles();

	// ********* Redux State *********
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const getNotifications = useSelector((state) => state.getNotifications);
	const { notifications: newNotifications } = getNotifications;

	const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
	const { merchantInformation, success: merchantInfoSuccess } = getMerchantInfo;

	const prevOpen = useRef(openCard);

	// ********* handleLogout *********
	const handleLogout = () => {
		dispatch(userLogoutAction());
	};

	const handleToggle = () => {
		setOpenCard((prevOpen) => !prevOpen);
		if (openCard && unRead > 0) {
			dispatch(readAllNotification(setUnRead));
		}
	};

	const handleClose = (event) => {
		if (cardRef.current && cardRef.current.contains(event.target)) {
			return;
		}
		setOpenCard(false);
	};

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpenCard(false);
		}
	};

	const notificationsSound = () => {
		try {
			// play();
			new Audio(beep).play();
		} catch (error) {
			console.log(error);
		}
	};

	const getMerchantId = () => {
		return userInfo?.data?.user._id;
	};

	const handleMessage = (event) => {
		console.log(event, 'event');
		console.log(merchantId);

		let message;
		let receiverRole;
		switch (event.channel) {
			//merchantLIfe_Cycle
			case channels[0]:
				console.log(event.message);
				message = event.message;
				receiverRole = event.message.receiverRole;
				console.log('merchant', message.receiver == merchantId);
				if (message?.receiver == merchantId && receiverRole == 'merchant') {
					dispatch(getAllNotification(0, 4));
					notificationsSound();
				}
				break;
			case channels[1]:
				console.log(event.message);
				message = event.message;
				receiverRole = event.message.receiverRole;
				console.log('merchant', message.receiver == merchantId);
				if (message?.receiver == merchantId && receiverRole == 'merchant') {
					dispatch(getAllNotification(0, 4));
					notificationsSound();
				}
				break;

			//order accpet by rider notificaiton
			case channels[2]:
				console.log(event.message);
				message = event.message;
				if (message.receiver === merchantId) {
					notificationsSound();
				}
				break;
			default:
				break;
		}
	};

	//***********************************UseEffect***************************** */
	useEffect(() => {
		dispatch(getAllNotification(0, 4));
		dispatch(getMerchantInfoAction());
	}, []);

	useEffect(() => {
		if (newNotifications && newNotifications?.results > 0) {
			setNotifications(newNotifications?.doc?.data);
			const unReadLength = newNotifications?.doc?.data.filter((x) => !x.isRead);
			if (unReadLength?.length > 0) setUnRead(unReadLength.length);
		} else if (newNotifications?.results == 0) {
			setNotifications([]);
		}
	}, [newNotifications]);

	useEffect(() => {
		pubnub.addListener({ message: handleMessage });
		pubnub.subscribe({ channels });
	}, [pubnub, channels]);

	useEffect(() => {
		if (prevOpen.current === true && openCard === false) {
			cardRef.current.focus();
		}
		prevOpen.current = openCard;
	}, [openCard]);

	useEffect(() => {
		if (merchantInformation?.data) {
			const { user } = merchantInformation.data;
			console.log(merchantInformation.data);
			console.log(user);
			// setMerchantId(_id);
		}
	}, [merchantInformation]);

	//************************u*************************************** */
	return (
		<AppBar elevation={0} {...rest}>
			<Toolbar>
				<RouterLink to='/'>
					<img src={DashboardLogo} width='25%' />
				</RouterLink>
				<Box style={{ flexGrow: 1 }} />
				<Hidden mdDown>
					<Tooltip title='Notifications' aria-label='Notifications'>
						<IconButton
							color='inherit'
							ref={cardRef}
							aria-controls={openCard ? 'menu-list-grow' : undefined}
							aria-haspopup='true'
							onClick={() => {
								handleToggle();
							}}
						>
							<Badge color='secondary' badgeContent={unRead}>
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Tooltip>

					<div className={gbclasses.cusPdLeftRight} />

					<Tooltip title='Logout' aria-label='Logout'>
						<IconButton color='inherit' onClick={handleLogout}>
							<InputIcon />
						</IconButton>
					</Tooltip>

					<DashboardNavbarNotificationCard
						openCard={openCard}
						notifications={notifications}
						cardRef={cardRef}
						handleClose={handleClose}
						handleListKeyDown={handleListKeyDown}
					/>
					<div>
						<audio className='audio-element'>
							<source src='https://assets.coderrocketfuel.com/pomodoro-times-up.mp3'></source>
						</audio>
					</div>
				</Hidden>
				<Hidden lgUp>
					<IconButton color='inherit' onClick={onMobileNavOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
};

DashboardNavbar.propTypes = {
	onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
