// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { CircularProgress, Stack, IconButton } from "@mui/material";
// import {
//   DeleteOutlined,
//   CheckOutlined,
//   SaveOutlined,
// } from "@mui/icons-material";
// import { green } from "@mui/material/colors";
// import UseForm from "./UseForm";
// import { useValue } from "../../Context/ContextProvider";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const EnqFormActions = ({ params,setEditId, editId }) => {
//   const { handleDelete } = UseForm(params);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();
//   const {
//     state: { isLogged },
//   } = useValue();
//   const login = () => {
//     navigate("/login");
//   };
//   const handleEdit = (params) => {
//     const editedRow = params.row;
//     setLoading(true);
//     axios
//       .put(`http://localhost:8000/api/v1/course-enquiry-update`, editedRow)
//       .then((res) => {
//         console.log(res.data);
//         console.log("Empdata Successfully updated");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setLoading(false);
//     setEditId(null);
//     setSuccess(true);
//   };

//   useEffect(() => {
//     if (editId === params.id && success) {
//       setSuccess(false);
//     }
//   }, [editId]);

//   const getMuiTheme = () =>
//     createTheme({
//       palette: {
//         primary: {
//           main: "#094067",
//         },
//         green: {
//           main: "#094067",
//         },
//         secondary: {
//           main: "#90b4ce",
//         },
//         teritiary: {
//           main: "#ef4565",
//         },
//       },
//     });
//   return isLogged ? (
//     <>
//       <ThemeProvider theme={getMuiTheme()}>
//         <Box
//           sx={{
//             m: 0.5,
//             position: "relative",
//           }}
//         >
//           <Stack spacing={0} direction="row">
//             {success ? (
//               <IconButton
//                 size="small"
//                 color="primary"
//                 sx={{
//                   boxShadow: 0,
//                   bgcolor: green[500],
//                   "&:hover": { bgcolor: green[700] },
//                 }}
//                 onClick={() => {
//                   setSuccess(false);
//                 }}
//               >
//                 <CheckOutlined />
//               </IconButton>
//             ) : (
//               <IconButton
//                 size="small"
//                 color="primary"
//                 sx={{
//                   width: 40,
//                   height: 40,
//                 }}
//                 disabled={params.id !== editId || loading}
//                 onClick={() => {
//                   handleEdit(params);
//                 }}
//               >
//                 <SaveOutlined />
//               </IconButton>
//             )}
//             {loading && (
//               <CircularProgress
//                 size={40}
//                 sx={{
//                   color: green[500],
//                   position: "absolute",
//                   //   top: -6,
//                   left: -1,
//                   zIndex: 1,
//                 }}
//               />
//             )}
//             <IconButton
//               color="teritiary"
//               sx={{ boxShadow: 0 }}
//               size="small"
//               aria-label="edit"
//               onClick={handleDelete}
//             >
//               <DeleteOutlined />
//             </IconButton>
//           </Stack>
//         </Box>
//       </ThemeProvider>
//     </>
//   ) : (
//     login()
//   );
// };

// export default EnqFormActions;

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

const EnqFormActions = ({ params, setEditId, editId }) => {
  const { handleDelete: useFormDelete } = UseForm(params);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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
      .put(`http://localhost:8000/api/v1/course-enquiry-update`, editedRow)
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
                  "&:hover": { bgcolor: green[700] },
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
              onClick={() => console.log("Edit button clicked")}
            >
              <EditOutlined />
            </IconButton>
            <IconButton
              color="teritiary"
              sx={{ boxShadow: 0 }}
              size="small"
              aria-label="delete"
              onClick={() => setOpenDialog(true)}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        </Box>

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
                  background: "#ef4565", // Keeps the background color the same on hover
                  opacity: 1, // Adjust opacity if needed
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
