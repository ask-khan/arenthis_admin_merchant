import { useFormik } from 'formik';
import {
	ApprovalFormInitialValues,
	ApprovalFormValidationSchema,
	createOutletValidaitonSchema,
	createOutletValidationSchema,
	CreateRestaurantValidationSchema,
	CreateShopFormInitialValues,
	CreateShopFormValidationSchema,
	RestaurantFormInitialValues,
	ShopDetailFormInitialValues,
	ShopDetailFormValidationSchema,
	UpPrFormInitialValues,
	UpPrFormValidationSchema,
	UpPsFormInitialValues,
	UpPsFormValidationSchema,
} from '../Auth/Validations/Helper';

// ********** ApprovalFormik **********
export const ApprovalFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: ApprovalFormInitialValues,
		validationSchema: ApprovalFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			// formikActions.resetForm();
		},
	});

// ********** ShopDetailFormik **********
export const ShopDetailFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: ShopDetailFormInitialValues,
		validationSchema: ShopDetailFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			formikActions.resetForm();
		},
	});

// ********** AccountProfileDetailFormik **********
export const AccountProfileDetailFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: UpPrFormInitialValues,
		validationSchema: UpPrFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			// formikActions.resetForm();
		},
	});

// ********** ChangePasswordFormik **********
export const ChangePasswordFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: UpPsFormInitialValues,
		validationSchema: UpPsFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			formikActions.resetForm();
		},
	});

// ********** CreateShopFormik **********
export const CreateShopFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: CreateShopFormInitialValues,
		validationSchema: CreateShopFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
		},
	});
// ********** CreateRestauarantFormik **********
export const CreateRestaurantFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: RestaurantFormInitialValues,
		validationSchema: CreateRestaurantValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
		},
	});
// ********** createOutletFormik **********
export const CreateOutletFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: createOutletValidaitonSchema,
		validationSchema: createOutletValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
		},
	});
