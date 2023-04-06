import React from "react";

import styles from "./RequestAttendeeDetail.module.css";

const RequestAttendeeDetail = ({
  attendeeName,
  hospitalAddress,
  quantity,
  requiredDate,
  reduceCount,
  closeNotifications
}) => {

    const noHandler = () => {
        reduceCount()
        closeNotifications()
    }

  return (
    <div className={styles.requestcontainer}>
      <h3>
        Do you want to donate to {attendeeName} at {hospitalAddress} Hospital for{" "}
        {quantity} quantity by {requiredDate}
      </h3>
      <div className={styles.requestcontainerbtns}>
        <button className={styles.requestcontainerbtn}>Yes</button>
        <button className={styles.requestcontainerbtn} onClick={noHandler}>No</button>
      </div>
    </div>
  );
};

export default RequestAttendeeDetail;
