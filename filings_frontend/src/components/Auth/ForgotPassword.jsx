import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useValue } from "../../Context/ContextProvider";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { loginData } from "../../Redux/loginSlice";
import baseURL from "../../api/baseURL";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    backgroundColor: "red",
  },
  root: {
    padding: 0,
    backgroundColor: "red",
  },
});

export default function Forgot() {
  const [error, setError] = useState("");
  const location = useLocation();
  const post_resp = location.state?.post_resp;
  const { dispatch } = useValue();
  const dispatches = useDispatch();
  const [values, setValues] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        email: values.email,
        new_password: values.newPassword,
      };

      console.log("Sending payload:", JSON.stringify(payload));

      const response = await fetch(`${baseURL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is okay
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        setError(
          errorData.error || "An error occurred while setting the password."
        );
        return;
      }

      const data = await response.json();
      console.log("Response came from the:", data.data);

      // Simulating post_resp from the data (since post_resp is not set in your code)
      const post_resp = data.data;

      if (data.msg === "Password updated successfully") {
        localStorage.setItem("is_set_password", "true");
        dispatch({ type: "LOGGED_IN", payload: true });
        dispatch({ type: "IS_ADMIN", payload: post_resp.is_admin });
        dispatch({ type: "APPS_ACCESS", payload: post_resp.apps });
        dispatch({ type: "CURRENT_USER", payload: post_resp.user_name });
        dispatch({ type: "USER_ID", payload: post_resp.user_id });

        dispatches(
          loginData({
            currentUser: post_resp.user_name,
            apps: post_resp.apps,
            isLoggedIn: true,
          })
        );

        localStorage.setItem("isLogged", "true");
        localStorage.setItem("currentUser", post_resp.user_name);
        localStorage.setItem("email", values.email);
        localStorage.setItem("apps", JSON.stringify(post_resp.apps));

        navigate("/job-supp-table");
      } else {
        setError("An error occurred while setting the password.");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message); // Log error message
      setError("An unexpected error occurred.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-7vw",
          zIndex: 2,
        }}
      >
        <img
          style={{
            width: "15rem",
            top: 0,
            margin: 0,
            padding: 0,
            left: 0,
            zIndex: 2,
          }}
          src={logo}
        />
        <Paper
          sx={{
            borderRadius: "12px",
            width: "40vw",
            margin: "auto",
            marginTop: "-5vw",
            position: "relative",
          }}
          elevation={3}
        >
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "4vw",
                paddingTop: "2vw",
                borderRadius: "20px",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontSize: "2.5vw",
                  marginTop: "1vw",
                }}
              >
                Forgot password
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <Grid
                  container
                  spacing={2}
                  sx={{
                    marginTop: "3vw",
                    "& .MuiGrid-item": { paddingTop: "0px" },
                  }}
                >
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      variant="filled"
                      value={values.email}
                      onChange={handleChange}
                      sx={{
                        border: "2px solid ",
                        borderColor: error ? "red" : "#d8eefe",
                        borderRadius: "10px 10px 0px 0px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="newPassword"
                      label="New Password"
                      type="password"
                      variant="filled"
                      value={values.newPassword}
                      onChange={handleChange}
                      sx={{
                        border: "2px solid ",
                        borderColor: error ? "red" : "#d8eefe",
                        borderRadius: "10px 10px 0px 0px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="filled"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      sx={{
                        border: "2px solid ",
                        borderColor: error ? "red" : "#d8eefe",
                        borderRadius: "0px 0px 10px 10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: ".5rem" }}>
                    <span
                      style={{
                        color: "red",
                        fontSize: "1rem",
                        position: "relative",
                        textDecoration: "none",
                      }}
                    >
                      {error}
                    </span>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 10,
                      mb: 2,
                      border: "1px",
                      borderRadius: "2vw",
                      width: "13vw",
                      height: "3vw",
                      marginTop: "4vw",
                      fontSize: "6rm",
                      backgroundColor: "#3da9fc",
                    }}
                  >
                    Forgot Password
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
