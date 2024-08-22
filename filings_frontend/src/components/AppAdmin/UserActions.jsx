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
import UserUpdate from "./Update Form/UserUpdate";

export const UsersActions = ({ params, rowId, setRowId, fetchAllUser }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

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
        secondary: {
          main: "#90b4ce",
        },
        teritiary: {
          main: "#ef4565",
        },
      },
    });

  const fetchUserList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users-data-all");
      if (response.status === 200) {
        const users = response.data;
        dispatch({ type: "UPDATE_USERS", payload: users });
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

    console.log("params from the admin ::", params)
  const handleEdit = () => {
    setCurrentUserId(params.id);
    setUpdateDialogOpen(true);
  };

  const handleDelete = async () => {
    const id = params.id;
    setOpenDialog(false);
    setLoading(true);

    try {
      const result = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok) throw new Error("Failed to delete the record");

      setSnackbar({
        open: true,
        message: "Record deleted successfully",
        severity: "success",
      });

      await fetchUserList();
      navigate("/admin");
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${rowId}`,
        {
          name: params.name,
          email: params.email,
          isAdmin: params.isAdmin,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setSnackbar({
          open: true,
          message: "User updated successfully",
          severity: "success",
        });
        await fetchUserList();
        navigate("/admin");
        
      } else {
        throw new Error("Failed to update the user");
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

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
              onClick={handleSubmit} // Use the handleSubmit function
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
            onClick={handleEdit}
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

      <UserUpdate
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        userId={currentUserId}
      />
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
