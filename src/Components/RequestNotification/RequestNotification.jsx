import React from "react";

import Modal from "../../Modal/Modal";

import styles from "./RequestNotification.module.css";

const RequestNotification = ({ request, changeShowNotification }) => {
  console.log(request);
  const closeNotifications = () => {
    changeShowNotification();
  };
  return (
    <Modal>
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
            return <h1>{donor.attendeeName}</h1>;
          })}
        </div>
      </div>
    </Modal>
  );
};

export default RequestNotification;
