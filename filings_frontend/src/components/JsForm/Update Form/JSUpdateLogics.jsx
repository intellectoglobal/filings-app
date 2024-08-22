import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../../Context/ContextProvider";
import { fsgetRequests } from "../../../Context/actions";

const UpdateLogics = ({ params, page, fetchDetails }) => {
  const [values, setValues] = useState(params.row);
  const paymentsLength = params.row.payment.length;
  const [paymentsData, setPaymentsData] = useState(() => {
    if (paymentsLength !== 0) {
      return params.row.payment.map((list) => {
        return {
          id: list.id,
          job_support_id: list.job_support_id,
          candidate_payment_amount: list.candidate_payment_amount,
          candidate_payment_status: list.candidate_payment_status,
          candidate_payment_date: list.candidate_payment_date,
          resource_payment_amount: list.resource_payment_amount,
          resource_payment_status: list.resource_payment_status,
          resource_payment_date: list.resource_payment_date,
        };
      });
    } else {
      return [
        {
          id: 0,
          job_support_id: 0,
          candidate_payment_amount: 0,
          candidate_payment_status: "",
          candidate_payment_date: new Date(),
          resource_payment_amount: 0,
          resource_payment_status: "",
          resource_payment_date: new Date(),
        },
      ];
    }
  });

  const [payment, setPayment] = useState(() => {
    if (paymentsLength !== 0) {
      return {
        payment_amount:
          page === "Resource"
            ? paymentsData[0].resource_payment_amount
            : paymentsData[0].candidate_payment_amount,
        payment_date: new Date(),
        payment_status:
          page === "Resource"
            ? paymentsData[0].resource_payment_status
            : paymentsData[0].candidate_payment_status,
      };
    } else {
      return {
        payment_amount: 0,
        payment_date: new Date(),
        payment_status: "",
      };
    }
  });
  const { dispatch } = useValue();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  const FollowupDate = () => {
    if (values.payment_period === "Task") {
      return new Date();
    } else if (values.payment_period === "Weekly") {
      let currentDate = new Date();
      let Weekly = new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      return Weekly;
    } else if (values.payment_period === "BiWeekly") {
      let currentDate = new Date();
      let biWeekly = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
      return biWeekly;
    } else if (values.payment_period === "Monthly") {
      let currentDate = new Date();
      let Monthly = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      return Monthly;
    }
  };

  const PaymentValues = () => {
    if (page === "Main" || "Confrimed") {
      return {
        job_support_id: params.id,
        candidate_payment_amount: payment.payment_amount,
        candidate_payment_status: payment.payment_status,
        candidate_payment_date: moment(payment.payment_date).format(
          "DD-MM-YYYY"
        ),
      };
    } else if (page === "Resource") {
      return {
        job_support_id: params.id,
        resource_payment_amount: payment.payment_amount,
        resource_payment_status: payment.payment_status,
        resource_payment_date: moment(payment.payment_date).format(
          "DD-MM-YYYY"
        ),
      };
    }
  };

  const paymentData = PaymentValues();
  const paymentUpdateData = {
    id: paymentsData[0].id,
    job_support_id: paymentsData[0].job_support_id,
    candidate_payment_amount:
      (page === "Confrimed" || "Main") && page !== "Resource"
        ? payment.payment_amount
        : paymentsData[0].candidate_payment_amount,
    candidate_payment_status:
      (page === "Confrimed" || "Main") && page !== "Resource"
        ? payment.payment_status
        : paymentsData[0].candidate_payment_status,
    candidate_payment_date:
      (page === "Confrimed" || "Main") && page !== "Resource"
        ? moment(payment.payment_date).format("DD-MM-YYYY")
        : paymentsData[0].candidate_payment_date,
    resource_payment_amount:
      page === "Resource"
        ? payment.payment_amount
        : paymentsData[0].resource_payment_amount,
    resource_payment_status:
      page === "Resource"
        ? payment.payment_status
        : paymentsData[0].resource_payment_status,
    resource_payment_date:
      page === "Resource"
        ? moment(payment.payment_date).format("DD-MM-YYYY")
        : paymentsData[0].resource_payment_date,
  };

  const editedData = {
    id: params.id,
    candidate_name: values.candidate_name,
    mobile: values.mobile,
    technology: values.technology,
    date_of_enquiry: values.date_of_enquiry,
    start_date:
      values.status === "Confrimed"
        ? moment(new Date()).format("DD-MM-YYYY")
        : "",
    followup_date:
      values.status === "Confrimed" && values.payment_period !== ""
        ? moment(FollowupDate()).format("DD-MM-YYYY")
        : "",
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
    charges: values.charges,
    payment_period: values.payment_period,
    created_by: values.created_by,
    updated_by: values.updated_by,
  };

  const editData = () => {
    axios
      .put(`http://localhost:8000/api/v1/job-support-data-update`, editedData)
      .then((res) => {
        console.log(res.data);
        console.log("Data Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const paymentRequests = () => {
    if (paymentsLength === 0) {
      return axios
        .post(
          `http://localhost:8000/api/v1/job-support-paymnet-data`,
          paymentData
        )
        .then((res) => {
          console.log(res.data);
          console.log("paymentData Successfully Posted");
          console.log(paymentData);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return axios
        .put(
          `http://localhost:8000/api/v1/job-support-payment-update`,
          paymentUpdateData
        )
        .then((res) => {
          console.log(res.data);
          console.log("paymentData Successfully Updated");
          console.log(paymentUpdateData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const paymentGetData = () => {
  //   axios.get("http://localhost:8000/api/v1/job-support-payment-data-all")
  //  .then((res)=>setPaymentsData(res.data))
  // }
  // useEffect(()=>{
  //   paymentGetData();
  // },[])

  const handleSubmit = () => {
    editData();
    paymentRequests();
    fsgetRequests(dispatch);
    fetchDetails();
  };

  return {
    payment,
    values,
    handleChange,
    handlePaymentChange,
    handleSubmit,
  };
};
export default UpdateLogics;
