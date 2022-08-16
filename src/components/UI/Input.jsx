import { Box, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import parse from 'html-react-parser'
import { useReducer, useRef, useState } from "react";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numberRegex = /\d/;
const specialCharas = /[`!@#$%^&()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const passwordMesssage =
  "<ul><li>Password must be between 8 to 15 character</li></ul>";
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        message: action.message,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
        message: action.message ? action.message : state.message,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const inputRef = useRef();
  const { onInputChange, id } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    message: null,
    touched: false,
  });
  const lostFocusHandler = () => {
    if (inputState.value.trim().length === 0) {
      dispatch({ type: INPUT_BLUR, message: "Required Field" });
    } else {
      dispatch({ type: INPUT_BLUR });
    }
    onInputChange(id, inputState.value, inputState.isValid);
  };
  const onTextChangeHandler = (e) => {
    let textValue = e.target.value;
    if (props.required && textValue.trim().length === 0) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: "Required Field",
      });
      return;
    }
    if (props.email && !emailRegex.test(textValue.toLowerCase())) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: "Enter Valid Email Id",
      });
      return;
    }
    if (
      props.onlyAlphabets &&
      (numberRegex.test(textValue) || specialCharas.test(textValue))
    ) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: "Please Remove Number or Special Character!",
      });
      return;
    }
    if (props.password && !passwordRegex.test(textValue)) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: parse(passwordMesssage) ,
      });
      return;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: textValue,
      isValid: true,
      message: null,
    });
  };
  return (
    <Box>
      <TextField
        fullWidth={props.fullWidth}
        variant="outlined"
        label={props.label}
        type={props.password ? (showPassword ? "text" : "password") : "text"}
        error={!inputState.isValid && inputState.touched}
        helperText={
          !inputState.isValid && inputState.touched ? inputState.message : ""
        }
        onBlur={lostFocusHandler}
        InputProps={{
          startAdornment: props.children,
          endAdornment: props.password ? (
            <IconButton
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ) : null,
        }}
        ref={inputRef}
        onChange={onTextChangeHandler}
        value={inputState.value}
      />
    </Box>
  );
};

export default Input;
