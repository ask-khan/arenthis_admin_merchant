import { useFormik } from 'formik';
import {
	FPFormInitialValues,
	FPFormValidationSchema,
	LoginFormInitialValues,
	LoginFormValidationSchema,
	OtpFormInitialValues,
	OtpFormValidationSchema,
	RegForminitialValues,
	RegFormValidationSchema,
	RSFormInitialValues,
	RSFormValidationSchema,
} from '../Validations/Helper';

// ********** LoginFormik **********
export const LoginFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: LoginFormInitialValues,
		validationSchema: LoginFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			formikActions.resetForm();
		},
	});

// ********** RegisterFormik **********
export const RegisterFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: RegForminitialValues,
		validationSchema: RegFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			// formikActions.resetForm();
		},
	});

// ********** ForgotPasswordFormik **********
export const ForgotPasswordFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: FPFormInitialValues,
		validationSchema: FPFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			formikActions.resetForm();
		},
	});

// ********** OtpFormik **********
export const OtpFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: OtpFormInitialValues,
		validationSchema: OtpFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			formikActions.resetForm();
		},
	});

// ********** ResetPasswordFormik **********
export const ResetPasswordFormik = (handleFormSubmit) =>
	useFormik({
		initialValues: RSFormInitialValues,
		validationSchema: RSFormValidationSchema,
		onSubmit: async (values, formikActions) => {
			handleFormSubmit(values);
			formikActions.resetForm();
		},
	});
