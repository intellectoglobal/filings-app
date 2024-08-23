import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const JSformActions = ({
  params,
  setEditId,
  editId,
  page,
  baseUrl,
  onDelete, // Add onDelete prop
  fetchDetails,
  handleRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  // Use the hook to get handleDelete
  const { handleDelete } = UseForm(params);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = (params) => {
    const editedRow = params.row;
    setLoading(true);
    axios
      .put(`${baseUrl}/job-support-data-update`, editedRow)
      .then((res) => {
        console.log(res.data);
        console.log("Data successfully updated");
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setSnackbar({
          open: true,
          message: "Failed to update data",
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        setEditId(null);
        fetchDetails();
      });
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
    setLoading(true);
    console.log(params);
    // try {
    await handleDelete(params.row.id); // Call the handleDelete function from UseForm
    setOpenDialog(false);
    handleRefresh();

    // setSnackbar({
    //   open: true,
    //   message: "Record deleted successfully",
    //   severity: "success",
    // });
    // if (onDelete) {
    //   onDelete(params.row.id); // Notify parent to handle data repopulation
    // }
    // navigate("/job-supp-table");
    // } catch (error) {
    //   setSnackbar({
    //     open: true,
    //     message: error.message,
    //     severity: "error",
    //   });
    // } finally {
    //   setLoading(false);
    //   setOpenDialog(false);
    // }
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
              onClick={() => setOpenEditForm(true)}
            >
              <EditOutlined />
            </IconButton>
            <JSUpdateForm
              open={openEditForm}
              setOpen={setOpenEditForm}
              params={params}
              page={page}
              fetchDetails={fetchDetails}
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
                  background: "#ef4565",
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
    </>
  );
};

export default JSformActions;
