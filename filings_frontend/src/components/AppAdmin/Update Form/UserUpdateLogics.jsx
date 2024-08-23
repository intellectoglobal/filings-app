import { useState, useEffect } from "react";
import axios from "axios";
import { useValue } from "../../../Context/ContextProvider";
import { fsgetRequests } from "../../../Context/actions";

const UserUpdateLogics = ({ params, page }) => {
  // Initialize state
  const [values, setValues] = useState(params.row);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const {stat:{user_id}, dispatch } = useValue();

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle apps change (multi-select dropdown)
  const handleAppsChange = (event) => {
    setApps(event.target.value);
  };

  // Update user data
  const updateUserData = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/v1/users/${params.id}`, {
        ...values,
        apps,
      });
      console.log("User data successfully updated");
    } catch (error) {
      console.error("Error updating user data", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    updateUserData();
    fsgetRequests(dispatch, user_id);
  };

  // Fetch initial data if needed (optional)
  useEffect(() => {
    // Example of fetching initial data
    const fetchInitialData = async () => {
      try {
        const result = await axios.get("http://localhost:8000/api/v1/apps");
        setApps(result.data);
      } catch (error) {
        console.error("Error fetching apps data", error);
      }
    };
    fetchInitialData();
  }, []);

  return {
    values,
    apps,
    handleChange,
    handleAppsChange,
    handleSubmit,
    loading,
  };
};

export default UserUpdateLogics;
