import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../slices/snackBarSlice";
import axios from "axios";
import Select from "react-select";
import Input from "../UI/Input";
import { Stack } from "@mui/material";

const customSelectStyle = {
  control: (control) => ({
    ...control,
    height: "3.5rem",
    textAlign: "left",
    fontFamily: `'Inter', sans-serif`,
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: "left",
    fontFamily: `'Inter', sans-serif`,
  }),
};

const Signup = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  // { label: "India", value: "India" }
  const [city, setCity] = useState("");
  // { label: "Pune", value: "Pune" }
  const [isCitiesLoading, setCitiesLoading] = useState(false);
  const [isCountriesLoading, setCountriesLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      setCountriesLoading(true);
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/capital"
        );
        const { data } = response.data;
        let countryList = [];
        data.forEach(function (element) {
          countryList.push({ label: element.name, value: element.name });
        });
        setCountries(countryList);
        setCountriesLoading(false);
      } catch (e) {
        setCountriesLoading(false);
        dispatch(
          setSnackBar({
            severity: "error",
            message: "Error Fetching Countries Data",
          })
        );
      }
    };
    getCountries();
  }, [dispatch]);

  useEffect(() => {
    const getCities = async () => {
      setCitiesLoading(true);

      function isObject(val) {
        return typeof val === "object";
      }
      try {
        const response = await axios.post(
          `https://countriesnow.space/api/v0.1/countries/cities`,
          { country: isObject(country) ? country.value : country }
        );
        const { data } = response.data;
        setCitiesLoading(false);
        let cityList = [];
        data.forEach(function (element) {
          cityList.push({ label: element, value: element });
        });
        setCities(cityList);
      } catch (e) {
        setCitiesLoading(false);
        // dispatch(setSnackBar({ severity: "error", message: e.message }));
      }
    };
    country && getCities();
  }, [country, dispatch]);

  return (
    <div>
      <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
        <Paper
          sx={{
            border: `5px solid #233044`,
            borderRadius: "15px",
            px: "2rem",
            paddingTop: "1rem",
            paddingBottom: "3rem",
          }}
          elevation={24}
        >
          <Stack direction="column" spacing={1}>
            <Typography
              sx={{
                fontFamily: `'Inter', sans-serif`,
                textAlign: "left",
                fontSize: "2rem",
                fontWeight: "600",
                color: "#233044",
              }}
            >
              Sign In
            </Typography>
            <Input label="Name" fullWidth required />
            <Input label="Email" fullWidth required email />
            <Input
              label="Password"
              fullWidth
              required
              password
              passwordValidation
            />
            <Input label="Confirm Password" fullWidth required password />
            <Select
              // cacheOptions
              // defaultOptions
              options={countries}
              isSearchable="true"
              // defaultValue={country}
              value={country}
              onChange={(e) => {
                console.log(e);
                setCity("");
                setCities([]);
                setCountry(e);
              }}
              placeholder="Select Country"
              isLoading={isCountriesLoading}
              styles={customSelectStyle}
            />
            <br />
            <Select
              // cacheOptions
              // defaultOptions
              isSearchable="true"
              isDisabled={cities.length === 0 ? true : false}
              options={cities}
              // defaultValue={city ? city : ""}
              value={city}
              onChange={(e) => {
                console.log(e);
                setCity(e);
              }}
              placeholder="Select City"
              isLoading={isCitiesLoading}
              styles={customSelectStyle}
            />
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
