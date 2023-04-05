import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import OtpInput from "otp-input-react";

import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";

import { auth } from "../firebase.config";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";

import toast, { Toaster } from "react-hot-toast";

import styles from "./Admin.module.css";

import Notification from "../Notification/Notification";

// import {app} from '../firebase'

////////////////////////////// 2nd Method ////////////////////////////

const Admin = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [ph, setPh] = useState("");

  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // onSignInSubmit()
        },
        "expired-callback": () => {},
      },
      auth
    );
    onAuthStateChanged(auth, (user) => {
      if (user && user.providerData[0].providerId === "phone") {
        navigate("/admin/adminDashboardpage");
      }
      // else {
      //     onCaptchVerify();
      //     recaptchaVerifier.render().then((widgetId) => {
      //         window.recaptchaWidgetId = widgetId;
      //     });
      // }
    });
  }, []);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // onSignInSubmit()
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignInSubmit = () => {
    setIsLoading(true);
    onCaptchVerify();
    const phoneNumber = "+" + ph;
    const appVerifier = window.recaptchaVerifier;
    fetch("http://localhost:3000/getPhoneNumber")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.phone);
        if (`91${data.phone}` == ph) {
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              console.log(confirmationResult);
              toast.success("OTP sent successfully");
              setShowOTP(true);
            })
            .catch((error) => {
              console.log(error);
              window.recaptchaVerifier.render().then((widgetId) => {
                grecaptcha.reset(widgetId);
              });
              alert("SignIn Error: " + error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
        else{
            setIsLoading(false)
            toast.error("Invalid Admin Number")
        }
      })
      .catch((err)=>{
        toast.error(err.message)
      })
    // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     console.log(confirmationResult);
    //     toast.success("OTP sent successfully");
    //     setShowOTP(true);
    // })
    // .catch((error) => {
    //     console.log(error);
    //     window.recaptchaVerifier.render().then((widgetId) => {
    //         grecaptcha.reset(widgetId);
    //     });
    //     alert("SignIn Error: " + error);
    // })
    // .finally(() => {
    //     setIsLoading(false);
    // });
  };

  const onOTPVerify = () => {
    setIsLoading(true);
    confirmationResult
      .confirm(otp)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        console.log(user);
        toast.success("OTP Verified Successfully");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("OTPError: " + err.code);
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.totalContainer}>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className={styles.loginContainer}>
        <img
          src="../../src/assets/lifesaver.png"
          alt="blood donor logo"
          className={styles.logo}
        />
        <h1 style={{ color: "#c21c2a" }}>Admin Login</h1>
        <div id="recaptcha-container"></div>
        {!showOTP ? (
          <div className={styles.formContainer}>
            <PhoneInput country={"in"} value={ph} onChange={setPh} />
            <button onClick={onSignInSubmit}>
              {isLoading && <span>Loading...</span>}
              {!isLoading && <span>Send message via SMS</span>}
            </button>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
            />
            <button onClick={onOTPVerify}>
              {isLoading && <span>Loading...</span>}
              {!isLoading && <span>Verify OTP</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Admin;
