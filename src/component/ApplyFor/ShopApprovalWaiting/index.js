import { Box, Container, Card, CardContent, Typography, Divider, Grid } from '@material-ui/core';
import { useState } from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Head from "../../../MetaTags";

const ShopApprovalWaiting = ({shopname}) => {

  const initialSteps = [ 'Create Shop', 'Approval'];

  // ********** State ********** //
  const [activeStep, setActiveStep] = useState(1); 

  return (
    <Box
      paddingY={3} style={{backgroundColor: 'background.default', minHeight: '100%',}}>
      <Head parent={"Waiting For Approval"} child={"Arenthis Admin Pannel"} /> 
      <Container maxWidth="xl"> 
        <Card>
          <CardContent>
            <Grid container wrap="wrap">
              <Grid
                item
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: "85vh" }}
                xs={12}
              >
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Congratulations You created the {shopname}
                </Typography>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  Please waiting for the approval
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

export default ShopApprovalWaiting;
