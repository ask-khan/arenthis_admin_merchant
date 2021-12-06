import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Head from "../../../MetaTags";
import ChangePassword from './ChangePassword';
import GenerateSecretKey from "./GenerateSecretKey";
import { useDispatch, useSelector } from "react-redux";
import { getMerchantInfoAction } from "../../../reduxState/aciton/UserAction";

const General = () => {

  // ********** State **********
  const [hasShop, setHasShop] = useState(false);

  // ********** Redux State **********
  const dispatch = useDispatch();
  const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
  const { merchantInformation, success: merchantInfoSuccess } = getMerchantInfo;

  const createRestaurant = useSelector((state) => state.createRestaurant);
  const { success: createRestauranrSuccess, error, loading } = createRestaurant;

  // ********** useEffect **********
  useEffect(() => {
      dispatch(
          getMerchantInfoAction()
      )
  }, [createRestauranrSuccess]);

  useEffect(() => {
      if (merchantInformation) { 
          const { approved, hasRestaurant, hasMart, RestaurantLifeCycle } = merchantInformation.data.user;
          if (approved && RestaurantLifeCycle === "Approved" && hasRestaurant || hasMart) {
              setHasShop(true);
          } else {
              setHasShop(false);
          }
      }
  }, [createRestauranrSuccess, merchantInfoSuccess]);  

  return (
    <>
      <Box paddingY={3} style={{ backgroundColor: 'background.default', minHeight: '100%' }}>
        <Head parent={"General Settings"} child={"Arenthis Admin Pannel"} />
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
            >
              <ChangePassword />
            </Grid>

            <>
              {hasShop  && <Grid item xs={12}><GenerateSecretKey /></Grid>}
            </>

          </Grid>
        </Container>
      </Box>
    </>
  )
};

export default General;
