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
  const {
    newValues,
    payment,
    handlePaymentChange,
    handleChange,
    handleSubmit,
  } = UpdateLogics({
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
            fontWeight: "500",
            color: "#ef4565",
            marginTop: "1rem",
          }}
        >
          Update Form
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box mt={2}>
            <ThemeProvider theme={theme}>
              <ValidatorForm onSubmit={""}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Candidate name"
                      size="small"
                      type="text"
                      name="candidate_name"
                      required
                      value={newValues.candidate_name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Technology"
                      size="small"
                      type="text"
                      name="technology"
                      required
                      value={newValues.technology}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Mobile"
                      size="small"
                      type="number"
                      name="mobile"
                      required
                      value={newValues.mobile}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Resource"
                      size="small"
                      type="text"
                      name="resource"
                      required
                      value={newValues.resource}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      label="Feedback"
                      size="small"
                      type="text"
                      name="feedback"
                      required
                      value={newValues.feedback}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel color="green">Status</InputLabel>
                      <Select
                        label="Status*"
                        color="green"
                        name="status"
                        required
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

                  {newValues.status === "Confrimed" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                          <InputLabel color="green">Payment Period</InputLabel>
                          <Select
                            label="Payment_Period*"
                            color="green"
                            required
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
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          label="Payable Amount"
                          size="small"
                          type="text"
                          name="payment_amount"
                          required
                          value={payment.payment_amount}
                          onChange={handlePaymentChange}
                          fullWidth
                        />
                      </Grid>
                    </>
                  )}

                  {newValues.status === "Follow Up" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            value={values.start_date}
                            onChange={(date) =>
                              handleDateChange("start_date", date)
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
                      <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Follow Up Date"
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
                      </Grid>
                    </>
                  )}

                  {newValues.status === "Confrimed" && (
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel color="green">Payment Status</InputLabel>
                        <Select
                          label="Payment_Status*"
                          color="green"
                          required
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
                  )}
                </Grid>
                <Stack spacing={2} direction="row" mt="1rem">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Back
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        handleSubmit();
                        setOpen(false);
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
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
