import * as Yup from "yup";

export const loginInitialValues = {
  email: process.env.NODE_ENV === "development" ? "handler1@gmail.com" : "",
  password: process.env.NODE_ENV === "development" ? "123456" : "",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password cannot contain white spaces")
    .min(6, "Password should be minimum of 6 characters"),
});
