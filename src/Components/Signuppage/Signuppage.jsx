import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Signuppage.module.css";
import Modal from "../Modal/Modal";
import Notification from "../Notification/Notification";
import sd from "../../stateanddistrict.json";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
const Signuppage = () => {
  const Navigate = useNavigate();

  const [Gender,setGender] = useState('')

  let gender, tattoo;

  const api_key = "AIzaSyDo9QbzXklaHQi1_UL6A3DN-aUu_MqRdHA";

  const name = useRef("");

  const age = useRef("");

  const bloodGroup = useRef("");

  const address = useRef("");

  const phone = useRef(0);

  const email = useRef("");

  const password = useRef("");

  const confirmPassword = useRef("");

  const bloodcondition = useRef("");

  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState({
    label: "India",
    value: "IN",
  });

  const [selectedState, setSelectedState] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

  const states = State.getStatesOfCountry(selectedCountry.value).map(
    (state) => ({ label: state.name, value: state.isoCode })
  );

  // console.log(selectedState.label);

  // console.log(sd.states.filter((state) => state.state === selectedState.label));

  // console.log(selectedState);

  const [districts, setDistricts] = useState("");

  !selectedState &&
    !states.filter((state) => state.state === selectedState.label).length > 0 &&
    setSelectedDistrict("");

  // console.log(districts);

  // console.log(selectedDistrict);

  const cities = City.getCitiesOfState(
    selectedCountry.value,
    selectedState.value
  ).map((city) => ({ label: city.name, value: city.name, ...city }));

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (value) => {
    // console.log(value);
    setSelectedState(value);
    // console.log(sd.states.filter((state) => state.state === value.label));
    // console.log(
    //   sd.states.filter((state) => state.state === value.label).length
    // );
    // console.log(sd.states.filter((state) => state.state === value.label)[0]);
    value && sd.states.filter((state) => state.state === value.label).length > 0
      ? setDistricts(
          sd.states.filter((state) => state.state === value.label)[0].districts
        )
      : setDistricts([]);
    // console.log(districts);
    if (districts.length === 0) {
      setSelectedDistrict("");
      console.log(districts);
    }
    setSelectedCity("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    // console.log(selectedDistrict);
  };

  const handleCityChange = (value) => setSelectedCity(value);

  let url;

  const onSaveData = () => {
    url =
      "https://blooddonorseekingwebapp-default-rtdb.firebaseio.com/donordetails.json";
      console.log(Gender)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("id"),
        name: name.current.value,
        age: age.current.value,
        gender: Gender,
        bloodGroup: bloodGroup.current.value,
        state: selectedState.label,
        district: selectedDistrict,
        city: selectedCity.label,
        address: address.current.value,
        phone: phone.current.value,
        email: email.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        // setError("Donor Details Added Successfully");
        // setShowModal(true);
        localStorage.removeItem("id");
        // alert("Donor Details Added Successfully");
        Navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
        setShowModal(true);
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (tattoo === "Yes" || bloodcondition.current.value !== "none") {
      //   return alert("Sorry, You are not eligible to donate blood");
      setError("Sorry, You are not eligible to donate blood");
      setShowModal(true);
      return;
    }
    if (password.current.value !== confirmPassword.current.value) {
      //   return alert("Password and Confirm Password should be same");
      setError("Sorry, You are not eligible to donate blood");
      setShowModal(true);
      return;
    }
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        localStorage.setItem("id", data.localId);
        setError("Account Created Successfully");
        setShowModal(true);
        onSaveData();
      })
      .catch((err) => {
        setError(err.message);
        setShowModal(true);
        alert(err.message);
      });
  };

  const onGenderHandler = (e) => {
    gender = e.target.value;
    setGender(gender)
    console.log(Gender)
  };

  const onTattooHandler = (e) => {
    tattoo = e.target.value;
  };

  const onClose = () => {
    setShowModal(false);
    setError("");
  };

  return (
    <div className={styles["signup-container"]}>
      {showModal && <Notification onClose={onClose} content={error} />}
      <form className={styles["form-container"]} onSubmit={onSubmitHandler}>
        <div className={styles.logoContainer}>
          <img
            src="../../src/assets/lifesaver.png"
            alt="blood donor logo"
            className={styles.logo}
          />
        </div>
        <h1 className={styles.heading}>Sign up</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" ref={name} required />
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" ref={age} required />
        <label htmlFor="gender">Gender</label>
        <div style={{ margin: "20px 0 20px" }}>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            onChange={onGenderHandler}
            required
          />
          <label
            htmlFor="male"
            style={{ fontWeight: "lighter", display: "inline" }}
          >
            Male
          </label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            onChange={onGenderHandler}
            required
          />
          <label
            htmlFor="female"
            style={{ fontWeight: "lighter", display: "inline" }}
          >
            Female
          </label>
        </div>
        <label htmlFor="bloodGroup">Blood Group</label>
        <select name="bloodGroup" id="bloodGroup" ref={bloodGroup} required>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <label htmlFor="state">State</label>
        <Select
          className={styles.selectComponent}
          options={states}
          value={selectedState}
          onChange={handleStateChange}
          placeholder="Select State"
          required
        />
        <label htmlFor="district">District</label>
        <select
          name="district"
          id="district"
          className={styles.searchdonorcontainerselect}
          onChange={handleDistrictChange}
          required
        >
          {districts &&
            districts.map((district) => {
              return <option value={district}>{district}</option>;
            })}
          {districts.length === 0 && (
            <option value="noOption">No option</option>
          )}
        </select>
        <label htmlFor="city">City</label>
        <Select
          className={styles.selectComponent}
          options={cities}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select City"
          required
        />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" ref={address} required />
        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" name="phone" ref={phone} required />
        <label htmlFor="email" style={{ display: "inline" }}>
          Email{" "}
        </label>
        (This Email is used for login)
        <input type="email" id="email" name="email" ref={email} required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={password}
          required
        />
        <label htmlFor="reenterpassword">Re-enter Password</label>
        <input
          type="password"
          id="reenterpassword"
          name="reenterpassword"
          ref={confirmPassword}
          required
        />
        <label htmlFor="tattoo">Did you get tattooed in past 6 months?</label>
        <div style={{ margin: "20px 0 20px" }}>
          <input
            type="radio"
            id="yes"
            name="tattoo"
            onChange={onTattooHandler}
            value="Yes"
            required
          />
          <label
            htmlFor="yes"
            style={{ fontWeight: "lighter", display: "inline" }}
          >
            Yes
          </label>
          <input
            type="radio"
            id="no"
            name="tattoo"
            onChange={onTattooHandler}
            value="No"
            required
          />
          <label
            htmlFor="no"
            style={{ fontWeight: "lighter", display: "inline" }}
          >
            No
          </label>
        </div>
        <label for="blood-conditions">
          Have you experienced any of the following conditions within the past
          three months?
          {/* If yes, please select the appropriate condition(s): */}
        </label>
        <select
          name="blood-conditions"
          id="blood-conditions"
          ref={bloodcondition}
        >
          <option value="none">None of the below</option>
          <option value="HIV">HIV/AIDS</option>
          <option value="hepatitis-b-c">Hepatitis B or C</option>
          <option value="syphilis">Syphilis</option>
          <option value="malaria">Malaria</option>
          <option value="cjd">Creutzfeldt-Jakob Disease (CJD)</option>
          <option value="vcjd">Variant Creutzfeldt-Jakob Disease (vCJD)</option>
          <option value="chagas">Chagas disease</option>
          <option value="ebola">Ebola virus disease (EVD)</option>
          <option value="zika">Zika virus infection</option>
        </select>
        <div className={styles["formbtnandlink"]} style={{}}>
          <button type="submit" className={styles.btn}>
            Register as Donor
          </button>
          <Link to="/login" className={styles.infotext}>
            Use an Existing Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signuppage;
