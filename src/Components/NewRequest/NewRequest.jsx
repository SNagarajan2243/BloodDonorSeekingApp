import React, { useState } from "react";
import styles from "./NewRequest.module.css";
import { Link } from "react-router-dom";
const NewRequest = () => {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading,setIsLoading] = useState(false)
  const onSubmitHandler = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/sendrequestdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientName: event.target.patientName.value,
        attendeeName: event.target.attendeeName.value,
        attendeeNo: event.target.attendeeNo.value,
        bloodgroup: event.target.bloodgroup.value,
        quantity: event.target.quantity.value,
        requiredDate: event.target.requiredDate.value,
        hospitalAddress: event.target.hospitalAddress.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          alert(data.message);
          event.target.patientName.value = "";
          event.target.attendeeName.value = "";
          event.target.attendeeNo.value = "";
          event.target.bloodgroup.value = "";
          event.target.quantity.value = "";
          event.target.requiredDate.value = "";
          event.target.hospitalAddress.value = "";
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setIsLoading(false)
      })
  };
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
            <input type="text" id="patientName" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="attendeeName">Attendee Name</label>
            <input type="text" id="attendeeName" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="attendeeNo">Attendee No</label>
            <input type="text" id="attendeeNo" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="bloodgroup">Blood Group</label>
            <input type="text" id="bloodgroup" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="quantity">Quantity</label>
            <input type="text" id="quantity" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="requiredDate">Required Date</label>
            <input type="text" id="requiredDate" required />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="hospitalAddress">Hospital Address</label>
            <input type="text" id="hospitalAddress" required />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              // className={isDisabled ? styles.disabled : undefined}
              // disabled={isDisabled ? true : false}
              onClick={() => setIsLoading(true)}
            >
              {isLoading ? 'Loading...' : 'Submit a new request'}
            </button>
            <Link to="/searchdonor">
              <button className={styles.cancelButton}>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequest;
