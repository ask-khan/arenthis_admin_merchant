// ********** FeaturedModal Component **********
import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import CustomMultipleFileInput from '../CustomMultipleFileInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import { globalStyles } from '../../../../Layout/Styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { filUrlAction } from '../../../../../reduxState/aciton/fileUrlAction';

// Note: Handeling Material UI styling here...!
const useStyle = makeStyles((theme) => ({
    formsubcon: {
        margin: '2em 0em !important',
    },
    modalcon: {
        "& .MuiDialog-paperWidthSm": {
            width: "600px !important",
        },
    },
    autoCompleteCon: {
        "& .MuiAutocomplete-inputRoot": {
            fontSize: "15px !important",
        },
    },
    dlgTitle: {
        fontSize: "25px !important",
        padding: theme.spacing(2.5),
        color: theme.palette.common.black,
        fontWeight: "bold",
    },
}));


const topProducts = [
    { title: 'Cheeze Burger', year: 2015 },
    { title: 'Alfrado Pasta', year: 2019 },
    { title: 'Spegti', year: 2020 },
    { title: 'Colslaw', year: 2021 },
];

const FeaturedModal = ({ isModalOpen, handleClose }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // state
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const [bannerData, setBannerData] = useState(null);

    // Access globalStyles 
    const gbclasses = globalStyles();

    // Access Material Ui
    const classes = useStyle();

    // ***************************Initial Values************************** 
    const initialValues = {
        product: "",
        banner: null,
    };

    const FILE_SIZE = 10000000;
    const IMG_SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    // ***************************Validation************************** 
    const validationSchema = Yup.object({
        product: Yup.string().required('Product is required'),
        banner: Yup.mixed().required('Banner Photo is required').test('fileFormat', 'Unsupported file type', (value) => value !== null && IMG_SUPPORTED_FORMATS.includes(value.type)).test('fileSize', 'File too large', (value) => value !== null && value.size <= FILE_SIZE),
    });

    // ***************************Redux Steat***************************
    const dispatch = useDispatch();

    // ***************************Submit************************** 
    const handleFormSubmit = (formData) => {
        setIsFormSubmit(true);
        handleClose();
        if (bannerData !== null) {
            dispatch(
                filUrlAction(bannerData)
            )
        }
    };

    // ***************************Ref************************** 
    const formikRef = useRef();

    // ***************************useEffect**************************
    useEffect(() => {
        // formikRef.current.resetForm();
    }, []);

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                className={classes.modalcon}
            >
                <Formik
                    innerRef={formikRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, formikActions,) => {
                        handleFormSubmit(values);
                        formikActions.resetForm();
                    }}>
                    {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors, }) => (
                        <>
                            <Typography className={classes.dlgTitle}>
                                Please Add Featured Info
							</Typography>
                            <DialogContent>
                                <Grid item container justify='center' >
                                    <Grid item container>
                                        <Typography className={gbclasses.inputLable}>
                                            Featured Photo
										</Typography>
                                    </Grid>
                                    <Field
                                        name="banner"
                                        component={CustomMultipleFileInput}
                                        setFieldValue={setFieldValue}
                                        onBlur={handleBlur}
                                        value={values.banner}
                                        onChange={handleChange}
                                        error={touched.banner && Boolean(errors.banner)}
                                        isFormSubmit={isFormSubmit}
                                        acceptedType="image/*"
                                        setBannerData={setBannerData}
                                    />
                                    <FormHelperText className={gbclasses.errMsgCon}>{touched.banner && errors.banner && errors.banner}</FormHelperText>
                                </Grid>
                                <Grid item container justify='center' >
                                    <Grid item container>
                                        <Typography className={gbclasses.inputLable}>
                                            Product
										</Typography>
                                    </Grid>
                                    <Autocomplete
                                        id="product-autocomplete"
                                        fullWidth
                                        menuStyle = {{fontSize:14}} listStyle={{fontSize:14}}
                                        options={topProducts}
                                        renderOption={(option) => (
                                            <Typography style={{ fontSize: "15px" }}>{option.title}</Typography>
                                        )}
                                        getOptionLabel={(product, index) => `${product?.title}`}
                                        onChange={(e, value) => setFieldValue("product", value?.title || "")}
                                        onOpen={handleBlur}
                                        includeInputInList
                                        renderInput={(params) => (
                                            <TextField
                                                inputProps={{ ...params.inputProps, style: { fontSize: "10px !important" } }}
                                                {...params}
                                                variant='outlined'
                                                placeholder='Product'
                                                name="product"
                                                fullWidth
                                                size='small'
                                                autoComplete='off'
                                                value={values.product}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.product && Boolean(errors.product)}
                                            />
                                        )}
                                    />
                                    <FormHelperText className={gbclasses.errMsgCon}>{touched.product && errors.product && errors.product}</FormHelperText>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => {
                                    handleSubmit();
                                }}
                                >
                                    Upload
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
};

export default FeaturedModal;