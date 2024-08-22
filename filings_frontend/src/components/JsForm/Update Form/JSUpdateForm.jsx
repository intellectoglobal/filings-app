import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Stack } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import green from "@material-ui/core/colors/green";
import UpdateLogics from "./JSUpdateLogics";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UseForm from "../UseForm";

const JSUpdateForm = ({ open, setOpen, params, page, fetchDetails }) => {
  const { handleDateChange, values } = UseForm();
  const { newValues, payment, handlePaymentChange, handleChange, handleSubmit } =
    UpdateLogics({
      page,
      params,
      fetchDetails,
      closeForm: () => setOpen(false),
    });
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
  const statusnewValues = [
    "Cannot Provide Support",
    "Confrimed",
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
  return (
    <>
      <Dialog scroll={"body"} fullWidth maxWidth={"sm"} open={open}>
        <DialogTitle
          sx={{
            fontFamily: "PT Sans Caption",
            fontSize: "18px",
            // margin: "30px",
            fontWeight: "500",
            position: "relative",
            color: "#ef4565",
            top: "1rem",
          }}
        >
          Update Form
        </DialogTitle>
        <DialogContent
        // sx={{
        //   height: newValues.status === "Confrimed" ? "450px" : "300px",
        // }}
        >
          <DialogContentText></DialogContentText>
          <Box mt={2}>
            <ThemeProvider theme={theme}>
              <ValidatorForm onSubmit={""}>
                <Grid
                  style={{
                    "& .MuiTypographyH6": {
                      fontSize: "12px",
                      lineHeight: "35px",
                      fontWeight: "600",
                    },
                    flexDirection: "column",
                    position: "relative",
                    marginTop: "1rem",
                  }}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  // mt="3"
                >
                  <Grid
                    style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                  >
                    <TextValidator
                      key={1}
                      label="Candidate name"
                      size="small"
                      type="text"
                      name="candidate_name"
                      required={true}
                      value={newValues.candidate_name}
                      onChange={handleChange}
                    />
                    <TextValidator
                      label="Technology"
                      size="small"
                      type="text"
                      name="technology"
                      required={true}
                      value={newValues.technology}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                  >
                    <TextValidator
                      key={1}
                      label="Mobile"
                      size="small"
                      type="number"
                      name="mobile"
                      required={true}
                      value={newValues.mobile}
                      onChange={handleChange}
                    />
                    <TextValidator
                      label="Resource"
                      size="small"
                      type="text"
                      name="resource"
                      required={true}
                      value={newValues.resource}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid
                    style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                  >
                    <TextValidator
                      label="FeedBack"
                      size="small"
                      type="text"
                      name="feedback"
                      required={true}
                      value={newValues.feedback}
                      onChange={handleChange}
                    />
                    <FormControl sx={{ minWidth: "25ch" }} size="small">
                      <InputLabel color="green" id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-label"
                        label="Status*"
                        color="green"
                        name="status"
                        required={true}
                        value={newValues.status}
                        onChange={handleChange}
                      >
                        {statusnewValues.map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {newValues.status === "Confrimed" ? (
                    <Grid
                      style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                    >
                      <FormControl sx={{ minWidth: "25ch" }} size="small">
                        <InputLabel color="green" id="demo-simple-select-label">
                          Payment Peroid
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-label"
                          label="Payment_Period*"
                          color="green"
                          required={true}
                          name="payment_period"
                          value={newValues.payment_period}
                          onChange={handleChange}
                        >
                          {paymentValues.map((val, index) => (
                            <MenuItem key={index} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextValidator
                        label="Payable Amount"
                        size="small"
                        type="text"
                        name="payment_amount"
                        required={true}
                        value={payment.payment_amount}
                        onChange={handlePaymentChange}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {newValues.status === "Follow Up" ? (
                    <Grid
                      style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                    >
                      <FormControl sx={{ minWidth: "25ch" }} size="small">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            orientation="landscape"
                            label="Follow Up Date"
                            openTo="day"
                            format="dd-MM-yyyy"
                            views={["day"]}
                            value={values.followup_date}
                            onChange={(date) =>
                              handleDateChange("followup_date", date)
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
                      </FormControl>
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {newValues.status === "Confrimed" ? (
                    <Grid
                      style={{ display: "flex", gap: "1rem", margin: "1rem" }}
                    >
                      <FormControl sx={{ minWidth: "25ch" }} size="small">
                        <InputLabel color="green" id="demo-simple-select-label">
                          Payment Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-label"
                          label="Payment_Status*"
                          color="green"
                          required={true}
                          name="payment_status"
                          value={payment.payment_status}
                          onChange={handlePaymentChange}
                        >
                          {paymentStatus.map((val, index) => (
                            <MenuItem key={index} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Stack spacing={40} direction="row" mt="1rem">
                  <Button
                    variant="contained"
                    color="secondary"
                    // disabled={activeStep === 0}
                    onClick={() => {
                      {
                        setOpen(false);
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ left: "4rem" }}
                    onClick={() => {
                      {
                        handleSubmit();
                        setOpen(false);
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </ValidatorForm>
            </ThemeProvider>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JSUpdateForm;
