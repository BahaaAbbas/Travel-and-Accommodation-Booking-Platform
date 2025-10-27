import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { checkoutValidationSchema } from "@/validation/CheckoutValidation";

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      email: "",
      phone: "",
      paymentMethod: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      specialRequests: "",
    },
    validationSchema: checkoutValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/confirmation", { state: { confirmInfo: values } });
    },
  });

  return (
    <Box sx={{ p: 4, mx: "auto" }}>
      <Typography variant="h3" gutterBottom fontWeight={600}>
        Secure Checkout
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Guest Information" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="customerName"
                      name="customerName"
                      label="Full Name"
                      value={formik.values.customerName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.customerName &&
                        Boolean(formik.errors.customerName)
                      }
                      helperText={
                        formik.touched.customerName &&
                        formik.errors.customerName
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.phone && Boolean(formik.errors.phone)
                      }
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      id="specialRequests"
                      name="specialRequests"
                      label="Special Requests"
                      multiline
                      rows={4}
                      value={formik.values.specialRequests}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.specialRequests &&
                        Boolean(formik.errors.specialRequests)
                      }
                      helperText={
                        formik.touched.specialRequests &&
                        formik.errors.specialRequests
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Payment Information" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      select
                      fullWidth
                      id="paymentMethod"
                      name="paymentMethod"
                      label="Payment Method"
                      value={formik.values.paymentMethod}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.paymentMethod &&
                        Boolean(formik.errors.paymentMethod)
                      }
                      helperText={
                        formik.touched.paymentMethod &&
                        formik.errors.paymentMethod
                      }
                    >
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                      <MenuItem value="PayPal">PayPal</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    </TextField>
                  </Grid>

                  {formik.values.paymentMethod !== "PayPal" && (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          id="cardName"
                          name="cardName"
                          label="Cardholder Name"
                          value={formik.values.cardName}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.cardName &&
                            Boolean(formik.errors.cardName)
                          }
                          helperText={
                            formik.touched.cardName && formik.errors.cardName
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          id="cardNumber"
                          name="cardNumber"
                          label="Card Number"
                          value={formik.values.cardNumber}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.cardNumber &&
                            Boolean(formik.errors.cardNumber)
                          }
                          helperText={
                            formik.touched.cardNumber &&
                            formik.errors.cardNumber
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField
                          fullWidth
                          id="expiry"
                          name="expiry"
                          label="Expiry Date (MM/YY)"
                          value={formik.values.expiry}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.expiry &&
                            Boolean(formik.errors.expiry)
                          }
                          helperText={
                            formik.touched.expiry && formik.errors.expiry
                          }
                        />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField
                          fullWidth
                          id="cvv"
                          name="cvv"
                          label="CVV"
                          value={formik.values.cvv}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.cvv && Boolean(formik.errors.cvv)
                          }
                          helperText={formik.touched.cvv && formik.errors.cvv}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2, fontWeight: 600 }}
            >
              Confirm Booking
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Checkout;
