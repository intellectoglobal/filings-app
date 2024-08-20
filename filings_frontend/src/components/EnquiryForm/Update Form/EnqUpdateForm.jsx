import React from "react";
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

const UpdateForm = ({ open, setOpen, params, page }) => {
  const {
    values,
    payment,
    handlePaymentChange,
    handleChange,
    handleSubmit,
    setValues,
    clearFields,
  } = UpdateLogics({ page, params });

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
                    <TextValidator
                      label="Name"
                      size="small"
                      color="green"
                      type="text"
                      name="name"
                      required
                      value={values.name}
                      onChange={handleChange}
                      validators={["matchRegexp:^[A-Za-z.]*$", "required"]}
                      errorMessages={[
                        "Only alphabets and period are allowed",
                        "This field is required",
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Follow Up Call Date"
                        format="DD-MM-YYYY"
                        value={values.followup_call_date}
                        onChange={(date) =>
                          setValues({ ...values, followup_call_date: date })
                        }
                        renderInput={(params) => (
                          <TextValidator
                            color="green"
                            size="small"
                            {...params}
                            helperText={null}
                            fullWidth
                          />
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
                        label="Follow Up Status"
                        color="green"
                        name="followup_status"
                        required
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
                    <TextValidator
                      label="Comments"
                      size="small"
                      multiline
                      color="green"
                      type="text"
                      name="comments"
                      required
                      value={values.comments}
                      onChange={handleChange}
                      validators={["matchRegexp:^[A-Za-z.]*$", "required"]}
                      errorMessages={[
                        "Only alphabets and period are allowed",
                        "This field is required",
                      ]}
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Enquired By</InputLabel>
                      <Select
                        label="Enquired By"
                        color="green"
                        name="enquiry_by"
                        required
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
                    <TextValidator
                      label="Mobile"
                      size="small"
                      color="green"
                      type="number"
                      name="mobile"
                      required
                      value={values.mobile}
                      onChange={handleChange}
                      validators={["required", "matchRegexp:^[1-9][0-9]{9}$"]}
                      errorMessages={[
                        "Please enter 10 digit Mobile",
                        "Please enter 10 digit Mobile",
                      ]}
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Location"
                      size="small"
                      color="green"
                      type="text"
                      name="location"
                      required
                      value={values.location}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Course"
                      size="small"
                      color="green"
                      type="text"
                      name="course"
                      required
                      value={values.course}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Fee Structure"
                      size="small"
                      color="green"
                      type="text"
                      name="fee_structure"
                      required
                      value={values.fee_structure}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Domain</InputLabel>
                      <Select
                        label="Domain"
                        color="green"
                        name="domain"
                        required
                        value={values.domain}
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
                        label="Mode"
                        color="green"
                        name="mode"
                        required
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
                    <TextValidator
                      label="Assigned To"
                      size="small"
                      color="green"
                      type="text"
                      name="assigned_to"
                      required
                      value={values.assigned_to}
                      onChange={handleChange}
                      validators={["matchRegexp:^[A-Za-z.]*$", "required"]}
                      errorMessages={[
                        "Only alphabets and period are allowed",
                        "This field is required",
                      ]}
                    />
                  </Grid>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Payment Type</InputLabel>
                      <Select
                        label="Payment Type"
                        color="green"
                        name="payment_type"
                        required
                        value={values.payment_type}
                        onChange={handlePaymentChange}
                      >
                        {paymentValues.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Payment Status</InputLabel>
                      <Select
                        label="Payment Status"
                        color="green"
                        name="payment_status"
                        required
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

                <Grid  container spacing={-2} justifyContent="flex-end" item xs={12} sm={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                      backgroundColor: "#094067", // Match the first form's primary color
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#072a5b", // Darker shade for hover effect
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="error"
                    sx={{
                      backgroundColor: "#094067", // Match the first form's primary color
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#072a5b", // Darker shade for hover effect
                      },
                    }}
                  >
                    Back
                  </Button>
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