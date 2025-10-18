import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Logo from "@/assets/Images/Logo.png";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/validation/LoginValidation";
import type { LoginFormValues } from "@/types/formTypes";
import { login } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { useAppDispatch } from "@/features/auth/hooks";
import { logout, setCredentials } from "@/features/auth/authSlice";

const Login = () => {
  const theme = useTheme();
  const { primary, background, text, accent, success } = theme.palette;
  const navigate = useNavigate();
  const { toggleTheme } = useThemeContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success" | "info" | "warning",
  });

  // Formik
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Login values:", values);
        const data = {
          userName: values.username,
          password: values.password,
        };

        const response = await login(data);
        console.log("Login response:", response);

        // localStorage.setItem("token", response.token);
        // localStorage.setItem("userType", response.userType);
        dispatch(setCredentials(response));

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          if (response.userType === "Admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        }, 500);
      } catch (error: any) {
        console.error("Login failed:", error.response?.data || error.message);
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something Went Wrong!",
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
        position: "relative",
      }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: text.primary,
          "&:hover": {
            backgroundColor: `${primary.main}20`,
          },
        }}
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Stack
        spacing={2}
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
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: `linear-gradient(90deg, ${success.main}, ${primary.main})`,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome Back
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
              id="username"
              name="username"
              label="Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
                background: `linear-gradient(90deg, ${primary.main}, ${accent.main})`,
                color: "text.primary",
                "&:hover": {
                  background: `linear-gradient(90deg, ${success.main}, ${primary.main})`,
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
