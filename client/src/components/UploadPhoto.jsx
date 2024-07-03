import React, { useState } from "react";
import axios from "axios";

const UploadPhoto = ({ adId, onSuccess }) => {
  const [mediaFile, setMediaFile] = useState(null);

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
    formData.append("media_file", mediaFile);
    formData.append("ad_id", adId);

    try {
      const token = localStorage.getItem("accessToken"); // Replace with your actual token retrieval logic

      const response = await axios.post(
        "http://localhost:8000/media/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload successful:", response.data);
      onSuccess(); // Trigger any necessary actions upon successful upload
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error response as needed
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
