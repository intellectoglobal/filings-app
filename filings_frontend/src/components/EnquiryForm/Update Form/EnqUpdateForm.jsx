import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Grid,
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import green from "@material-ui/core/colors/green";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useNavigate } from "react-router-dom";
import UpdateLogics from "./EnqUpdateLogics";
import { useValue } from "../../../Context/ContextProvider";
import axios from "axios";


const UpdateForm = ({ open, setOpen, params, page }) => {
  const {
    values,
    payment,
    handlePaymentChange,
    handleChange,
    handleDateChange,
    handleSubmit,
    setValues,
    clearFields,
  } = UpdateLogics({ page, params });

  // useEffect(()=>{
  //   console.log(values)
  // },[])

  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      green: {
        main: "#094067",
      },
      success: {
        main: green[600],
      },
      secondary: {
        main: "#094067",
      },
    },
  });

  const statusvalues = [
    "Cannot Provide Support",
    "Confirmed",
    "Demo Completed",
    "Demo Scheduled",
    "Demo Yet to Schedule",
    "Follow Up",
    "Not Interested",
    "Resource Not Available",
    "Waiting For Response",
  ];
  const paymentValues = ["Task", "Weekly", "BiWeekly", "Monthly"];
  const paymentStatus = ["Not Paid", "Paid", "Pending"];
  const enquiry = ["Email", "Mobile", "Email & Mobile"];
  const domain = ["Working Professional", "Corporate", "Student", "Fresher"];
  const mode = ["Online", "Offline", "Both"];

  const {
    state: { isLogged },
  } = useValue();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    clearFields();
  };

  return isLogged ? (
    <Dialog scroll="body" fullWidth maxWidth="lg" open={open}>
      <DialogTitle
        sx={{
          fontFamily: "PT Sans Caption",
          fontSize: "18px",
          fontWeight: "500",
          color: "#ef4565",
          marginTop: "1rem",
        }}
      >
        Update Form
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "1rem" }}>
          Update your details
        </DialogContentText>
        <ThemeProvider theme={theme}>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            <Box mt={2}>
              <Grid container spacing={2} direction="column">
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <TextValidator
                        label="Name"
                        color="green"
                        type="text"
                        name="name"
                        required={true}
                        value={values.name}
                        onChange={handleChange}
                        validators={["matchRegexp:^[A-Za-z.]*$", "required"]}
                        errorMessages={[
                          "Only alphabets and period are allowed",
                          "This field is required",
                        ]}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        orientation="landscape"
                        label="Follow Up Call Date"
                        openTo="day"
                        format="dd-MM-yyyy"
                        views={["day"]}
                        value={values.followup_call_date}
                        // onChange={(e) => {
                        //   const date = new Date(e);
                        //   setValues({
                        //     ...values,
                        //     followup_call_date: `${date}`,
                        //   });
                        // }}
                        onChange={(date) => handleDateChange(date)}
                        renderInput={(params) => (
                          <FormControl fullWidth size="small">
                            <TextValidator
                              color="green"
                              {...params}
                              helperText={null}
                            />
                          </FormControl>
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Follow Up Status</InputLabel>
                      <Select
                        label="Follow Up Status*"
                        color="green"
                        name="followup_status"
                        required={true}
                        value={values.followup_status}
                        onChange={handleChange}
                      >
                        {statusvalues.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <TextValidator
                        label="Comments"
                        color="green"
                        multiline
                        type="text"
                        name="comments"
                        required={true}
                        value={values.comments}
                        onChange={handleChange}
                        validators={["matchRegexp:^[A-Za-z.]*$", "required"]}
                        errorMessages={[
                          "Only alphabets and period are allowed",
                          "This field is required",
                        ]}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Enquired By</InputLabel>
                      <Select
                        label="Enquired By*"
                        color="green"
                        name="enquiry_by"
                        required={true}
                        value={values.enquiry_by}
                        onChange={handleChange}
                      >
                        {enquiry.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <TextValidator
                        label="Mobile"
                        color="green"
                        type="number"
                        name="mobile"
                        required={true}
                        value={values.mobile}
                        onChange={handleChange}
                        validators={["required", "matchRegexp:^[1-9][0-9]{9}$"]}
                        errorMessages={[
                          "Please enter 10 digit Mobile",
                          "Please enter 10 digit Mobile",
                        ]}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <TextValidator
                        label="Location"
                        color="green"
                        type="text"
                        name="location"
                        required={true}
                        value={values.location}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <TextValidator
                        label="Course"
                        color="green"
                        type="text"
                        name="course"
                        required={true}
                        value={values.course}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <TextValidator
                        label="Fee Structure"
                        color="green"
                        type="text"
                        name="fee_structure"
                        required={true}
                        value={values.fee_structure}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Domain</InputLabel>
                      <Select
                        label="Domain*"
                        color="green"
                        name="domain"
                        required={true}
                        value={values.experience_by}
                        onChange={handleChange}
                      >
                        {domain.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Mode</InputLabel>
                      <Select
                        label="Mode*"
                        color="green"
                        name="mode"
                        required={true}
                        value={values.mode}
                        onChange={handleChange}
                      >
                        {mode.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Payment Period</InputLabel>
                      <Select
                        label="Payment Period*"
                        color="green"
                        name="payment_period"
                        required={true}
                        value={values.payment_period}
                        onChange={handleChange}
                      >
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Weekly">Weekly</MenuItem>
                        <MenuItem value="BiWeekly">BiWeekly</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Payment Status</InputLabel>
                      <Select
                        label="Payment Status*"
                        color="green"
                        name="payment_status"
                        required={true}
                        value={values.payment_status}
                        onChange={handleChange}
                      >
                        {paymentStatus.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      sx={{
                        backgroundColor: "#ef4565", // Match the first form's secondary color
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#d43a5b", // Darker shade for hover effect
                        },
                      }}
                    >
                      Close
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        {
                          handleSubmit();
                          setOpen(false);
                        }
                      }}
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#094067", // Match the first form's primary color
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#072a5b", // Darker shade for hover effect
                        },
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </ValidatorForm>
        </ThemeProvider>
      </DialogContent>
    </Dialog>
  ) : (
    navigate("/login")
  );
};

export default UpdateForm;
