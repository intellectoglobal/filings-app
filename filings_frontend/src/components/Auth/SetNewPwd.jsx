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
import { useLocation } from 'react-router-dom';

const theme = createTheme({
  palette: {
    backgroundColor: "red",
  },
  root: {
    padding: 0,
    backgroundColor: "red",
  },
});

export default function SetNewPwd() {
  const [error, setError] = useState("");
  const location = useLocation();
  const post_resp = location.state?.post_resp;
  const { dispatch } = useValue();
  const dispatches = useDispatch();
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // Retrieve currentUser from localStorage on component mount
    const user = localStorage.getItem("email");
    console.log(user);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the passwords match
    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        email: localStorage.getItem("email"),
        new_password: values.newPassword,
      };

      console.log("Sending payload:", JSON.stringify(payload)); // Debugging step

      // Send request to backend to update password
      const response = await fetch(`${baseURL}/api/set-new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // If password update was successful
        localStorage.setItem("is_set_password", "true");
        console.log("diauhsufydsgcfg")  // Update local storage if needed


        
      dispatch({ type: "LOGGED_IN", payload: true });
      dispatch({ type: "IS_ADMIN", payload: post_resp.is_admin });
      dispatch({ type: "APPS_ACCESS", payload: post_resp.apps });
      dispatch({ type: "CURRENT_USER", payload: post_resp.user_name });

      // Update Redux state
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


        navigate("/job-supp-table");  // Redirect to the job-supp-table page
      } else {
        // Handle errors from the server
        setError(data.error || "An error occurred while setting the password.");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
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
                Set New Password
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
                    Set Password
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