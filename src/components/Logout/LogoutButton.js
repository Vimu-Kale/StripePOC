import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Power } from "react-feather";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../slices/snackBarSlice";
import axios from "axios";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://35.84.183.132:8000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzNzMxNjUzLCJpYXQiOjE2NjExMzk2NTMsImp0aSI6ImE2ODE5MTBlMTljZjQ2MjFhZjk3ZjdmMjAyODJkMjI4IiwidXNlcl9pZCI6NH0.NL7jmeuMMKSJ8NZbSmWeKoIWldiPZa4xSNsXAN3lnCvHA0tzP3AOqp0AxOluI5-iszxm7EHoJmqqCx2Cvas2Ng`,
          },
        }
      );

      console.log(response);

      dispatch(
        setSnackBar({ severity: "success", message: response.data.message })
      );
    } catch (e) {
      console.log(e);
      dispatch(
        setSnackBar({ severity: "error", message: "problem logging out" })
      );
    }
  };

  return (
    <div>
      <Tooltip title="Logout">
        <IconButton size="large" color="inherit" onClick={handleLogout}>
          <Power />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LogoutButton;
