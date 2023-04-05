import React, { useState, useRef, useEffect } from "react";

import styles from "./SearchDonorContainer.module.css";

import SearchDonorResult from "./SearchDonorResult/SearchDonorResult";

import sd from "../../../stateanddistrict.json";

import Select from "react-select";

import { Country, State, City } from "country-state-city";

import toast, { Toaster } from "react-hot-toast";

const SearchDonorContainer = () => {
  const bloodgroup = useRef(null);

  // const state = useRef("");

  // const district = useRef("");

  // const city = useRef("");

  const [donordetails, setDonorDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

  console.log(selectedState.label);

  console.log(sd.states.filter((state) => state.state === selectedState.label));

  console.log(selectedState);

  const [districts, setDistricts] = useState("");

  // useEffect(() => {
  //   console.log(sd.states.filter((state) => state.state === selectedState.label))
  //   console.log(sd.states.filter((state) => state.state === selectedState.label).length)
  //   selectedState &&
  //   sd.states.filter((state) => state.state === selectedState.label)
  //     ? setDistricts(
  //         sd.states.filter((state) => state.state === selectedState.label)[0]
  //           .districts
  //       )
  //     : setDistricts([]);
  //   console.log(districts);
  //   console.log(selectedDistrict);
  // }, []);

  !selectedState &&
    !states.filter((state) => state.state === selectedState.label).length > 0 &&
    setSelectedDistrict("");

  console.log(districts);

  console.log(selectedDistrict);

  // const district =
  //   selectedState &&
  //   sd.states
  //     .filter((state) => state.state === selectedState.label)
  //     .map((state) => ({ district: state.districts }));
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
    console.log(value)
    setSelectedState(value);
    console.log(sd.states.filter((state) => state.state === value.label))
    console.log(sd.states.filter((state) => state.state === value.label).length)
    console.log(sd.states.filter((state)=>state.state === value.label)[0])
    value &&
    sd.states.filter((state) => state.state === value.label).length > 0
      ? setDistricts(
          sd.states.filter((state) => state.state === value.label)[0]
            .districts
        )
      : setDistricts([]);
    console.log(districts)
    if(districts.length === 0){
      setSelectedDistrict("")
      console.log(districts)
    }
    setSelectedCity("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    console.log(selectedDistrict);
  };

  const handleCityChange = (value) => setSelectedCity(value);

  const onSearchHandler = async (event) => {
    event.preventDefault();
    console.log(
      bloodgroup.current.value,
      selectedState.label,
      selectedCity.label
    );
    if (
      !bloodgroup.current.value ||
      !selectedState.label ||
      !selectedCity.label
    ) {
      toast.error("Select all the fields");
      return;
    }
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
          District: selectedDistrict,
          // state: state.current.value,
          // district: district.current.value,
          // city: city.current.value,
          state: selectedState.label,
          city: selectedCity.label,
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
      <Toaster toastOptions={{ duration: 4000 }} />
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
            {/* <input
              type="text"
              name="state"
              id="state"
              className={styles.searchdonorcontainerinputfield}
              ref={state}
              placeholder="Enter State"
              required
            /> */}
            <Select
              className={styles.searchdonorcontainerSelect}
              options={states}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Select State"
            />
          </div>
          {/* <div className={styles.searchboxinput}>
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
          </div> */}
          <div className={styles.searchboxinput}>
            <label
              htmlFor="District"
              className={styles.searchdonorcontainerlabel}
            >
              District:{" "}
            </label>
            {/* <input
              type="text"
              name="City"
              id="City"
              className={styles.searchdonorcontainerinputfield}
              ref={city}
              placeholder="Enter City"
              required
            /> */}
            {/* <Select
              className={styles.searchdonorcontainerSelect}
              options={districts}
              value={selectedDistrict}
              onChange={handleCityChange}
              placeholder="Select District"
            /> */}
            <select
              name="district"
              id="district"
              className={styles.searchdonorcontainerselect}
              style={{ width: "15rem" }}
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
          </div>
          <div className={styles.searchboxinput}>
            <label htmlFor="City" className={styles.searchdonorcontainerlabel}>
              City:{" "}
            </label>
            {/* <input
              type="text"
              name="City"
              id="City"
              className={styles.searchdonorcontainerinputfield}
              ref={city}
              placeholder="Enter City"
              required
            /> */}
            <Select
              className={styles.searchdonorcontainerSelect}
              options={cities}
              value={selectedCity}
              onChange={handleCityChange}
              placeholder="Select City"
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
