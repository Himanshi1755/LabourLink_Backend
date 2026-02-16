import * as yup from "yup";

export const emailRule = yup
  .string()
  .email("Invalid email")
  .required("Email is required");

export const passwordRule = yup
  .string()
  .min(4, "Min 6 characters")
  .required("Password is required");

export const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: emailRule,
  password: passwordRule,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password"),
  contactNo: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Contact number required"),
  location: yup.string().required("Location is required"),
});

export const loginSchema = yup.object({
  email: emailRule,
  password: passwordRule,
});
