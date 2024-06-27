import React, { useEffect, useState } from "react";
import axios from "../utils/axios-config.js"; // Adjust import path based on your setup

const UserDataComponent = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("users/me"); // Endpoint to fetch current user data
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Render other user details as needed */}
    </div>
  );
};

export default UserDataComponent;
