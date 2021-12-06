import { makeStyles } from '@material-ui/core/styles';

export const globalStyles = makeStyles((theme) => ({
	gridCon: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh !important',
		[theme.breakpoints.down('sm')]: {
			height: 'auto !important',
		},
	},

	formCon: {
		width: '30%',
		height: '80vh',
		color: '#f6f6f6',
		padding: '2em',
		[theme.breakpoints.down('xl')]: {
			width: '30%',
		},
		[theme.breakpoints.down('lg')]: {
			width: '35%',
			height: '90vh',
		},
		[theme.breakpoints.down('md')]: {
			width: '40%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '500px',
			height: 'auto !important',
		},
		[theme.breakpoints.down('xs')]: {
			padding: '20px !important',
		},
	},

	savebtncon: {
		padding: theme.spacing(1.5, 0),
	},

	savebtn: {
		width: '150px !important',
	},

	formSubCon: {
		// margin: '.5em 0em',
	},

	regFormCon: {
		width: '30%',
		height: '80vh',
		color: '#f6f6f6',
		padding: '1em 2em',
		[theme.breakpoints.down('xl')]: {
			width: '30%',
			overflow: 'scroll',
			overflowX: 'hidden',
		},
		[theme.breakpoints.down('lg')]: {
			width: '35%',
			height: '90vh',
		},
		[theme.breakpoints.down('md')]: {
			overflow: 'auto !important',
			width: '40%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '500px',
			height: 'auto !important',
		},
		[theme.breakpoints.down('xs')]: {
			padding: '20px !important',
		},
	},

	regFormSubCon: {
		// margin: '.5em 0em',
	},

	regFormHeader: {
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(3, 0),
		},
	},

	inputRoot: {
		fontSize: '15px !important',
		paddingTop: '0px !important',
		paddingBottom: '0px !important',
		height: '45px !important',
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.common.black,
		},
		'& .MuiInputBase-root.Mui-disabled': {
			height: '40px !important',
			fontSize: '15px !important',
			color: theme.palette.common.black,
		},
		'& .MuiInputBase-input': {
			fontSize: '15px !important',
			height: 'inherit !important',
		},
		'& input::placeholder': {
			fontSize: '15px !important',
		},
	},

	multiLineinputRoot: {
		fontSize: '15px !important',
		'& .MuiOutlinedInput-inputMultiline': {
			fontSize: '15px !important',
			color: '#000000',
		},
	},

	otpInputRoot: {
		fontSize: '15px !important',
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: theme.palette.common.black,
		},
		'& input::placeholder': {
			fontSize: '15px !important',
		},
		'& .MuiOutlinedInput-input': {
			textAlign: 'center',
			width: '30px',
			height: '30px',
		},
	},

	otpInputCon: {
		padding: theme.spacing(2, 0),
	},

	heading: {
		fontSize: '1.8em',
		fontFamily: 'Poppins, sans-serif',
		color: theme.palette.common.black,
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(4, 0),
	},
	subheading: {
		fontSize: '1.6em',
		fontFamily: 'Poppins, sans-serif',
		color: theme.palette.common.black,
		justifyContent: 'center',
		margin: '0px !important',
	},

	scurityheading: {
		fontSize: '1.8em',
		fontFamily: 'Poppins, sans-serif',
		fontWeight: '500 !important',
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(0, 0, 2, 0),
		margin: '0px !important',
	},

	regHeading: {
		fontSize: '1.8em',
		fontFamily: 'Poppins, sans-serif',
		color: theme.palette.common.black,
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(4, 0),
		[theme.breakpoints.down('lg')]: {
			padding: theme.spacing(2, 0),
		},
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 0),
		},
	},

	apprHeading: {
		fontSize: '1.8em',
		fontFamily: 'Poppins, sans-serif',
		color: theme.palette.common.black,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100% !important',
		padding: theme.spacing(4, 0),
		[theme.breakpoints.down('lg')]: {
			padding: theme.spacing(2, 0),
		},
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 0),
		},
	},
	appSecondHeading: {
		fontSize: '1em',
		fontFamily: 'Poppins, sans-serif',
		color: theme.palette.common.black,
		marginBottom: '1rem',
		marginTop: '1rem',
		padding: theme.spacing(0.2, 0),
	},

	inputLable: {
		fontSize: '14px !important',
		fontWeight: '500 !important',
		color: theme.palette.common.black,
		padding: theme.spacing(0.3, 0),
	},

	navcon: {
		marginTop: '1.2em',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	FormLink: {
		textDecoration: 'none',
	},

	btncon: {
		marginTop: '2em',
	},

	button: {
		borderRadius: '20px',
		height: '45px',
		backgroundColor: theme.palette.common.black,
		color: '#fff !important',
		'&:hover': {
			backgroundColor: theme.palette.common.black,
		},
	},

	lightbutton: {
		borderRadius: '20px',
		height: '45px',
		margin: theme.spacing(2, 0),
		backgroundColor: 'transparent',
		color: '#000000',
		border: '1px solid',
		'&:hover': {
			backgroundColor: theme.palette.common.white,
		},
	},

	errMsgCon: {
		width: '100% !important',
		color: theme.palette.common.red,
		height: '20px',
	},

	cusDisInSt: {
		width: '100% !important',
		height: '20px !important',
	},

	cuspdright: {
		paddingRight: theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(0),
		},
	},

	cuspdleft: {
		paddingLeft: theme.spacing(2),
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(0),
		},
	},

	otpErrMsgCon: {
		width: '100%',
		color: theme.palette.common.red,
		height: '20px',
		textAlign: 'center',
		padding: '20px !important',
	},

	formLinkText: {
		fontSize: 16,
		color: theme.palette.common.black,
		[theme.breakpoints.down('xs')]: {
			fontSize: '15px !important',
		},
		'&:hover': {
			color: theme.palette.common.yellow,
		},
	},

	cussperator: {
		width: '10px',
		height: '3px',
		backgroundColor: theme.palette.common.black,
		margin: theme.spacing(0, 3),
		[theme.breakpoints.down('lg')]: {
			margin: theme.spacing(0, 1),
		},
	},

	gridConFile: {
		fontSize: '15px !important',
		padding: '0px 14px !important',
		height: '45px !important',
		border: '1px solid #bdbdbd',
		borderRadius: '4px !important',
	},

	slickSliderCon: {
		width: '100% !important',
		overflow: 'hidden',
	},

	cusPdLeftRight: {
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
}));
