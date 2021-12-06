import React from 'react';
import * as Yup from 'yup';
import instance from '../../../../Config/axios';

const FILE_SIZE = 10000000;
const IMG_SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const DOC_SUPPORTED_FORMATS = ['application/pdf'];
const DOC_2_SUPPORTED_FORMATS = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

// ********** Reg Exps **********
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// ********** validationRules **********
const validationRules = {
	firstName: Yup.string()
		.required('First name is required')
		.test('alphabets', 'First name must only contain alphabets', (value) => {
			return /^[A-Za-z]+$/.test(value);
		}),
	lastName: Yup.string()
		.required('Last name is required')
		.test('alphabets', 'Last name must only contain alphabets', (value) => {
			return /^[A-Za-z]+$/.test(value);
		}),
	email: Yup.string().required('Email is required').email('Invalid email address'),
	secretKey: Yup.string().required('Secret Key is required'),
	password: Yup.string()
		.required('Password is required')
		.min(6, ({ min }) => `Password must be at least ${min} characters`),
	confirmPassword: Yup.string()
		.required('Confirm password is required')
		.oneOf([Yup.ref('password')], 'Confirm password do not match to password'),
	digit: Yup.string()
		.required()
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(1, 'Must be exactly 1 digits')
		.max(1, 'Must be exactly 1 digits'),
	phone: Yup.string()
		.required('Phone is required')
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(9, 'Must be exactly 9 digits')
		.max(12, 'Must be exactly 12 digits'),
	newPassword: Yup.string()
		.required('New Password is required')
		.min(6, ({ min }) => `Password must be at least ${min} characters`),
	confirmNewPassword: Yup.string()
		.required('Confirm new password is required')
		.oneOf([Yup.ref('newPassword')], 'Confirm new password do not match to new password'),
	singlePhoto: Yup.mixed()
		.required('Photo is required')
		.test('fileFormat', 'Unsupported file type', (value) => value && IMG_SUPPORTED_FORMATS.includes(value.type))
		.test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE),
	contact: Yup.string()
		.required('Phone Number is required')
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(9, 'Must be exactly 9 digits')
		.max(12, 'Must be exactly 12 digits'),

	fullName: Yup.string()
		.required('Name is required')
		.test('alphabets', 'Name must only contain alphabets', (value) => {
			return /^[a-zA-z]+([\s][a-zA-Z]+)*$/.test(value);
		}),
	address: Yup.string().required('Address is required'),

	malaysianPhone: Yup.string()
		.required('Phone Number is required')
		.test('alphabets', 'Phone is invlaid', (value) => {
			return /^^(\+?6?01)[0|1|2|3|4|6|7|8|9]\-*[0-9]{7,8}$/.test(value);
		}),
};

// ********** Login Form Initial Values **********
export const LoginFormInitialValues = {
	contact: '',
	secretKey: '',
};

// ********** Login Form Validation Schema **********
export const LoginFormValidationSchema = Yup.object({
	contact: validationRules.contact,
	secretKey: validationRules.secretKey,
});

// ********** Register Form Initial Values **********
export const RegForminitialValues = {
	firstName: '',
	lastName: '',
	email: '',
	contact: '',
	password: '',
	confirmPassword: '',
};

// ********** Register Form Validation Schema **********
export const RegFormValidationSchema = Yup.object({
	firstName: validationRules.firstName,
	lastName: validationRules.lastName,
	contact: validationRules.contact,
	email: validationRules.email,
	password: validationRules.password,
	confirmPassword: validationRules.confirmPassword,
});

// ********** ForgotPassword (FP) Form Initial Values **********
export const FPFormInitialValues = {
	contact: '',
};

// ********** Forgot Password (FP) Form Validation Schema **********
export const FPFormValidationSchema = Yup.object({
	contact: validationRules.contact,
});

// ********** ResetPassword (RS) Form Initial Values **********
export const RSFormInitialValues = {
	password: '',
	confirmPassword: '',
};

// ********** ResetPassword (RS) Form Validation Schema **********
export const RSFormValidationSchema = Yup.object({
	password: validationRules.password,
	confirmPassword: validationRules.confirmPassword,
});

// ********** Otp Form Initial Values **********
export const OtpFormInitialValues = {
	d1: '',
	d2: '',
	d3: '',
	d4: '',
};

// ********** Otp Form Validation Schema **********
export const OtpFormValidationSchema = Yup.object({
	d1: validationRules.digit,
	d2: validationRules.digit,
	d3: validationRules.digit,
	d4: validationRules.digit,
});

// ********** Approval Form Initial Values **********
export const ApprovalFormInitialValues = {
	//General Information
	companyName: '',
	companyRegisteredNumber: '',
	companyAddress: '',
	accountEmail: '',
	picNumber: '',
	nric: '',

	//Authorizated Person
	directorName: '',
	directorPhone: '',
	directorEmail: '',

	//Bank INformation
	bankName: '',
	accountNumber: '',
	accountName: '',
	sstRegistered: false,
	sstNumber: '',
	//

	referrerCode: '',
};

//********* Create Restaurant Initial Value********************** */

export const RestaurantFormInitialValues = {
	name: '',
	description: '',
	franchise: false,
	franchiseId: '',
	franchiseName: '',
};

