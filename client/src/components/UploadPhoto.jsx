import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadPhoto = ({ adId, onSuccess }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mediaFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("media_files", mediaFile);
    formData.append("ad_id", adId);

    console.log("FormData content:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    if (!token) {
      console.error("No access token found. Please log in.");
      return;
    }

    console.log("Sending request with formData:", formData);
    console.log("Authorization Token:", token);

    try {
      const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/media/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload successful:", response.data);
      onSuccess();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized. Please log in again.");
        // Optionally, trigger a logout or re-authentication process here.
      } else {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPhoto;
