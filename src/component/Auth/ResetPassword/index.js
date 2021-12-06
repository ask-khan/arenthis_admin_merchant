// ********** ResetPassword Component **********
import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridBoxLeft from '../../Shared/GridBoxLeft';
import { globalStyles } from '../../Layout/Styles';
import { userPasswordRestoreAction } from '../../../reduxState/aciton/authAction';
import AppBackdrop from '../../AppBackdrop';
import { ResetPasswordFormik } from '../CustomAuthFormikHook';
import AppSnackbar from '../../AppSnackbar';

const ResetPassword = () => {

    // ********** Location State **********
    const { state } = useLocation();

    // ********** globalStyles **********
    const gbclasses = globalStyles();

    // ********** Navigation **********
    let navigate = useNavigate();

    // ********** State **********
    const [userToken, setUserToken] = useState("");

    // ********** Redux State **********
    const dispatch = useDispatch();
    const userPasswordRestore = useSelector((state) => state.userPasswordRestore);
    const { success, loading } = userPasswordRestore;

    // ********** handleFormSubmit **********
    const handleFormSubmit = (formData) => {
        const { password } = formData;
        dispatch(
            userPasswordRestoreAction(userToken, password)
        );
    };

    // ********** ResetPasswordFormik **********
    const formik = ResetPasswordFormik(handleFormSubmit);

    // ********** useEffect **********
    useEffect(() => {
        if (state) {
            const { token } = state;
            setUserToken(token);
        } else {
            navigate("/login")
        }
    }, [state]);

    useEffect(() => {
        if (success) {
            navigate("/login", { state: null });
        }
    }, [success]);

    return (
        <>

            {/* ********** AppBackdrop For Loading ********** */}
            {loading && <AppBackdrop isBackdropOpen={loading} />}

            <Grid
                item
                container
                className={gbclasses.gridCon}
            >

                {/* ********** Box 1 ********** */}
                <GridBoxLeft />

                {/* ********** Box 2 ********** */}
                <Grid item container square component={Paper} elevation={0} className={gbclasses.formCon} justify='center' alignItems='center'>

                    <Grid item container direction='row' justify='center' alignItems='center'>

                        <form onSubmit={formik.handleSubmit}>

                            <Box component={Grid} container>

                                <Grid item container className={gbclasses.heading}>
                                    <h4>Reset Password</h4>
                                </Grid>

                                <Grid item container justify='center' className={gbclasses.formSubCon}>
                                    <Grid item container>
                                        <Typography className={gbclasses.inputLable}>
                                            Password
										</Typography>
                                    </Grid>
                                    <TextField
                                        className={gbclasses.inputRoot}
                                        type='password'
                                        variant='outlined'
                                        placeholder='Password'
                                        name='password'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                    />
                                    <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.password && formik.errors.password && formik.errors.password}</FormHelperText>
                                </Grid>

                                <Grid item container justify='center' className={gbclasses.formSubCon}>
                                    <Grid item container>
                                        <Typography className={gbclasses.inputLable}>
                                            Confirm Password
											</Typography>
                                    </Grid>
                                    <TextField
                                        className={gbclasses.inputRoot}
                                        type='password'
                                        variant='outlined'
                                        placeholder='Confirm Password'
                                        name='confirmPassword'
                                        fullWidth
                                        size='small'
                                        autoComplete='off'
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    />
                                    <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.confirmPassword && formik.errors.confirmPassword && formik.errors.confirmPassword}</FormHelperText>
                                </Grid>

                                <Grid item container justify='center' className={gbclasses.btncon}>
                                    <Button type="submit" fullWidth variant='contained' className={gbclasses.button}>
                                        Submit
									</Button>
                                </Grid>

                            </Box>

                        </form>

                    </Grid>
                </Grid>

                {/* ********** Snackbar ********** */}
                <AppSnackbar />
                
            </Grid>
        </>
    );
}
export default ResetPassword;