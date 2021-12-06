import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardStats from './DashboardStats';
import DashboardApprovalWaiting from './DashboardApprovalWaiting';
import { getMerchantInfoAction } from '../../reduxState/aciton/UserAction';
import useAxiosLoader from '../useAxiosLoader';
import DashboardLoader from '../DashboardLoader';

const Dashboard = () => {
	// ********** State **********
	const [isApproved, setIsApproved] = useState(null);
	const [hasShop, setHasShop] = useState(false);

	const [internalMarketer, setInternalMarketer] = useState(true);
	const [globalLoading] = useAxiosLoader();

	// ********** Redux State **********
	const dispatch = useDispatch();
	const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
	const { merchantInformation, success: merchantInfoSuccess } = getMerchantInfo;

	const createRestaurant = useSelector((state) => state.createRestaurant);
	const { success: createRestauranrSuccess, error, loading } = createRestaurant;

	// ********** useEffect **********
	useEffect(() => {
		dispatch(getMerchantInfoAction());
	}, [createRestauranrSuccess]);

	useEffect(() => {
		if (merchantInformation) {
			const { approved, RestaurantLifeCycle, MartLifeCycle, ineternalMarketer_assign } = merchantInformation.data;

			if (approved) {
				setIsApproved(true);
			} else {
				setIsApproved(false);
			}

			// if (RestaurantLifeCycle == 'Approved' || MartLifeCycle == 'Approved') {
			// 	setHasShop(true);
			// }

			if (ineternalMarketer_assign) {
				setInternalMarketer(ineternalMarketer_assign);
			} else {
				setInternalMarketer(false);
			}
		}
	}, [createRestauranrSuccess, merchantInfoSuccess]);

	return (
		<div>
			{globalLoading ? (
				<DashboardLoader />
			) : isApproved === null ? (
				<DashboardLoader />
			) : !isApproved ? (
				// : hasShop ? (
				// 	<DashboardStats />
				// )

				<DashboardApprovalWaiting isApproved={isApproved} internalMarketer={internalMarketer} />
			) : (
				<DashboardStats internalMarketer={internalMarketer} />
			)}

			{/* {globalLoading ? <DashboardLoader /> : <DashboardStats internalMarketer={internalMarketer} />} */}
		</div>
	);
};

export default Dashboard;
