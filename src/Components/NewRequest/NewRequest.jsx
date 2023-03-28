import React, { useState } from "react";
import styles from "./NewRequest.module.css";
import { Link } from "react-router-dom";
const NewRequest = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const onSubmitHandler = (event) => {};
  return (
    <div className={styles.totalContainer}>
      <div className={styles.loginContainer}>
        <img
          src="../../src/assets/lifesaver.png"
          alt="blood donor logo"
          className={styles.logo}
        />
        <h1 className={styles.heading}>New Request</h1>
        <form className={styles.formContainer} onSubmit={onSubmitHandler}>
          {/*
            patient name
            attendee name
            attendee no
            quantity
            required date
            hospital address

            critical and emergency option
        */}
          <div className={styles.inputContainer}>
            <label htmlFor="patientName">Patient Name</label>
            <input type="text" id="patientName" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="attendeeName">Attendee Name</label>
            <input type="text" id="attendeeName" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="attendeeNo">Attendee No</label>
            <input type="text" id="attendeeNo" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="quantity">Quantity</label>
            <input type="text" id="quantity" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="requiredDate">Required Date</label>
            <input type="text" id="requiredDate" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="hospitalAddress">Hospital Address</label>
            <input type="text" id="hospitalAddress" />
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/blooddonorDashboardpage">
              <button className={styles.cancelButton}>Cancel</button>
            </Link>
          </div>
          <button
            type="submit"
            className={isDisabled ? styles.disabled : undefined}
            disabled={isDisabled ? true : false}
          >
            Submit a new request
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;