// ********** Approval Form Validation Schema **********
export const ApprovalFormValidationSchema = Yup.object({
	companyName: validationRules.fullName,
	companyRegisteredNumber: Yup.string()
		.required('Registration Number is required')
		.matches(/^[0-9]+$/, 'Must be only digits'),
	companyAddress: validationRules.address,
	picNumber: Yup.string()
		.required('PIC Number is required')
		.test('alphabets', 'Pic Number is invalid', (value) => {
			return /^[0-9]+$/.test(value);
		}),

	accountEmail: Yup.string().email('Invalid email address'),

	//

	directorName: validationRules.fullName,
	directorPhone: validationRules.malaysianPhone,
	directorEmail: Yup.string().required('Director Email is required').email('Invalid email address'),

	nric: Yup.mixed()
		.required('NRIC is required')
		.test('fileFormat', 'Unsupported file type', (value) => value && DOC_2_SUPPORTED_FORMATS.includes(value.type))
		.test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE),

	//

	bankName: validationRules.fullName,
	accountNumber: Yup.string()
		.required('Account Number is required')
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(10, 'Must be exactly 10 digits')
		.max(16, 'Must be exactly 16 digits'),

	accountName: validationRules.fullName,
	sstRegistered: Yup.boolean(),
	sstNumber: Yup.string().test('alphabets', 'SSt Number must only contain numbers', (value) => {
		return /^[0-9]+$/.test(value);
	}),
	referrerCode: Yup.string().matches(/^[0-9]+$/, 'Must be only digits'),
});

//

// ********** Update Profile Form Initial Values **********
export const UpPrFormInitialValues = {
	firstName: '',
	lastName: '',
	email: '',
};

// ********** Update Profile Form Validation Schema*************************
export const UpPrFormValidationSchema = Yup.object({
	firstName: validationRules.firstName,
	lastName: validationRules.lastName,
	email: validationRules.email,
});

// ********** Update Password Initial Values **********
export const UpPsFormInitialValues = {
	password: '',
	newPassword: '',
	confirmNewPassword: '',
};

// ********** Update Password Validation Schema **********
export const UpPsFormValidationSchema = Yup.object({
	password: validationRules.password,
	newPassword: validationRules.newPassword,
	confirmNewPassword: validationRules.confirmNewPassword,
});

// Dashboard Forms Validation

// ********** Shop Detail Form Initial Values **********
export const ShopDetailFormInitialValues = {
	restaurantName: '',
	phone: '',
	address: '',
};

// ********** Shop Detail Form Validation Schema **********
export const ShopDetailFormValidationSchema = Yup.object({
	restaurantName: Yup.string().required('Restaurant Name is required'),
	phone: Yup.string().required('Phone is required').matches(phoneRegExp, 'Phone number is not valid'),
	address: Yup.string().required('Address is required'),
});

// ********** Create Shop Form Initial Values **********
export const CreateShopFormInitialValues = {
	name: '',
	description: '',
	address: '',
	bannerPhoto: '',
	coverPhoto: '',
};

// ********** Create Shop Form Validation Schema **********
export const CreateShopFormValidationSchema = Yup.object({
	name: Yup.string()
		.required('Name is required')
		.min(10, ({ min, value }) => `${min - value.length} characters to go`),
	description: Yup.string().required('Description is required'),
	address: Yup.string().required('Address is required'),
	bannerPhoto: validationRules.singlePhoto,
	coverPhoto: validationRules.singlePhoto,
});
// ********** Create Restauarnt Schema **********
export const CreateRestaurantValidationSchema = Yup.object({
	name: Yup.string()
		.required('Name is required')
		.min(5, ({ min, value }) => `${min - value.length} characters to go`),
	description: Yup.string().required('Description is required'),
	franchise: Yup.boolean(),
	franchiseId: Yup.string().when('franchise', {
		is: true,
		then: Yup.string().required('Frachise is required.'),
	}),
	franchiseName: Yup.string().when('franchise', {
		is: false,
		then: Yup.string().required('Frachise is required.'),
	}),
});

// ********** Create Shop Form Initial Values **********
export const createOutletValidaitonSchema = {
	name: '',
	description: '',
	address: '',
	profileImage: '',
	coverPhoto: '',
	menuPhoto: '',
};

export const createOutletValidationSchema = Yup.object({
	name: Yup.string()
		.required('Name is required')
		.min(5, ({ min, value }) => `${min - value.length} characters to go`),
	description: Yup.string().required('Description is required'),
	address: Yup.string().required('Address is required'),
	profileImage: validationRules.singlePhoto,
	coverPhoto: validationRules.singlePhoto,
	menuPhoto: validationRules.singlePhoto,
});

// if check then filed is reuqired

// Yup.string().when('isCompany', {
// 	is: (isCompany) => true,//just an e.g. you can return a function
// 	then: Yup.string().required('Field is required'),
// 	otherwise: Yup.string()
//   }),

// referralCode: Yup.string().test('Referral Code', 'Referral code is invalid', (value) => {
// 	return new Promise((resolve, reject) => {
// 		if (value?.length == 5) {
// 			instance
// 				.post('/api/v1/merchants/verify-referralCode', { referralCode: value })
// 				.then((res) => {
// 					if (res.data.status === 'success') {
// 						resolve(true);
// 					}
// 					resolve(false);
// 				})
// 				.catch((x) => {
// 					resolve(false);
// 				});
// 		}
// 	});
// }),
