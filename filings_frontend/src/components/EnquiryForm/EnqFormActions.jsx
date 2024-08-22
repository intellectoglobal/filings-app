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
  Button,
} from "@mui/material";
import {
  DeleteOutlined,
  CheckOutlined,
  SaveOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import UseForm from "./UseForm";
import { useValue } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./Update Form/EnqUpdateForm"; // Import the update form
import UpdateForm from "./Update Form/EnqUpdateForm"; // Import the update form

const EnqFormActions = ({ params, setEditId, editId, page }) => {
const EnqFormActions = ({ params, setEditId, editId, page }) => {
  const { handleDelete: useFormDelete } = UseForm(params);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // State for managing the edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false); // State for managing the edit dialog
  const navigate = useNavigate();
  const {
    state: { isLogged },
  } = useValue();

  const login = () => {
    navigate("/login");
  };

  const handleEdit = (params) => {
    const editedRow = params.row;
    setLoading(true);
    axios
      .put("http://localhost:8000/api/v1/course-enquiry-update", editedRow)
      .put("http://localhost:8000/api/v1/course-enquiry-update", editedRow)
      .then((res) => {
        console.log(res.data);
        console.log("Empdata Successfully updated");
        setSuccess(true);
        setEditId(null);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickOpenEditDialog = () => {
    setOpenEditDialog(true); // Open the edit dialog
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); // Close the edit dialog
  };

  const handleClickOpenEditDialog = () => {
    setOpenEditDialog(true); // Open the edit dialog
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false); // Close the edit dialog
  };

  const handleDelete = async () => {
    await useFormDelete(params.id);
    setOpenDialog(false);
  };

  useEffect(() => {
    if (editId === params.id && success) {
      setSuccess(false);
    }
  }, [editId, success, params.id]);

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

  return isLogged ? (
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
                  bgcolor: green[500],
                  "&:hover": { bgcolor: green[300] },
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
                onClick={() => {
                  handleEdit(params);
                }}
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
              onClick={handleClickOpenEditDialog} // Trigger the edit dialog
              onClick={handleClickOpenEditDialog} // Trigger the edit dialog
            >
              <EditOutlined />
            </IconButton>


            <IconButton
              color="teritiary"
              sx={{ boxShadow: 0 }}
              size="small"
              aria-label="delete"
              onClick={handleDeleteDialogOpen}
              onClick={handleDeleteDialogOpen}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        </Box>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Edit Record</DialogTitle>
          <DialogContent>
            <UpdateForm
              open={openEditDialog}
              setOpen={setOpenEditDialog}
              params={params}
              page={page}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Edit Record</DialogTitle>
          <DialogContent>
            <UpdateForm
              open={openEditDialog}
              setOpen={setOpenEditDialog}
              params={params}
              page={page}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
          <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "black" }}>
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              sx={{
                background: "#ef4565",
                color: "white",
                "&:hover": {
                  background: "#ef4565",
                  background: "#ef4565",
                },
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  ) : (
    login()
  );
};

export default EnqFormActions;
