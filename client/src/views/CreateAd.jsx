import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import LoginForm from "../components/LoginForm.jsx";
import axios from "axios";
import UploadPhoto from "../components/UploadPhoto.jsx";

const CreateAd = () => {
  const { isLoggedIn, userData } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tradeOption: false,
    pickupaddress: {
      street: "",
      housenumber: "",
      zip: "",
      city: "",
      country: "",
    },
    categories: "",
    subCategory: "",
    tags: "",
    media_files: [],
  });

  useEffect(() => {
    if (userData && userData._id) {
      setFormData((prev) => ({
        ...prev,
        user_id: userData._id,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("pickupaddress")) {
      const [_, addressField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        pickupaddress: {
          ...prev.pickupaddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, tradeOption: e.target.checked });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, media_files: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", userData._id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tradeOption", formData.tradeOption);
    formDataToSend.append("categories", formData.categories);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append(
      "pickupaddress[street]",
      formData.pickupaddress.street
    );
    formDataToSend.append(
      "pickupaddress[housenumber]",
      formData.pickupaddress.housenumber
    );
    formDataToSend.append("pickupaddress[zip]", formData.pickupaddress.zip);
    formDataToSend.append("pickupaddress[city]", formData.pickupaddress.city);
    formDataToSend.append(
      "pickupaddress[country]",
      formData.pickupaddress.country
    );

    for (let i = 0; i < formData.media_files.length; i++) {
      formDataToSend.append("media_files", formData.media_files[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/ads/createAd",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Ad created successfully:", response.data);

      setFormData({
        title: "",
        description: "",
        tradeOption: false,
        pickupaddress: {
          street: "",
          housenumber: "",
          zip: "",
          city: "",
          country: "",
        },
        categories: "",
        subCategory: "",
        tags: "",
        media_files: [],
      });
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  const toggleAddressSection = () => {
    // Function to toggle expand/collapse address section
    setExpandAddress(!expandAddress);
  };

  const [expandAddress, setExpandAddress] = useState(false);

  return (
    <div className="container mx-auto py-4">
      {isLoggedIn ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Create Advertisement</h1>

          <div className="shadow-lg p-6 bg-white rounded-lg">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="tradeOption"
                  checked={formData.tradeOption}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="mb-1">Trade Option</label>
              </div>
              <div>
                <label className="block mb-1">Categories:</label>
                <input
                  type="text"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">SubCategory:</label>
                <input
                  type="text"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Tags:</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Media Files:</label>
                <input
                  type="file"
                  name="media_files"
                  multiple
                  onChange={handleFileChange}
                  className="mb-2"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={toggleAddressSection}
                >
                  {expandAddress ? "Hide Address" : "Add Address (optional)"}
                </button>
              </div>
              {expandAddress && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="block mb-1">Street:</label>
                    <input
                      type="text"
                      name="pickupaddress.street"
                      value={formData.pickupaddress.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block mb-1">House Number:</label>
                    <input
                      type="text"
                      name="pickupaddress.housenumber"
                      value={formData.pickupaddress.housenumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block mb-1">Zip:</label>
                    <input
                      type="text"
                      name="pickupaddress.zip"
                      value={formData.pickupaddress.zip}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block mb-1">City:</label>
                    <input
                      type="text"
                      name="pickupaddress.city"
                      value={formData.pickupaddress.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block mb-1">Country:</label>
                    <input
                      type="text"
                      name="pickupaddress.country"
                      value={formData.pickupaddress.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Create Ad
              </button>
            </form>
          </div>
        </div>
      ) : (
        <LoginForm target="/profile/ads/new" />
      )}
    </div>
  );
};

export default CreateAd;
