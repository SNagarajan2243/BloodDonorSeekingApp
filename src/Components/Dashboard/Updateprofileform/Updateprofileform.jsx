import { useState } from "react";
import Modal from "../../Modal/Modal";
import styles from "./Updateprofileform.module.css";
const Updateprofileform = ({
  name,
  age,
  gender,
  bloodgroup,
  email,
  phone,
  district,
  address,
  onClose,
  updateHandler,
  city,
  state,
  id
}) => {
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      city: city,
      state: state,
      id: id,
      name: newName,
      age: newage,
      gender: newgender,
      bloodGroup: newbloodgroup,
      phone: newPhone,
      email: newEmail,
      district: newdistrict,
      address: newaddress,
    };
    updateHandler(data);
  };
  const [newName, setNewName] = useState(name);
  const [newage, setNewage] = useState(age);
  const [newgender, setNewgender] = useState(gender);
  const [newbloodgroup, setNewbloodgroup] = useState(bloodgroup);
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);
  const [newdistrict, setNewdistrict] = useState(district);
  const [newaddress, setNewaddress] = useState(address);
  const nameHandler = (event) => {
    setNewName(event.target.value);
  };
  const ageHandler = (event) => {
    setNewage(event.target.value);
  };
  const genderHandler = (event) => {
    setNewgender(event.target.value);
  };
  const bloodgroupHandler = (event) => {
    setNewbloodgroup(event.target.value);
  };
  const phonenoHandler = (event) => {
    setNewPhone(event.target.value);
  };
  const emailHandler = (event) => {
    setNewEmail(event.target.value);
  };
  const districtHandler = (event) => {
    setNewdistrict(event.target.value);
  };
  const addressHandler = (event) => {
    setNewaddress(event.target.value);
  };
  return (
    <Modal>
      <form>
        <h2>Update Form</h2>
        <label>Name</label>
        <input type="text" name="name" value={newName} onChange={nameHandler} />
        <label>Age</label>
        <input type="text" name="age" value={newage} onChange={ageHandler} />
        <label>Gender</label>
        <input
          type="text"
          name="gender"
          value={newgender}
          onChange={genderHandler}
        />
        <label>Blood Group</label>
        <input
          type="text"
          name="bloodgroup"
          value={newbloodgroup}
          onChange={bloodgroupHandler}
        />
        <label>Phone No</label>
        <input
          type="text"
          name="phone"
          value={newPhone}
          onChange={phonenoHandler}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={newEmail}
          onChange={emailHandler}
        />
        <label>District</label>
        <input
          type="text"
          name="district"
          value={newdistrict}
          onChange={districtHandler}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={newaddress}
          onChange={addressHandler}
        />
        <div style={{ marginTop: "10px" }}>
          <button
            className={styles.Button}
            style={{ marginRight: "10px" }}
            onClick={submitHandler}
          >
            Update
          </button>
          <button onClick={onClose} className={styles.Button}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default Updateprofileform;
