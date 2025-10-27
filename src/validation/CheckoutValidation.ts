import * as Yup from "yup";

export const checkoutValidationSchema = Yup.object({
  customerName: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number"),
  paymentMethod: Yup.string().required("Payment method is required"),
  cardName: Yup.string().when("paymentMethod", {
    is: (val: string) => val && val !== "PayPal",
    then: (schema) => schema.required("Cardholder name is required"),
  }),
  cardNumber: Yup.string().when("paymentMethod", {
    is: (val: string) => val && val !== "PayPal",
    then: (schema) =>
      schema
        .required("Card number is required")
        .matches(/^[0-9\s]{13,19}$/, "Invalid card number"),
  }),
  expiry: Yup.string().when("paymentMethod", {
    is: (val: string) => val && val !== "PayPal",
    then: (schema) =>
      schema
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry (MM/YY)"),
  }),
  cvv: Yup.string().when("paymentMethod", {
    is: (val: string) => val && val !== "PayPal",
    then: (schema) =>
      schema.required("CVV is required").matches(/^[0-9]{3,4}$/, "Invalid CVV"),
  }),
  specialRequests: Yup.string().max(300, "Too long Message"),
});
