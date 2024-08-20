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
  Typography,
  Alert,
} from "@mui/material";
import {
  CheckOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useValue } from "../../Context/ContextProvider";
import UserUpdate from "./Update Form/UserUpdate"; // Import the UserUpdate component

export const UsersActions = ({ params, rowId, setRowId, fetchAllUser }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false); // Manage visibility of UserUpdate form
  const [currentUserId, setCurrentUserId] = useState(null); // Store the current user ID

  const {
    state: { isLogged },
    dispatch,
  } = useValue();
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const getMuiTheme = () =>
    createTheme({
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
    console.log("params from the admin ::", params)
  const handleEdit = () => {
    console.log("Params object:", params);
    console.log("Editing User ID:", params.id);
    setCurrentUserId(params.id); // Set the current user ID
    setUpdateDialogOpen(true); // Open the update form dialog
  };

  const handleDelete = async () => {
    const id = params.id; // Extract the ID from the params object
    setOpenDialog(false);
    setLoading(true);

    try {
      const result = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok) throw new Error("Failed to delete the record");

      dispatch({ type: "DELETE_REQUESTS", payload: id });
      setSnackbar({
        open: true,
        message: "Record deleted successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    setLoading(true);
    const data = params.row;

    try {
      const result = await fetch(
        "http://localhost:8000/api/v1/req-data-update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!result.ok) throw new Error("Failed to update the record");

      setSuccess(true);
      setRowId(null);
      setSnackbar({
        open: true,
        message: "Record updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId, success, params.id]);

  return isLogged ? (
    <ThemeProvider theme={getMuiTheme()}>
      <Box sx={{ m: 0.5, position: "relative" }}>
        <Stack spacing={0} direction="row">
          {success ? (
            <IconButton
              size="small"
              sx={{ bgcolor: green[500], "&:hover": { bgcolor: green[700] } }}
            >
              <CheckOutlined />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              color="primary"
              sx={{ width: 40, height: 40 }}
              disabled={params.id !== rowId || loading}
              onClick={handleSubmit}
            >
              <SaveOutlined />
            </IconButton>
          )}
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                color: green[500],
                position: "absolute",
                left: -1,
                zIndex: 1,
              }}
            />
          )}
          <IconButton
            size="small"
            color="secondary"
            sx={{ boxShadow: 0 }}
            onClick={handleEdit} // Open the update form dialog
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: "#ef4565" }}
            onClick={() => setOpenDialog(true)}
          >
            <DeleteOutlined />
          </IconButton>
        </Stack>
      </Box>

      {/* UserUpdate Dialog */}
      {updateDialogOpen && (
        <UserUpdate
          open={updateDialogOpen}
          setOpen={setUpdateDialogOpen}
          userId={currentUserId}
          fetchAllUser={(value) =>fetchAllUser(value)}
        />
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            sx={{
              background: "#ef4565",
              color: "white",
              "&:hover": {
                background: "#ef4565",
              },
            }}
            onClick={handleDelete}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  ) : (
    login()
  );
};
