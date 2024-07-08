import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios-config.js";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import { categories } from "../utils/categories.js";
import { tags } from "../utils/tags";
import LoginForm from "../components/LoginForm.jsx";

const EditAd = () =>
{
  const { isLoggedIn, userData } = useAuth();
  const { adid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tradeOption: true,
    pickupaddress: {
      street: "",
      housenumber: "",
      zip: "",
      city: "",
      country: "",
    },
    categories: "",
    subCategory: "",
    tags: [],
    media_files: [], // This will hold all uploaded and existing images
    condition: "",
    material: "",
    color: "",
    diverse: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandAddress, setExpandAddress] = useState(false);

  useEffect(() =>
  {
    const fetchAdData = async () =>
    {
      try
      {
        const response = await axiosInstance.get(`/ads/${adid}`);
        const adData = response.data;

        // Update formData state with fetched data
        setFormData({
          title: adData.title || "",
          description: adData.description || "",
          tradeOption: adData.tradeOption || true,
          pickupaddress: {
            street: adData.pickupaddress?.street || "",
            housenumber: adData.pickupaddress?.housenumber || "",
            zip: adData.pickupaddress?.zip || "",
            city: adData.pickupaddress?.city || "",
            country: adData.pickupaddress?.country || "",
          },
          categories: adData.categories || "",
          subCategory: adData.subCategory || "",
          tags: adData.tags || [],
          media_files: adData.media_files || [], // Initialize as empty array or as per fetched data
          condition: adData.condition || "",
          material: adData.material || "",
          color: adData.color || "",
          diverse: adData.diverse || "",
        });

        setSelectedImages(adData.media_files || []); // Load existing images
        setSelectedCategory(adData.categories || "");
        setLoading(false);
      } catch (error)
      {
        console.error("Error fetching ad data:", error);
        setLoading(false);
      }
    };

    if (adid)
    {
      fetchAdData();
    }
  }, [adid]);

  useEffect(() =>
  {
    if (selectedCategory)
    {
      const filteredSubCategories = categories.filter(
        (category) => category.parent === parseInt(selectedCategory)
      );
      setSubCategories(filteredSubCategories);
    } else
    {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const filteredCategories = categories.filter(
    (category) => category.parent === 0
  );

  const onDrop = useCallback(
    (acceptedFiles) =>
    {
      const updatedImages = [...selectedImages, ...acceptedFiles];
      setSelectedImages(updatedImages);
      setFormData((prev) => ({
        ...prev,
        media_files: [...prev.media_files, ...acceptedFiles],
      }));
    },
    [selectedImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    if (name.includes("pickupaddress"))
    {
      const [_, addressField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        pickupaddress: {
          ...prev.pickupaddress,
          [addressField]: value,
        },
      }));
    } else
    {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSwitchChange = (checked) =>
  {
    setFormData((prev) => ({
      ...prev,
      tradeOption: checked,
    }));
  };

  const handleTagChange = (name, value) =>
  {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      tags:
        Array.isArray(prev.tags) && prev.tags.includes(value)
          ? prev.tags.filter((tag) => tag !== value)
          : [...(prev.tags || []), value], // Ensuring tags is always an array
    }));
  };

  const handleDeleteImage = (index) =>
  {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setFormData((prev) => ({
      ...prev,
      media_files: updatedImages,
    }));
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append form fields to FormData
    formDataToSend.append("user_id", userData._id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tradeOption", formData.tradeOption);
    formDataToSend.append("categories", formData.categories);
    formDataToSend.append("subCategory", formData.subCategory);
    formDataToSend.append("tags", Array.isArray(formData.tags) ? formData.tags.join(",") : "");
    formDataToSend.append("condition", formData.condition);
    formDataToSend.append("material", formData.material);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("diverse", formData.diverse);

    // Append pickup address fields to FormData
    formDataToSend.append("pickupaddress[street]", formData.pickupaddress.street);
    formDataToSend.append("pickupaddress[housenumber]", formData.pickupaddress.housenumber);
    formDataToSend.append("pickupaddress[zip]", formData.pickupaddress.zip);
    formDataToSend.append("pickupaddress[city]", formData.pickupaddress.city);
    formDataToSend.append("pickupaddress[country]", formData.pickupaddress.country);

    // Append media files to FormData
    formData.media_files.forEach((file, index) =>
    {
      formDataToSend.append("media_files", file);
    });

    try
    {
      const response = await axiosInstance.put(`/ads/${adid}`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Ad updated successfully:", response.data);
      navigate(`/ads/${adid}`); // Redirect to the ad detail page
    } catch (error)
    {
      console.error("Error updating ad:", error);
    }
  };

  const toggleAddressSection = () =>
  {
    setExpandAddress(!expandAddress);
  };

  return (
    <div className="container mx-auto py-4">
      {isLoggedIn ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Anzeige bearbeiten</h1>

            <div className="shadow-lg bg-white/30 p-8 rounded-xl mb-6">
              <div
                {...getRootProps({
                  className: "dropzone border-dashed border-2 p-4",
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-gray-500 text-center">
                    Drop file(s) here ...
                  </p>
                ) : (
                  <p className="text-gray-500 text-center">
                    Drag and drop oder klicke um Dateien auszuwählen
                  </p>
                )}
              </div>
            </div>

            <div className="shadow-lg bg-white/30 p-8 rounded-xl mb-6">
              <div className="flex flex-wrap -mx-2">
                {selectedImages.length > 0 &&
                  selectedImages.map((image, index) => (
                    <div key={index} className="w-1/4 p-2 relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="max-w-full h-auto rounded-lg shadow"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                        onClick={() => handleDeleteImage(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="shadow-lg bg-white/30 p-8 rounded-xl mb-6">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Titel
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Beschreibung
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="4"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="tradeOption"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Tauschoption
                  </label>
                  <Switch
                    onChange={handleSwitchChange}
                    checked={formData.tradeOption}
                    id="tradeOption"
                    name="tradeOption"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="categories"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Kategorien
                  </label>
                  <select
                    id="categories"
                    name="categories"
                    value={selectedCategory}
                    onChange={(e) =>
                    {
                      handleChange(e);
                      setSelectedCategory(e.target.value);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Bitte wählen...</option>
                    {filteredCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subCategory"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Unterkategorie
                  </label>
                  <select
                    id="subCategory"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Bitte wählen...</option>
                    {subCategories.map((subCategory) => (
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="tags"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Tags
                  </label>
                  <select
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      handleTagChange("tags", e.target.value)
                    }
                    multiple
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="condition"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Zustand
                  </label>
                  <input
                    type="text"
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="material"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Material
                  </label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="color"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Farbe
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="diverse"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Diverse
                  </label>
                  <input
                    type="text"
                    id="diverse"
                    name="diverse"
                    value={formData.diverse}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="mb-4">
                  <button
                    type="button"
                    className="text-blue-600 underline"
                    onClick={toggleAddressSection}
                  >
                    {expandAddress ? "Address hide" : "Address expand"}
                  </button>
                </div>

                {expandAddress && (
                  <div className="mb-4">
                    <div className="mb-4">
                      <label
                        htmlFor="pickupaddress.street"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        id="pickupaddress.street"
                        name="pickupaddress.street"
                        value={formData.pickupaddress.street}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="pickupaddress.housenumber"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Housenumber
                      </label>
                      <input
                        type="text"
                        id="pickupaddress.housenumber"
                        name="pickupaddress.housenumber"
                        value={formData.pickupaddress.housenumber}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="pickupaddress.zip"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Zip
                      </label>
                      <input
                        type="text"
                        id="pickupaddress.zip"
                        name="pickupaddress.zip"
                        value={formData.pickupaddress.zip}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="pickupaddress.city"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="pickupaddress.city"
                        name="pickupaddress.city"
                        value={formData.pickupaddress.city}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="pickupaddress.country"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="pickupaddress.country"
                        name="pickupaddress.country"
                        value={formData.pickupaddress.country}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default EditAd;
