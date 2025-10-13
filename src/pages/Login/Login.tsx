import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
  Snackbar,
} from "@mui/material";
import Logo from "@/assets/Images/Logo.png";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/validation/LoginValidation";
import type { LoginFormValues } from "@/types/formTypes";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const theme = useTheme();
  const { primary, secondary, background, text } = theme.palette;
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success" | "info" | "warning",
  });

  // Formik
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Login values:", values);
        const data = {
          userName: values.email,
          password: values.password,
        };

        const response = await login(data);

        localStorage.setItem("token", response.token);
        localStorage.setItem("userType", response.userType);

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          if (response.userType === "Admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        }, 5000);
      } catch (error: any) {
        console.error("Login failed:", error.response?.data || error.message);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Invalid credentials",
          severity: "error",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          bgcolor: background.paper,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            width: 120,
            height: 120,
            mx: "auto !important",
          }}
        />

        {/* Heading */}
        <Typography variant="h4" fontWeight="bold">
          <Box component="span" sx={{ color: primary.main }}>
            Welcome
          </Box>{" "}
          <Box component="span" sx={{ color: secondary.main }}>
            Back
          </Box>
        </Typography>
        <Typography color={text.secondary}>
          Sign in to your TravelBook account
        </Typography>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="you@gmail.com"
              id="name"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              variant="contained"
              fullWidth
              startIcon={<LoginIcon />}
              type="submit"
              sx={{
                mt: 1,
                py: 1.5,
                fontWeight: "bold",
                textTransform: "none",
                background: `linear-gradient(90deg, ${primary.main}, ${secondary.main})`,
                color: "text.primary",
                "&:hover": {
                  background: `linear-gradient(90deg, ${secondary.main}, ${primary.main})`,
                },
              }}
            >
              {formik.isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </Stack>
        </form>
      </Stack>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          // sx={{ width: "100%" }}
          sx={{
            width: "100%",
            fontWeight: "bold",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            color: "text.primary",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
