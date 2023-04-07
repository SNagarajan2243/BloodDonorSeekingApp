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
  updateRequestDetail
}) => {
  const yesHandler = () => {
    reduceCount();
    updateRequestDetail(attendeeName, quantity, bloodGroup);
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

  const noHandler = () => {
    reduceCount()
    updateRequestDetail(attendeeName, quantity, bloodGroup,id);
    fetch("http://localhost:3000/removerequestfromdonor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendeeName: attendeeName,
        quantity: quantity,
        bloodGroup: bloodGroup,
        id: id,
      })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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
        <button className={styles.requestcontainerbtn} onClick={noHandler}>No</button>
      </div>
    </div>
  );
};

export default RequestAttendeeDetail;
