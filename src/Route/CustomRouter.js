// Note: Main CustomRouter component...!

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute, AuthRoute } from './index';
// importing components
import Login from '../component/Auth/Login/index';
import Register from '../component/Auth/Register/index';
import ForgotPassword from '../component/Auth/ForgotPassword';
import ResetPassword from '../component/Auth/ResetPassword';
import VerifyForgotPasswordOtp from '../component/Auth/VerifyForgotPasswordOtp';
import NotFound from '../component/Shared/NotFound';
import Layout from '../component/Layout/Layout';
import Dashboard from '../component/Dashboard';
import ApprovalWaiting from '../component/ApprovalWaiting';

import ReastaurantShop from '../component/Shops/Restaurant';
import MartShop from '../component/Shops/Mart';
import AllOrders from '../component/Orders/AllOrders';
import PickupOrders from '../component/Orders/PickupOrders';
import ReadyOrders from '../component/Orders/ReadyOrders';
import CompleteOrders from '../component/Orders/CompleteOrders';
import DeliveredOrders from '../component/Orders/DeliveredOrders';
import ReastaurantFinance from '../component/Finance/Restaurant';
import MartFinance from '../component/Finance/Mart';
import Wallet from '../component/Finance/Wallet';
import Daily from '../component/Reports/Daily';
import Notifications from '../component/Notifications';
import Message from '../component/Message';
import Promote from '../component/Promote';
import General from '../component/Settings/General';
import ApprovedForm from '../component/Settings/ApprovedForm';
import Profile from '../component/Profile';
import ApplyForRestaurant from '../component/ApplyFor/Restaurant';
import ApplyForMart from '../component/ApplyFor/Mart';

//restaurant
import RestaurantDetail from '../component/RestaurantManagement/RestauranDetail';

const CustomRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/admin' replace />} />
			<AuthRoute path='login' element={<Login />} />
			<AuthRoute path='register' element={<Register />} />
			<AuthRoute path='forgot-password' element={<ForgotPassword />} />
			<AuthRoute path='reset-password' element={<ResetPassword />} />
			<AuthRoute path='verify-forgot-passowrd-otp' element={<VerifyForgotPasswordOtp />} />

			<PrivateRoute path='/admin' element={Layout}>
				<Route path='/' element={<Dashboard />} />

				{/* <Route path="/approval-waiting" element={<ApprovalWaiting />} /> */}

				<Route path='/restaurant-shop/:slug' element={<ReastaurantShop />} />
				<Route path='/mart-shop' element={<MartShop />} />

				<Route path='/pickup-orders' element={<PickupOrders />} />
				<Route path='/ready-orders' element={<ReadyOrders />} />
				<Route path='/complete-orders' element={<CompleteOrders />} />
				<Route path='/delivered-orders' element={<DeliveredOrders />} />

				<Route path='/restaurant-finance' element={<ReastaurantFinance />} />
				<Route path='/mart-finance' element={<MartFinance />} />
				<Route path='/wallet' element={<Wallet />} />

				<Route path='/daily-reports' element={<Daily />} />
				<Route path='/notifications' element={<Notifications />} />
				<Route path='/message' element={<Message />} />
				<Route path='/promote' element={<Promote />} />

				<Route path='/general-settings' element={<General />} />
				<Route path='/approved-form-settings' element={<ApprovedForm />} />

				<Route path='/profile' element={<Profile />} />

				<Route path='/apply-for-restaurant' element={<ApplyForRestaurant />} />
				{/* <Route path='/apply-for-mart' element={<ApplyForMart />} /> */}

				{/* restaurant management */}
				<Route path='/restaurant-management' element={<RestaurantDetail />} />

				<Route path='*' element={<NotFound />} />
			</PrivateRoute>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default CustomRouter;
