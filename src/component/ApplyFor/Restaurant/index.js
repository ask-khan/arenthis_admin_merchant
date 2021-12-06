import React, { useEffect, useState } from 'react';
import CreateRestaurant from './CreateRestaurant';
import Cookies from 'universal-cookie';
import ShopApprovalWaiting from '../ShopApprovalWaiting';
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantInfoAction } from '../../../reduxState/aciton/UserAction';
import useAxiosLoader from '../../useAxiosLoader';
import DashboardLoader from '../../DashboardLoader';
import { Backdrop, makeStyles } from '@material-ui/core';
import { FormatListNumberedRtl } from '@material-ui/icons';

// ********** Cookies **********
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
	backdrop: {
		display: 'flex',
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const Restaurant = () => {
	const classes = useStyles();

	// ********** userInfo **********
	const userInfo = cookies.get('userInfo');

	const [internalMarketer, setInternalMarketer] = useState(true);

	// ********** State **********
	const [hasRestaurant, setHasRestaurant] = useState(null);
	const [globalLoading] = useAxiosLoader();

	// ********** Redux State **********
	const dispatch = useDispatch();

	const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
	const { merchantInformation, success: merchantInfoSuccess, loading } = getMerchantInfo;
	const createRestaurant = useSelector((state) => state.createRestaurant);
	const { success: createRestauranrSuccess } = createRestaurant;

	// ********** useEffect **********
	useEffect(() => {
		dispatch(getMerchantInfoAction());
	}, [createRestauranrSuccess]);

	useEffect(() => {
		if (merchantInformation) {
			const { hasRestaurant, ineternalMarketer_assign } = merchantInformation.data;
			if (hasRestaurant) {
				setHasRestaurant(hasRestaurant);
			} else if (!hasRestaurant) {
				setHasRestaurant(hasRestaurant);
			} else if (createRestauranrSuccess) {
				setHasRestaurant(hasRestaurant);
			} else {
				return;
			}

			if (ineternalMarketer_assign) {
				setInternalMarketer(ineternalMarketer_assign);
			} else {
				setInternalMarketer(FormatListNumberedRtl);
			}
		}
	}, [merchantInfoSuccess, createRestauranrSuccess]);

	return (
		<div>
			{globalLoading ? (
				<DashboardLoader />
			) : hasRestaurant === null ? (
				<DashboardLoader />
			) : hasRestaurant !== true ? (
				<ShopApprovalWaiting shopname='Restaurant' />
			) : (
				<CreateRestaurant internalMarketer={internalMarketer} />
			)}
		</div>
	);
};

export default Restaurant;
