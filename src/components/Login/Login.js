import React from "react";
import { Stack } from "@mui/system";
import Input from "../UI/Input";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../slices/snackBarSlice";
const Login = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Input label="Email" fullWidth />
          <Input label="Password" password fullWidth />
          <Button
            variant="contained"
            sx={{
              height: "3.6rem",
              backgroundColor: "#233044",
              textTransform: "none",
              fontFamily: "Poppins",
              fontWeight: "bolder",
              ":hover": {
                backgroundColor: "#719cdc",
              },
            }}
            onClick={() => {
              dispatch(
                setSnackBar({
                  severity: "success",
                  message: "This is a Generic SnackBar",
                })
              );
            }}
          >
            Login
          </Button>
        </Stack>
        <a>
          <Typography
            sx={{
              float: { xs: "center", md: "left" },
              fontWeight: "bolder",
              fontFamily: "Poppins",
              cursor: "pointer",
              color: "#233044",
              fontSize: "0.7rem",
              ":hover": {
                color: "#719cdc",
              },
            }}
          >
            Forgot Password ?
          </Typography>
        </a>
      </Stack>
    </div>
  );
};

export default Login;
