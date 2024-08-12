import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert
} from "@mui/material";
import { SaveOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const UserUpdate = ({ open, setOpen, userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      green: {
        main: "#094067",
      },
      secondary: {
        main: "#90b4ce",
      },
      teritiary: {
        main: "#ef4565",
      },
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users/${id}`);
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setSnackbar({
        open: true,
        message: "Failed to fetch user data.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/v1/users/${userId}`, user);
      setSnackbar({
        open: true,
        message: "User updated successfully.",
        severity: "success",
      });
      setSuccess(true);
      setOpen(false); // Close the dialog on success
    } catch (err) {
      console.error("Error updating user data:", err);
      setSnackbar({
        open: true,
        message: "Failed to update user data.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : user ? (
            <Box mt={2}>
              <TextField
                label="Username"
                name="user_name"
                value={user.user_name || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={user.password || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="active_flag"
                  value={user.active_flag || ""}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Admin</InputLabel>
                <Select
                  name="is_admin"
                  value={user.is_admin || ""}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Typography>No user data available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default UserUpdate;
