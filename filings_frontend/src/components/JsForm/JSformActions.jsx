import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CircularProgress,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import {
  DeleteOutlined,
  CheckOutlined,
  SaveOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import axios from "axios";
import UseForm from "./UseForm";
import JSUpdateForm from "./Update Form/JSUpdateForm";

const JSformActions = ({ params, setEditId, editId, page }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { handleDelete } = UseForm(params);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = (params) => {
    const editedRow = params.row;
    setLoading(true);
    axios
      .put("http://localhost:8000/api/v1/job-support-data-update", editedRow)
      .then((res) => {
        console.log(res.data);
        console.log("Empdata Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    setEditId(null);
    setSuccess(true);
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

  const handleDeleteDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteConfirmed = async () => {
    handleDelete();
    setOpenDialog(false);
    //setLoading(true);
    try {
      const result = await fetch(
        "http://localhost:8000/api/v1/req-data-delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params.row),
        }
      );

     // if (!result.ok) throw new Error("Failed to delete the record");

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

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <Box
          sx={{
            m: 0.5,
            position: "relative",
          }}
        >
          <Stack spacing={0} direction="row">
            {success ? (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  boxShadow: 0,
                  bgcolor: green[200],
                  height: "2.2vw",
                  marginTop: "5px",
                  "&:hover": { bgcolor: green[300] },
                }}
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CheckOutlined />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  width: 40,
                  height: 40,
                }}
                disabled={params.id !== editId || loading}
                onClick={() => handleEdit(params)}
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
              color="secondary"
              sx={{ boxShadow: 0 }}
              aria-label="edit"
              onClick={handleClickOpen}
            >
              <EditOutlined />
            </IconButton>
            <JSUpdateForm
              open={open}
              setOpen={setOpen}
              params={params}
              page={page}
            />
            <IconButton
              color="teritiary"
              sx={{ boxShadow: 0 }}
              size="small"
              aria-label="delete"
              onClick={handleDeleteDialogOpen}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "black" }}>
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              sx={{
                background: "#ef4565",
                color: "white",
                "&:hover": {
                  background: "#ef4565", // Keeps the background color the same on hover
                  opacity: 1, // Adjust opacity if needed
                },
              }}
              onClick={handleDeleteConfirmed}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        {/* <Snackbar
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
        </Snackbar> */}
      </ThemeProvider>
    </>
  );
};

export default JSformActions;
