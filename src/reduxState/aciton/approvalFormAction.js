import React from 'react';
import {
	APPROVAL_FORM_REQUEST,
	APPROVAL_FORM_SUCCESS,
	APPROVAL_FORM_FAIL,
	APPROVED_DETAIL_REQUEST,
	APPROVED_DETAIL_SUCCESS,
	APPROVED_DETAIL_FAIL,
} from '../constants/approvalFormConstant';
import instance from '../../Config/axios';
import { userUpdateAvatarAction } from './UserAction';
import { toggleSnackbarOpenAction } from './snackbarAction';
// import { USER_AVATAR_REQUEST } from '../constants/Userconstant';

/**********************Aproval******************/
const merchantApprovalFormAction = (formValues) => async (dispatch) => {
	dispatch({ type: APPROVAL_FORM_REQUEST });

	const { nric } = formValues;

	const formData = new FormData();
	formData.append('nric', nric);

	delete formValues.nric;

	try {
		const data = await instance
			.patch('/api/v1/merchants/approval-form', formValues)
			.then(async (res) => {
				await instance.patch(`/api/v1/merchants/upload-files`, formData).then((x) => {
					console.log('nric sunmitted');
				});
			})
			.catch((err) => dispatch(toggleSnackbarOpenAction(`Something went wrong!`, 'error')));

		dispatch({ type: APPROVAL_FORM_SUCCESS, payload: data, success: true });
	} catch (error) {
		dispatch({ type: APPROVAL_FORM_FAIL, payload: error?.response });
		dispatch(toggleSnackbarOpenAction(`Something went wrong!`, 'error'));
	}
};

/**********************merchantAprrovedDetailAction******************/
const merchantAprrovedDetailAction = () => async (dispatch) => {
	dispatch({ type: APPROVED_DETAIL_REQUEST });
	try {
		const { data } = await instance.get('/api/v1/merchants/approval-form');
		// console.log("merchantAprrovedDetailAction",data);
		const { status, doc } = data;
		if (status === 'success') {
			dispatch({ type: APPROVED_DETAIL_SUCCESS, payload: doc, success: true });
		}
	} catch (error) {
		console.log(error);
		dispatch({ type: APPROVED_DETAIL_FAIL, payload: error?.response });
	}
};

export { merchantApprovalFormAction, merchantAprrovedDetailAction };
