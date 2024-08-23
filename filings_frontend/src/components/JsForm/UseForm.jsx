import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../Context/ContextProvider";
import { fsgetRequests } from "../../Context/actions";

const UseForm = (params) => {
  const [open, setOpen] = useState(false);
  const parameter = params;
  const {
    state: { fsrequests, user_id, isAdmin },
    dispatch,
  } = useValue();

  const ConfrimedData = fsrequests.filter((row) => row.status === "Confrimed");
  const FollowUpStatus = [
    "Demo Completed",
    "Demo Scheduled",
    "Demo Yet to Schedule",
  ];
  const FollowupData = fsrequests.filter((row) => row.status === "Follow Up");
  const [values, setValues] = useState({
    candidate_name: "",
    mobile: "",
    technology: "",
    start_date: new Date(),
    followup_date: new Date(),
    resource: "",
    status: "",
    feedback: "",
    date_of_enquiry: new Date(),
    payment_period: "Task",
    charges: 10,
    created_by: "admin",
    updated_by: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevalues) => ({
      ...prevalues,
      [name]:
        name === "mobile" || name === "user_id" ? parseInt(value, 10) : value,
    }));
  };

  const handleDateChange = (fieldName, date) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: date ? date.toDate() : new Date(), // Handle null case by setting the current date
    }));
  };

  // const FollowupDate = () => {
  //   let currentDate = new Date();
  //   switch (values.payment_period) {
  //     case "Task":
  //       return currentDate;
  //     case "Weekly":
  //       return new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000);
  //     case "BiWeekly":
  //       return new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
  //     case "Monthly":
  //       return new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  //     default:
  //       return currentDate;
  //   }
  // };

  const enqdata = {
    candidate_name: values.candidate_name,
    mobile: values.mobile,
    technology: values.technology,
    // date_of_enquiry: moment(values.date_of_enquiry).format("DD-MM-YYYY"),
    // start_date: moment(values.start_date).format("DD-MM-YYYY"),
    // followup_date: moment(FollowupDate()).format("DD-MM-YYYY"),
    date_of_enquiry: values.date_of_enquiry
      ? moment(values.date_of_enquiry).format("DD-MM-YYYY")
      : "",
    start_date: values.start_date
      ? moment(values.start_date).format("DD-MM-YYYY")
      : "",
    followup_date: values.followup_date
      ? moment(values.followup_date).format("DD-MM-YYYY")
      : "",
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
    payment_period: values.payment_period,
    created_by: values.created_by,
    updated_by: values.updated_by,
    user_id: user_id,
  };
  
console.log("jobsupport data ::", enqdata);

  const postData = () => {
    console.log("jobsuport data ::", enqdata);
    if (Object.values(values).includes("") === false) {
      axios
        .post("http://localhost:8000/api/v1/job-support-data", enqdata, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log("Response from backend:", res.data);
          setOpen(true);
        })
        .catch((error) => {
          console.error("Error:", error.response?.data || error.message);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
    console.log("Data is valid and submitted", enqdata);
    setValues({
      candidate_name: "",
      mobile: "",
      technology: "",
      start_date: "",
      followup_date: "",
      resource: "",
      status: "",
      feedback: "",
      date_of_enquiry: "",
      payment_period: "Task",
      charges: 10,
      created_by: "admin",
      updated_by: "admin",
    });
  };

  const clearFields = () => {
    setValues({
      candidate_name: "",
      mobile: "",
      technology: "",
      start_date: null,
      followup_date: null,
      resource: "",
      status: "",
      feedback: "",
    });
  };

  useEffect(() => {
    fsgetRequests(dispatch, user_id, isAdmin);
  }, []);

  // const handleDelete = async () => {
  //   const { id } = parameter.row;
  //   if (window.confirm("Are you sure to delete this record?")) {
  //     await axios
  //       .delete(`http://localhost:8000/api/v1/job-support-data-delete/${id}`)
  //       .then((res) => console.log("Employee Data Successfully deleted"))

  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     dispatch({ type: "FSDELETE_REQUESTS", payload: id });
  //     fsgetRequests(dispatch);
  //   }
  // };
  const handleDelete = async () => {
    const { id } = parameter.row;
    try {
      await axios
        .delete(`http://localhost:8000/api/v1/job-support-data-delete/${id}`)
        .then((res) => console.log("Employee Data Successfully deleted"))

        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "FSDELETE_REQUESTS", payload: id });
      fsgetRequests(dispatch, isAdmin);
    } catch (error) {
      console.log("Error deleting employee data:", error);
      throw error; // Re-throw error so calling component can handle it
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [cmdopen, setcmdOpen] = useState(false);

  return {
    setcmdOpen,
    cmdopen,
    handleClose,
    handleDateChange,
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleDelete,
    fsrequests,
    clearFields,
    open,
    setOpen,
    ConfrimedData,
    FollowupData,
  };
};

export default UseForm;
