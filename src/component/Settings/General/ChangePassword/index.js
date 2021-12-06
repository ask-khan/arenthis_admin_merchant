// ********** ChangePassword Component **********
import React from 'react';
import { Box, Button, Grid, TextField, Typography, CardHeader, Card, Divider, CardContent } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { globalStyles } from '../../../Layout/Styles';
import { userUpdatePasswordAction } from '../../../../reduxState/aciton/UserAction';
import { ChangePasswordFormik } from '../../../CustomDasboardFormikHook';
import AppSnackbar from '../../../AppSnackbar'; 
import { useDispatch } from 'react-redux';

const ChangePassword = () => {

    // ********** globalStyles **********
    const gbclasses = globalStyles();

    // ********** Redux State **********
    const dispatch = useDispatch();

    // ********** handleFormSubmit **********
    const handleFormSubmit = (formData) => {
        dispatch(
            userUpdatePasswordAction(formData)
        );
    };

    // ********** ChangePasswordFormik **********
    const formik = ChangePasswordFormik(handleFormSubmit);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <Card>
                    <CardHeader
                        subheader="Password"
                        title="Update password"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                        >

                            <Grid
                                item
                                xs={12}
                            >
                                <Typography variant="body1">
                                    Old Password
                                </Typography>
                                <TextField
                                    className={gbclasses.inputRoot}
                                    type='password'
                                    variant='outlined'
                                    placeholder='Old Password'
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

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography variant="body1">
                                    New Password
								</Typography>
                                <TextField
                                    className={gbclasses.inputRoot}
                                    type='password'
                                    variant='outlined'
                                    placeholder='New Password'
                                    name='newPassword'
                                    fullWidth
                                    size='small'
                                    autoComplete='off'
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                />
                                <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.newPassword && formik.errors.newPassword && formik.errors.newPassword}</FormHelperText>
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <Typography variant="body1">
                                    Confirm New Password
							    </Typography>
                                <TextField
                                    className={gbclasses.inputRoot}
                                    type='password'
                                    variant='outlined'
                                    placeholder='Confirm New Password'
                                    name='confirmNewPassword'
                                    fullWidth
                                    size='small'
                                    autoComplete='off'
                                    value={formik.values.confirmNewPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                                />
                                <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && formik.errors.confirmNewPassword}</FormHelperText>
                            </Grid>

                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                        padding={2}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>

            </form>

            {/* ********** Snackbar ********** */}
            <AppSnackbar />

        </>
    );
}
export default ChangePassword;