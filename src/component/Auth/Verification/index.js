// Note: VerificationUserEmail component...!

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import OtpInput from 'react-otp-input'
import { makeStyles, useMediaQuery, useTheme, Button } from '@material-ui/core'
import {
  verifyEmailOtpcCode,
  resetPasswordOtpCode,
  resendOTPCode,
} from '../../../reduxState/aciton/authAction'

// Note: Handeling Material UI styling here...!
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  font: {
    fontFamily: 'sans-serif',
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },

  codeText: {
    fontFamily: 'sans-serif',
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },

  code: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },

  customBtn: {
    textTransform: 'capitalize',
    backgroundColor: 'black',
    color: 'white',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'silver',
    width: 250,
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}))

const VerificationUserEmail = () => {
  // Note: Handeling states here...!
  const [otp, setOtp] = useState('')
  const [activeBtn, setActiveBtn] = useState('')
  let [resendCodeLimit, setResendCodeLimit] = useState(0)

  // Note: Handeling redux here...!
  const dispatch = useDispatch()

  // Note: Function to handle OTP Code form...!
  const handleChange = (event) => {
    setOtp(event)
  }

  // Note: To access Materil UI css...!
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  // Note: useEfect Hook...!
  useEffect(() => {
    let getIDFromLS = localStorage.getItem('ID')
    let idInJSON = JSON.parse(getIDFromLS)
    setActiveBtn(idInJSON)
    // console.log(idInJSON);
  }, [])

  // Note: Function to send verification password...!
  const verifymailCodeSent = () => {
    let otpCodeObj = {
      otp,
    }

    if (otpCodeObj.otp.length === 4) {
      dispatch(verifyEmailOtpcCode(otpCodeObj))
      setOtp('')
    } else {
      // console.log('Invalid Otp Code!');
      setOtp('')
    }
  }

  // Note: Functiuon to resend user email verification password...!
  const passowrdResetCodeSent = () => {
    let getEmailFormLS = localStorage.getItem('Email')
    let emailInJSON = JSON.parse(getEmailFormLS)
    // console.log(emailInJSON);

    let otpCodeObj = {
      email: emailInJSON,
      otp,
    }

    if (otpCodeObj.otp.length === 4) {
      dispatch(resetPasswordOtpCode(otpCodeObj))
      setOtp('')
    } else {
      console.log('Invalid Otp Code!')
      setOtp('')
    }
  }

  // Note: Function to resend otp code...!
  const resendCode = () => {
    setResendCodeLimit(resendCodeLimit + 1)
    dispatch(resendOTPCode())
  }

  /***** UI *****/
  return (
    <React.Fragment>
      <div className={classes.root}>
        {/* Header */}
        <h2 className={classes.font}>
          Please enter One-Time Password to verify your account
        </h2>

        {/* Password sent header */}
        <h3 className={classes.font}>
          A One-Time Password has been sent to your Email
        </h3>

        {/* Code header */}
        <h3 className={classes.codeText}> Enter Verification Code </h3>

        {/* OTP Code input field */}
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={4}
          separator={<span>-</span>}
          className={classes.code}
          focusStyle
          inputStyle={{
            width: '2em',
            height: '2em',
            fontSize: 20,
            margin: matches ? null : 5,
            borderTop: 'none',
            borderRight: 'none',
            borderLeft: 'none',
          }}
        />

        {/* Footer buttons */}
        {activeBtn === ' ' ? (
          <Button
            variant="contained"
            disableElevation
            className={classes.customBtn}
            onClick={passowrdResetCodeSent}
            id="resend-password-btn"
          >
            Enter Password Reset Code
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              disableElevation
              className={classes.customBtn}
              onClick={verifymailCodeSent}
            >
              Enter Email Verification Code
            </Button>

            {resendCodeLimit > 2 ? (
              <Button
                disabled
                variant="contained"
                disableElevation
                className={classes.customBtn}
                style={{ marginTop: 20 }}
              >
                Resend Code
              </Button>
            ) : (
              <Button
                variant="contained"
                disableElevation
                className={classes.customBtn}
                style={{ marginTop: 20 }}
                onClick={resendCode}
              >
                Resend Code
              </Button>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default VerificationUserEmail
