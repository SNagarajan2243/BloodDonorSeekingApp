import React, { useState, useRef } from "react";

import styles from "./SearchDonorContainer.module.css";

import SearchDonorResult from "./SearchDonorResult/SearchDonorResult";

const SearchDonorContainer = () => {
  const bloodgroup = useRef(null);

  const state = useRef("");

  const district = useRef("");

  const city = useRef("");

  const [donordetails, setDonorDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onSearchHandler = async (event) => {
    event.preventDefault();
    console.log(
      bloodgroup.current.value,
      state.current.value,
      district.current.value,
      city.current.value
    );
    const url = `http://localhost:3000/searchdonordetails`;
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodgroup: bloodgroup.current.value,
          state: state.current.value,
          district: district.current.value,
          city: city.current.value,
        }),
      });

      const res = await response.json();
      console.log(res);
      setDonorDetails(res.details);
      // setIsLoading(false)
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };
  // setIsLoading(!isLoading)
  // fetch(url,{
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         bloodgroup: bloodgroup.current.value,
  //         state: state.current.value,
  //         district: district.current.value,
  //         city: city.current.value
  //     })
  // })
  // .then(res=>res.json())
  // .then(res => {
  //     // console.log(res)
  //     // console.log(typeof(res.details))
  //     setDonorDetails(res.details)
  //     setIsLoading(!isLoading)
  //     console.log(isLoading)
  // })
  // .catch(err => {
  //     console.log(err)
  //     alert(err)
  // })
  // }

  return (
    <div className={styles.searchdonorcontainer}>
      <form className={styles.searchdonoroptions} onSubmit={onSearchHandler}>
        <p
          className={styles.searchdonorcontainerheading}
          style={{ width: "100%" }}
        >
          Search Donor Availability
        </p>
        <div className={styles.searchdonorcontainerinput}>
          <div>
            <label
              htmlFor="bloodgroup"
              className={styles.searchdonorcontainerlabel}
            >
              Blood Group:{" "}
            </label>
            <select
              name="bloodgroup"
              id="bloodgroup"
              className={styles.searchdonorcontainerselect}
              ref={bloodgroup}
              required
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className={styles.searchboxinput}>
            <label htmlFor="state" className={styles.searchdonorcontainerlabel}>
              State:{" "}
            </label>
            <input
              type="text"
              name="state"
              id="state"
              className={styles.searchdonorcontainerinputfield}
              ref={state}
              placeholder="Enter State"
              required
            />
          </div>
          <div className={styles.searchboxinput}>
            <label
              htmlFor="District"
              className={styles.searchdonorcontainerlabel}
            >
              District:{" "}
            </label>
            <input
              type="text"
              name="District"
              id="District"
              className={styles.searchdonorcontainerinputfield}
              ref={district}
              placeholder="Enter District"
              required
            />
          </div>
          <div className={styles.searchboxinput}>
            <label htmlFor="City" className={styles.searchdonorcontainerlabel}>
              City:{" "}
            </label>
            <input
              type="text"
              name="City"
              id="City"
              className={styles.searchdonorcontainerinputfield}
              ref={city}
              placeholder="Enter City"
              required
            />
          </div>
        </div>
        <div className={styles.searchdonorcontainerbtn}>
          {!isLoading && (
            <button
              type="submit"
              className={styles.searchdonorcontainerbtnsearch}
            >
              Search
            </button>
          )}
          {isLoading && (
            <button
              type="submit"
              className={styles.searchdonorcontainerbtnsearch}
              disabled
            >
              Loading...
            </button>
          )}
          {/* <button type="submit" className={styles.searchdonorcontainerbtnsearch}>Search</button> */}
        </div>
      </form>
      <SearchDonorResult
        donordetails={donordetails}
        isLoadingStatus={isLoading}
      />
    </div>
  );
};

export default SearchDonorContainer;
