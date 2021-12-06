import { Box, Container, Card, CardContent, Typography, Divider, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Head from "../../MetaTags";
import { useDispatch, useSelector } from 'react-redux';
import { getMerchantInfoAction } from '../../reduxState/aciton/UserAction';
import { useNavigate } from 'react-router';

const ApprovalWaiting = ({shopname}) => {

  const initialSteps = ['Merchant register', 'Pending approval from admin', 'Create shop'];

  // ********** State ********** //
  const [activeStep, setActiveStep] = useState(1); 

  // ********** Redux State **********
  const dispatch = useDispatch();
  const getMerchantInfo = useSelector((state) => state.getMerchantInfo);
  const {  merchantInformation, success:merchantSuccess } = getMerchantInfo;

  // ********** Navigation **********
  let navigate = useNavigate();

  // ********** useEffect **********
  useEffect(() => {
      dispatch(
          getMerchantInfoAction()
      )
  }, []); 

  useEffect(() => {
    if(merchantSuccess){
      console.log("merchantInformation",merchantInformation)
      const { approved } = merchantInformation.data.user;
      if(approved){
        window.location.href = "/admin"
      }
    }
  },[merchantSuccess]);

  return (
    <Box
      paddingY={2} style={{backgroundColor: 'background.default', minHeight: '100%',}}>
      <Head parent={"Waiting For Approval"} child={"Arenthis Admin Pannel"} /> 
      <Container maxWidth="xl"> 
        <Card>
          <CardContent>
            <Grid container wrap="wrap">
              <Grid
                item
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "93vh" }}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Congratulations you are now a part of Arenthis Family
                </Typography>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Your account is two step away from completion
                </Typography>

                <Box>
                  <Stepper activeStep={activeStep} orientation='vertical'>
                    {initialSteps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>

              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </Container>
    </Box>
  );
}

export default ApprovalWaiting;
