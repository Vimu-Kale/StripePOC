import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  severity: null,
  message: null,
};

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    resetSnackBar: (state) => initialState,
    setSnackBar: (state, action) => {
      return {
        ...state,
        severity: action.payload.severity,
        message: action.payload.message,
        open: true,
      };
    },
  },
});

export const { resetSnackBar, setSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
