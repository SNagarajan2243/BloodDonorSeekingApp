import React from "react";

import Modal from "../../Modal/Modal";

import styles from "./RequestNotification.module.css";

import RequestAttendeeDetail from "../RequestAttendeeDetail/RequestAttendeeDetail";

const RequestNotification = ({
  request,
  changeShowNotification,
  reduceCount,
  id,
  updateRequestDetail
}) => {
  console.log(request);
  const closeNotifications = () => {
    changeShowNotification();
  };

  if(request.count === 0){
    changeShowNotification()
  }

  return (
    <Modal style={{height: '75vh'}}>
      <div className={styles.totalContainer}>
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Request Notifications</h1>
          <button onClick={closeNotifications} className={styles.closebtn}>
            <img
              src="../../../src/assets/close.png"
              alt="Blood donor Logo"
              width="25px"
              height="25px"
            />
          </button>
        </div>
        <hr />
        <div className={styles.content}>
          {request.requestDetail.map((donor) => {
            return (
              <RequestAttendeeDetail
                key={donor.attendeeName}
                attendeeName={donor.attendeeName}
                hospitalAddress={donor.hospitalAddress}
                quantity={donor.quantity}
                requiredDate={donor.requiredDate}
                reduceCount={reduceCount}
                bloodGroup={donor.bloodgroup}
                closeNotifications={closeNotifications}
                id={id}
                updateRequestDetail={updateRequestDetail}
              />
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default RequestNotification;
