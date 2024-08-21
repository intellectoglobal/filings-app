import axios from "axios";

export const getRequests = async (dispatch) => {
  try {
    const result = await fetch("http://localhost:8000/api/v1/req-data-all");
    if (result.ok) {
      const content = await result.json();
      dispatch({ type: "UPDATE_REQUESTS", payload: content });
    } else {
      console.error("Failed to fetch requests data.");
    }
  } catch (error) {
    console.error("Error fetching requests data:", error);
  }
};

export const getUsers = async (dispatch) => {
  try {
    const result = await fetch("http://localhost:8000/api/users-data-all");
    if (result.ok) {
      const content = await result.json();
      dispatch({ type: "UPDATE_USERS", payload: content });
    } else {
      console.error("Failed to fetch users data.");
    }
  } catch (error) {
    console.error("Error fetching users data:", error);
  }
};

export const fsgetRequests = async (dispatch, user_id) => {
    try {
      console.log("userid ::", user_id);
      const response = await axios.get(
        `http://localhost:8000/api/v1/job-support-all/${user_id}`
      );
      const content = response.data;
      dispatch({ type: "JS_GETREQUEST", payload: content });
    } catch (error) {
      console.error("Error fetching job support data:", error);
    }
  };

export const enqgetRequests = async (dispatch, user_id) => {
    try {
      console.log("userid ::", user_id);
      const response = await axios.get(
        `http://localhost:8000/api/v1/course-enquiry-all/${user_id}` // Use template literals to include user_id
      );
      const content = response.data;
      dispatch({ type: "ENQ_GETREQUEST", payload: content });
    } catch (error) {
      console.error("Error fetching course enquiry data:", error);
    }
  };
  

export const cmdgetRequests = async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/job-support-comment-data-all"
    );
    const content = response.data;
    dispatch({ type: "CMD_GETREQUEST", payload: content });
  } catch (error) {
    console.error("Error fetching job support comment data:", error);
  }
};

