import { APPROVAL_FORM_REQUEST, APPROVAL_FORM_SUCCESS, APPROVAL_FORM_FAIL, APPROVED_DETAIL_REQUEST, APPROVED_DETAIL_SUCCESS, APPROVED_DETAIL_FAIL } from '../constants/approvalFormConstant';

// ************************************ approvalFrom Reducer *************************************
function approvalFormReducer(state = {}, action) { 
	switch (action.type) {
		case APPROVAL_FORM_REQUEST:
			return { loading: true };
		case APPROVAL_FORM_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true };
		case APPROVAL_FORM_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
}

// ************************************ aprrovedDetailReducer *************************************
function aprrovedDetailReducer(state = {}, action) { 
	switch (action.type) {
		case APPROVED_DETAIL_REQUEST:
			return { loading: true };
		case APPROVED_DETAIL_SUCCESS:
			return { loading: false, userInfo: action.payload, success: true }; 
		case APPROVED_DETAIL_FAIL:
			return { loading: false, error: action.payload }; 
		default:
			return state;
	}
}

export { approvalFormReducer, aprrovedDetailReducer };