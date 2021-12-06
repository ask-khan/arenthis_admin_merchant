// Note: InitialDashboardScreen component...!

import React from "react";
import { makeStyles } from "@material-ui/core";
import Head from "../../../MetaTags";

// Note: Material UI css here...
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "yellow",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  actionsContainer: {
    marginBottom: theme.spacing(2),
  },

  resetContainer: {
    padding: theme.spacing(3),
    backgroundColor: "whitesmoke",
  },
}));

function getSteps() {
  return ["Merchant Register", "Approval", "Create Shop"];
}

const InitialDashboardScreen = () => {
  // Note: To access Material UI css...!
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Head parent={"Congratulations"} child={"Arenthis Admin Pannel"} />
      <div style={{ textAlign: "center", width: "50%" }}>
        <h1 style={{ fontFamily: "poppins" }}> Congratulation! </h1>
        <h2 style={{ fontFamily: "poppins", paddingTop: 10 }}>
          {" "}
          You re now a part of aren'this family{" "}
        </h2>
        <h2 style={{ fontFamily: "poppins", paddingTop: 10 }}>
          {" "}
          Your account is one step away from compeletion
        </h2>
      </div>
    </div>
  );
};

export default InitialDashboardScreen;
