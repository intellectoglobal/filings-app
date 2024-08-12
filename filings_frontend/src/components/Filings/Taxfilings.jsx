import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Grid, Stack } from "@mui/material";
import { useValue } from "../../Context/ContextProvider";

const inputBox = {
  margin: "0 auto",
  width: "100%",
  "& .MuiTextField-root": {
    m: 1.5,
    backgroundColor: "#fffffe",
    borderRadius: "10px",
    width: "23ch",
  },
  "& .MuiInputBase-input": {
    borderRadius: "10px",
    backgroundColor: "#fffffe",
  },
  "& .MuiAutocomplete-popupIndicator": {
    display: "none !important",
  },
  "&  .MuiFormHelperText-root.Mui-error": {
    background: "#d8eefe",
    margin: 0,
    paddingLeft: 10,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
  },
  justifyContent: "center",
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  flexGrow: 1,
  position: "relative",
  borderRadius: "10px",
};

export const Filings = (props) => {
  const [extractedData, setED] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [fname, setFname] = React.useState("");
  const navigate = useNavigate();

  const {
    state: { isLogged },
  } = useValue();

  const login = () => {
    navigate("/login");
  };

  const submit = async (e) => {
    var data = new FormData();
    data.append("file", e.target.files[0]);
    const resp = await fetch("http://localhost:8000/uploadfile", {
      method: "POST",
      headers: { Accept: "multipart/form-data" },
      body: data,
    });
    const post_resp = await resp.json();
    setED(post_resp);
    setFirst({
      Fname: post_resp.First_name,
      Lname: post_resp.Last_name,
      Hno: post_resp.House_no,
      addres: post_resp.Address,
      pincode: post_resp.Post_code,
      city: post_resp.City,
      country: post_resp.Country,
      favClr: post_resp.Favorite_color,
      drivinglicence: post_resp.Driving_Licence,
    });
    setLoading(true);
  };

  const fileChange = (e) => {
    setFname(e.target.files[0].name);
    if (e.target.files[0]) {
      submit(e);
    }
  };

  function MyApp() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#004643",
        },
        teritiary: {
          main: "#094067",
        },
      },
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
      enqueueSnackbar("File uploaded successfully!", { variant });
    };

    return isLogged ? (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Button
            color="teritiary"
            sx={{
              m: 2,
              width: "100px",
              color: "#FFFFFE",
            }}
            variant="contained"
            component="label"
            endIcon={<FileUploadOutlinedIcon />}
            onChange={handleClickVariant("success")}
          >
            Upload
            <input type="file" hidden onChange={fileChange} />
          </Button>
        </ThemeProvider>
      </React.Fragment>
    ) : (
      login()
    );
  }

  const [first, setFirst] = React.useState({
    Fname: "",
    Lname: "",
    Hno: 0,
    addres: "",
    pincode: "",
    favClr: "",
    drivinglicence: "",
    country: "",
    city: "",
  });

  const handleChange = (event) => {
    event.persist();
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '');
    setFirst({ ...first, Fname: value });
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '');
    setFirst({ ...first, Lname: value });
  };

  const handleCountryChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '');
    setFirst({ ...first, country: value });
  };

  const handleCityChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '');
    setFirst({ ...first, city: value });
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setFirst({ ...first, pincode: value });
  };

  const handleDrivingLicenceChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + value.slice(2).replace(/[^0-9]/g, '');
    }
    if (value.length > 15) {
      value = value.slice(0, 15);
    }
    setFirst({ ...first, drivinglicence: value });
  };

  const handleClear = () => {
    setFirst({
      Fname: "",
      Lname: "",
      Hno: 0,
      addres: "",
      pincode: "",
      favClr: "",
      drivinglicence: "",
      country: "",
      city: "",
    });
    setFname("");
  };

  return (
    <Box border={1} borderColor="#094067" sx={inputBox}>
      <Typography
        variant="h6"
        color={"#ef4565"}
        sx={{
          p: 2,
          fontWeight: "500",
          fontSize: "18px",
          flexGrow: 1,
          fontFamily: "PT Sans Caption",
        }}
        noWrap
        component="h3"
      >
        Tax Filing
      </Typography>
      <Divider />
      <Grid
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          "& .MuiTypographyH6": {
            fontSize: "12px",
            lineHeight: "35px",
            fontWeight: "600",
          },
          flexDirection: "column",
          position: "relative",
        }}
        container
        direction="row"
        justify="center"
        alignItems="inherit"
      >
        <Grid style={{ display: "flex" }}>
          <TextField
            label="First name"
            size="small"
            type="text"
            value={first.Fname || ""}
            onChange={handleFirstNameChange}
          />
          <TextField
            size="small"
            label="Last name"
            type="text"
            value={first.Lname || ""}
            onChange={handleLastNameChange}
          />
        </Grid>
        <Grid style={{ display: "flex" }}>
          <TextField
            label="Address"
            size="small"
            type="text"
            value={first.addres || ""}
            onChange={(e) => {
              setFirst({ ...first, addres: e.target.value });
            }}
          />
          <TextField
            label="Post Code"
            type="text"
            size="small"
            value={first.pincode || ""}
            onChange={handlePincodeChange}
          />
        </Grid>
        <Grid style={{ display: "flex" }}>
          <TextField
            label="Country"
            size="small"
            type="text"
            value={first.country || ""}
            onChange={handleCountryChange}
          />
          <TextField
            label="City"
            type="text"
            size="small"
            value={first.city || ""}
            onChange={handleCityChange}
          />
        </Grid>
        <Grid style={{ display: "flex" }}>
          <TextField
            label="Driving Licence"
            size="small"
            type="text"
            value={first.drivinglicence || ""}
            onChange={handleDrivingLicenceChange}
          />
        </Grid>
      </Grid>
      <div style={{ position: "static", bottom: 0, width: "100%" }}>
        <Divider />
        <Stack spacing={2} direction="row">
          <MyApp />
          <Button
            sx={{ 
              m: 2, 
              width: "100px", 
              height: "38px",
              top: "17px",
              color: "#FFFFFE" 
            }}
            variant="contained"
            color="green"
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{
              m: 2,
              width: "100px",
              height: "38px",
              top: "17px",
              color: "#094067",
            }}
            variant="outlined"
            color="green"
            type="button"
            onClick={handleClear} // Attach the handleClear function here
          >
            Clear
          </Button>
        </Stack>
      </div>
    </Box>
  );
};
