import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Alert,
  IconButton,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useValue } from "../../../Context/ContextProvider";
import { DeleteOutlined } from "@mui/icons-material";

const UserUpdate = ({ open, setOpen, userId, fetchAllUser }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { dispatch } = useValue();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      secondary: {
        main: "#90b4ce",
      },
    },
  });

  const navigate = useNavigate();

  // Define all available apps
  const allApps = ["Filings", "Admin", "Job-Support", "Course-Enquiry", "Job-Support-Admin"];

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/users-data/${id}`);
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setSnackbar({
        open: true,
        message: `Failed to fetch user data: ${err.response?.data?.detail || err.message}`,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "apps") {
      setUser({
        ...user,
        [name]: typeof value === "string" ? value.split(",") : value,
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/users-update/${userId}`, user);
      setSnackbar({
        open: true,
        message: "User updated successfully.",
        severity: "success",
      });
      setOpen(false); // Close the dialog on success
      fetchAllUser(dispatch);
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

  // Compute missing apps
  const missingApps = allApps.filter(app => !user?.apps?.includes(app));

  // Handle removal of an app
  const handleAppRemove = (appToRemove) => {
    setUser({
      ...user,
      apps: user.apps.filter(app => app !== appToRemove),
    });
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
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="active_flag"
                  value={user.active_flag !== undefined ? user.active_flag : ""}
                  onChange={handleChange}
                  label="Admin" // Ensure label is linked to Select
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Admin</InputLabel>
                <Select
                  name="is_admin"
                  value={user.is_admin !== undefined ? user.is_admin : ""}
                  onChange={handleChange}
                  label="Admin"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
  <InputLabel>Apps</InputLabel>
  <Select
    name="apps"
    multiple
    value={user.apps || []}
    onChange={handleChange}
    label="Apps" // Ensure label is linked to Select
    renderValue={(selected) => selected.join(", ")}
  >
    {allApps.map((app) => (
      <MenuItem key={app} value={app}>
        <Checkbox checked={user.apps?.includes(app) || false} />
        <ListItemText primary={app} />
      </MenuItem>
    ))}
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
