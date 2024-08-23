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

export const fsgetRequests = async (dispatch, user_id, isAdmin) => {
  try {
    console.log("user_id ::", user_id);
    const response = await axios.get(
      `http://localhost:8000/api/v1/job-support-all`
    );
    const allRecords = response.data;
    console.log("Fetched content:", allRecords);

    // Filter the records based on user_id
    const filteredRecords = isAdmin
      ? allRecords
      : allRecords.filter((record) => record.user_id === user_id);
      
      console.log("Filtered records:", filteredRecords);

    dispatch({ type: "JS_GETREQUEST", payload: filteredRecords });
  } catch (error) {
    console.error("Error fetching job support data:", error);
  }
};

export const enqgetRequests = async (dispatch, user_id, isAdmin) => {
  try {
    console.log("user_id ::", user_id, isAdmin);
    const response = await axios.get(
      `http://localhost:8000/api/v1/course-enquiry-all` // No need to include user_id in the URL
    );
    const content = response.data;
    console.log("records:: ", content);
    // Filter the records based on user_id
    const filteredRecords = isAdmin
      ? content
      : content.filter((record) => record.user_id === user_id);

    dispatch({ type: "ENQ_GETREQUEST", payload: filteredRecords });
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
