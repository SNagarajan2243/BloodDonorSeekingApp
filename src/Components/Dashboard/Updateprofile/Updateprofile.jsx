import React, { Fragment, useContext, useState } from "react";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router";

import styles from "./Updateprofile.module.css";

import { AuthContext } from "../../Store/auth-context";

import { auth, signOut } from "../../firebase.config";

import Updateprofileform from "../Updateprofileform/Updateprofileform";
import RequestNotification from "../RequestNotification/RequestNotification";

const Updateprofile = ({ detail, request,reduceCount,updateRequestDetail }) => {
  const store = useContext(AuthContext);

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [showNotification, setShowNotification] = useState(false);

  let updateValue;

  console.log(request);

  const onLogoutHandler = () => {
    store.logoutHandler();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const updateHandler = (datas) => {
    console.log(datas);
    fetch(
      `https://blooddonorseekingwebapp-default-rtdb.firebaseio.com/donordetails.json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateValue = data;
        for (const key in data) {
          console.log(data[key].id + " " + detail.id);
          if (data[key].id === detail.id) {
            updateValue[key] = datas;
            console.log(updateValue);
            fetch(
              `https://blooddonorseekingwebapp-default-rtdb.firebaseio.com/donordetails.json`,
              {
                method: "PUT",
                body: JSON.stringify(updateValue),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then((response) => {
                response.json();
                setIsEditing(false);
                location.reload();
              })
              .catch((err) => {
                console.log(err);
                alert(err.message);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const changeShowNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className={styles.fullDiv}>
      {isEditing && (
        <Updateprofileform
          name={detail.name}
          age={detail.age}
          onClose={() => setIsEditing(false)}
          gender={detail.gender}
          bloodgroup={detail.bloodGroup}
          phone={detail.phone}
          email={detail.email}
          district={detail.district}
          address={detail.address}
          state={detail.state}
          city={detail.city}
          id={detail.id}
          updateHandler={updateHandler}
        />
      )}
      {
        showNotification && (
          <RequestNotification request={request} changeShowNotification={changeShowNotification} reduceCount={reduceCount} id={detail.id} updateRequestDetail={updateRequestDetail}  />
        )
      }
      <nav className={styles.navbar}>
        <img
          src="../../../src/assets/lifesaver.png"
          alt="Blood donor Logo"
          className={styles.logo}
        />
        <div className={styles.navbarrightbtn}>
          {request.count>0 && (
            <button className={styles.Notificationbtn} onClick={()=>setShowNotification(true)}>
              Notification <p className={styles.circleNumber}>{request.count}</p>
            </button>
          )}
          {
            request.count==0 && (
              <button className={styles.Notificationbtn} disabled>
                Notification <p className={styles.circleNumber}>{request.count}</p>
              </button>
            )
          }
          <button className={styles.logoutbtn} onClick={onLogoutHandler}>
            Logout
          </button>
        </div>
      </nav>
      <div>
        <div className={styles.detailContainingContainer}>
          <div className={styles.detailcontainer}>
            <div className={styles.detailheading}>
              <h1>Your Details</h1>
            </div>
            <hr />
            <div className={styles.details}>
              <div className={styles.detail}>
                <p>Name:</p>
                <p>{detail.name}</p>
              </div>
              <div className={styles.detail}>
                <p>Age:</p>
                <p>{detail.age}</p>
              </div>
              <div className={styles.detail}>
                <p>Gender: </p>
                <p>{detail.gender}</p>
              </div>
              <div className={styles.detail}>
                <p>Blood Group: </p>
                <p>{detail.bloodGroup}</p>
              </div>
              <div className={styles.detail}>
                <p>Phone: </p>
                <p>{detail.phone}</p>
              </div>
              <div className={styles.detail}>
                <p>Email: </p>
                <p>{detail.email}</p>
              </div>
              <div className={styles.detail}>
                <p>District: </p>
                <p>{detail.district}</p>
              </div>
              <div className={styles.detail}>
                <p>Address: </p>
                <p>{detail.address}</p>
              </div>
              <div className={styles.detailbtn}>
                <button
                  className={styles.editbtn}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateprofile;
