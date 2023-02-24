
import * as yup from "yup";

export const CreateUserSchema = yup.object({
    name: yup
      .string()
      .required("Required field")
      .min(2, "Must be at least 2 characters")
      .max(100, "Maximun is 100 characters"),
    password: yup
      .string()
      .required("Required field")
      .matches(
        /^(?=.*[0-9])(?=.*[?/!@#$%^&*()\-_=+{};:,<.>])(?=.{9,})/,
        "Password must contain more than 8 characters, one number and one special case character"
      ),
    phone: yup
      .string()
      .required("Required field")
      .matches(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        "Phone number is not valid"
      ),
    email: yup.string().required("Required field").email(),
  });