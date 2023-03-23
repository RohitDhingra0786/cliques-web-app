import * as Yup from "yup";

export const loginInitialValues = () => {
  return {
    email: "",
    password: "",
  };
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password cannot contain white spaces")
    .min(6, "Password should be minimum of 6 characters"),
});
