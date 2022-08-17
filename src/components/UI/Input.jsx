import { Box, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useReducer, useRef, useState } from "react";
import {
  passwordLengthMesssage,
  numberRegex,
  emailRegex,
  passwordLowercaseMessage,
  passwordLowercaseRegex,
  passwordNumberMessage,
  passwordNumberRegex,
  passwordSpecialCharacterMessage,
  passwordUppercaseMessage,
  passwordUppercaseRegex,
  specialCharas,
} from "../../constants/regex";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
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
    if (inputState.value.trim().length === 0 && props.required ) {
      dispatch({ type: INPUT_BLUR, message: `${props.label} is Required` });
    } else {
      dispatch({ type: INPUT_BLUR });
    }
    onInputChange(id, inputState.value, inputState.isValid);
  };
  const onTextChangeHandler = (e) => {
    let textValue = e.target.value.trim();
    if (props.required && textValue.trim().length === 0) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: `${props.label} is Required `,
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
    if (
      props.password &&
      props.passwordValidation &&
      !passwordNumberRegex.test(textValue)
    ) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: passwordNumberMessage,
      });
      return;
    }
    if (
      props.password &&
      props.passwordValidation &&
      !passwordLowercaseRegex.test(textValue)
    ) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: passwordLowercaseMessage,
      });
      return;
    }
    if (
      props.password &&
      props.passwordValidation &&
      !passwordUppercaseRegex.test(textValue)
    ) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: passwordUppercaseMessage,
      });
      return;
    }
    if (
      props.password &&
      props.passwordValidation &&
      !specialCharas.test(textValue)
    ) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: passwordSpecialCharacterMessage,
      });
      return;
    }
    if (
      props.password &&
      props.passwordValidation &&
      (textValue.length < 8 || textValue.length > 16)
    ) {
      dispatch({
        type: INPUT_CHANGE,
        value: textValue,
        isValid: false,
        message: passwordLengthMesssage,
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
        sx={props.sx ? props.sx : {}}
        variant="outlined"
        label={props.label}
        type={props.password ? (showPassword ? "text" : "password") : "text"}
        error={!inputState.isValid && inputState.touched}
        helperText={
          !inputState.isValid && inputState.touched ? inputState.message : " "
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
