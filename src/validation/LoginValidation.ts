import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Email is required"),

  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});
