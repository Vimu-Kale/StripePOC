import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../slices/snackBarSlice";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/capital"
      );
      const { error, data, msg } = response.data;
      if (data) {
        console.log(data);
        setCountries(data);
      }
      if (error) {
        dispatch(setSnackBar({ severity: "error", message: msg }));
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      const response = await axios.get(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        {
          country: country,
        }
      );
      console.log(response);
      const { error, data, msg } = response.data;
      if (data) {
        console.log(data);
        setCities(data);
      }
      if (error) {
        dispatch(setSnackBar({ severity: "error", message: msg }));
      }
    };
    getCities();
  }, [country]);

  return (
    <div>
      <Container maxWidth="xs" sx={{ marginTop: "2rem" }}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              <MenuItem value={""} disabled>
                Select Country
              </MenuItem>
              {countries?.map((country, i) => {
                return (
                  <MenuItem value={country.name + i}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <br />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              label="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <MenuItem value={""} disabled>
                Select City
              </MenuItem>
              {cities?.map((city, i) => {
                return <MenuItem value={city + i}>{city}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
