// ********** ChangePassword Component **********
import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, TextField, Typography, Card, CardHeader, Divider, CardContent, Button } from '@material-ui/core';
import { globalStyles } from '../../../Layout/Styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useDispatch, useSelector } from 'react-redux';
import { genRestaurantSecKeyAction, getRestaurantSecKeyAction } from '../../../../reduxState/aciton/secretKeyAction';
import Tooltip from '@material-ui/core/Tooltip';
import AppSnackbar from '../../../AppSnackbar';


const GenerateSecretKey = () => {

    // ********** globalStyles **********
    const gbclasses = globalStyles();

    // ********** State **********
    const [restSecKey, setRestSecKey] = useState("");
    const [copySuccess, setCopySuccess] = useState('Copy');


    // ********** Redux State **********
    const dispatch = useDispatch();
    // ********** gen **********
    const genRestaurantSecKey = useSelector((state) => state.genRestaurantSecKey);
    const { success, } = genRestaurantSecKey;
    // ********** get **********
    const getRestaurantSecKey = useSelector((state) => state.getRestaurantSecKey);
    const { restaurantSecretKey, geterror, getsuccess, } = getRestaurantSecKey;

    // ********** handleCopySecretKey **********
    const handleCopySecretKey = (evt) => {
        if (restSecKey) {
            navigator.clipboard.writeText(restSecKey)
            setCopySuccess('Copied!');
        }
    };

    // ********** handleGenRestaurantSecKey **********
    const handleGenRestaurantSecKey = () => {
        dispatch(genRestaurantSecKeyAction());
    };

    // ********** handleGetRestaurantSecKey **********
    const handleGetRestaurantSecKey = () => {
        dispatch(getRestaurantSecKeyAction());
    };

    // ********** useEffect **********
    useEffect(() => {
        handleGetRestaurantSecKey();
    }, [success]);

    useEffect(() => {
        if (getsuccess) {
            setRestSecKey(restaurantSecretKey)
        }
    }, [getsuccess, geterror]);

    useEffect(() => {
        if (getsuccess) {
            if (restaurantSecretKey === undefined) {
                handleGenRestaurantSecKey()
            }
        }
    }, [getsuccess]);

    useEffect(() => {
        setTimeout(() => {
            if (copySuccess) {
                setCopySuccess('Copy');
            }
        }, 1000);
    }, [copySuccess]);

    return (
        <>
            <Box>

                <Card>
                    <CardHeader
                        subheader="For Restaurant"
                        title="Generate Secret Kyes"
                    />
                    <Divider />
                    <CardContent>

                        <Grid item xs={12} sm={12} md={12} lg={6} className={gbclasses.cuspdright}>
                            <Box width="100%">
                                <Grid item container>
                                    <Typography className={gbclasses.inputLable}>
                                        Restaurant
                            </Typography>
                                </Grid>
                                <Box display="flex" alignItems="center">
                                    <Box width="100%">
                                        <TextField
                                            className={gbclasses.inputRoot}
                                            variant='outlined'
                                            placeholder='Restaurant'
                                            name="restaurant"
                                            fullWidth
                                            size='small'
                                            autoComplete='off'
                                            value={restSecKey}
                                            disabled
                                            id="restaurant"
                                        />
                                    </Box>
                                    <Box p={1} flexShrink={1}>
                                        <Tooltip title={copySuccess}>
                                            <IconButton onClick={handleCopySecretKey}>
                                                <FileCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Box p={1} flexShrink={0}>
                                        <Tooltip title="Generate">
                                            <IconButton onClick={handleGenRestaurantSecKey}>
                                                <AutorenewIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                    </CardContent>
                    <Divider />
                </Card>

            </Box>

            {/* ********** Snackbar ********** */}
            <AppSnackbar />

        </>
    );
}
export default GenerateSecretKey;