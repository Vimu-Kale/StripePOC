/* eslint-disable */
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
export  const passwordLowercaseRegex=/[a-z]/g;
export const passwordUppercaseRegex= /[A-Z]/g;
export const passwordNumberRegex=/\d/;
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const numberRegex = /\d/;
export const specialCharas = /[`!@#$%^&()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const passwordLengthMesssage ="Password must be between 8 to 16 character";

export const passwordSpecialCharacterMessage="Password must contain atleast one special character"

export const passwordNumberMessage="Password must contain atleast one number"

export const passwordUppercaseMessage="Password must contain atleast one uppercase letter"

export const passwordLowercaseMessage="Password must contain atleast one lowercase character"