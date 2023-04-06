import React from "react";

import styles from "./RequestAttendeeDetail.module.css";

const RequestAttendeeDetail = ({
  attendeeName,
  hospitalAddress,
  quantity,
  bloodGroup,
  requiredDate,
  reduceCount,
  closeNotifications,
  id,
}) => {
  const yesHandler = () => {
    reduceCount();

    if (quantity === 0) {
      closeNotifications();
    }
    fetch("http://localhost:3000/removerequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendeeName: attendeeName,
        quantity: quantity,
        bloodGroup: bloodGroup,
        donorId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(bloodGroup)

  return (
    <div className={styles.requestcontainer}>
      <h3>
        Do you want to donate to {attendeeName} at {hospitalAddress} Hospital
        for {quantity} quantity by {requiredDate}
      </h3>
      <div className={styles.requestcontainerbtns}>
        <button className={styles.requestcontainerbtn} onClick={yesHandler}>
          Yes
        </button>
        <button className={styles.requestcontainerbtn}>No</button>
      </div>
    </div>
  );
};

export default RequestAttendeeDetail;
