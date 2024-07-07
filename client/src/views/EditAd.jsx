import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios-config.js";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import { categories } from "../utils/categories.js";
import { tags } from "../utils/tags";
import LoginForm from "../components/LoginForm.jsx";

const EditAd = () => {
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

  useEffect(() => {
    const fetchAdData = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching ad data:", error);
        setLoading(false);
      }
    };

    if (adid) {
      fetchAdData();
    }
  }, [adid]);

  useEffect(() => {
    if (selectedCategory) {
      const filteredSubCategories = categories.filter(
        (category) => category.parent === parseInt(selectedCategory)
      );
      setSubCategories(filteredSubCategories);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const filteredCategories = categories.filter(
    (category) => category.parent === 0
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
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

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      tradeOption: checked,
    }));
  };

  const handleTagChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      tags:
        Array.isArray(prev.tags) && prev.tags.includes(value)
          ? prev.tags.filter((tag) => tag !== value)
          : [...(prev.tags || []), value], // Ensuring tags is always an array
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setFormData((prev) => ({
      ...prev,
      media_files: updatedImages,
    }));
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
    formDataToSend.append(
      "tags",
      Array.isArray(formData.tags) ? formData.tags.join(",") : ""
    );

    formDataToSend.append("condition", formData.condition);
    formDataToSend.append("material", formData.material);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("diverse", formData.diverse);
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

    formData.media_files.forEach((file) => {
      formDataToSend.append("media_files", file);
    });

    try {
      const response = await axiosInstance.put(`/ads/${adid}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Ad updated successfully:", response.data);
      navigate(`/ads/${adid}`); // Redirect to the ad detail page
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const toggleAddressSection = () => {
    setExpandAddress(!expandAddress);
  };

  const handleUpdateAd = async () => {
    const updatedData = {
      title: "New Title",
      description: "Updated description",
      tags: ["tag1", "tag2", "tag3"],
      subCategory: "newSubCategory",
      // include other fields that need to be updated
    };

    console.log("Request payload:", updatedData);

    try {
      const response = await axiosInstance.put(`/ads/${adid}`, updatedData);
      console.log("Ad updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating ad:", error);
    }
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

            <div className="flex items-center mb-4">
              <label className="mr-2"></label>
              <div className="relative">
                <Switch
                  onChange={handleSwitchChange}
                  checked={formData.tradeOption}
                  className="react-switch"
                  offColor="#888"
                  onColor="#4CAF50"
                  height={20}
                  width={48}
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
              </div>
              <span className="ml-2 text-gray-700">Tauschen Option</span>
            </div>

            <div className="shadow-lg bg-white/30 p-8 rounded-xl">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1">Titel:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="relative mb-4">
                  <button
                    type="button"
                    className="form-button bg-white/30 text-teal-500 w-fill"
                    onClick={toggleAddressSection}
                  >
                    {expandAddress ? "Einklappen" : "Alternative Abholadresse?"}
                  </button>
                  {expandAddress && (
                    <div className="p-4 bg-white/30 shadow-md rounded-lg mt-2">
                      <h2 className="text-xl font-semibold mb-4">Adresse</h2>
                      <div className="mb-4">
                        <label className="block mb-1">Straße:</label>
                        <input
                          type="text"
                          name="pickupaddress.street"
                          value={formData.pickupaddress.street}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">Hausnummer:</label>
                        <input
                          type="text"
                          name="pickupaddress.housenumber"
                          value={formData.pickupaddress.housenumber}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="container flex">
                        <div className="mb-4">
                          <label className="block mb-1">PLZ:</label>
                          <input
                            type="text"
                            name="pickupaddress.zip"
                            value={formData.pickupaddress.zip}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div className="mb-4 flex-row px-3">
                          <label className="block mb-1">Stadt:</label>
                          <input
                            type="text"
                            name="pickupaddress.city"
                            value={formData.pickupaddress.city}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1">Land:</label>
                          <input
                            type="text"
                            name="pickupaddress.country"
                            value={formData.pickupaddress.country}
                            onChange={handleChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Kategorie:</label>
                  <select
                    name="categories"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setFormData({ ...formData, categories: e.target.value });
                    }}
                    className="form-select"
                    required
                  >
                    <option value="">Wähle eine Kategorie</option>
                    {filteredCategories.map((category) => (
                      <option key={category.cat_id} value={category.cat_id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Unterkategorie:</label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Wähle eine Unterkategorie</option>
                    {subCategories.map((subCategory) => (
                      <option
                        key={subCategory.cat_id}
                        value={subCategory.cat_id}
                      >
                        {subCategory.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Zustand:</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Wähle einen Zustand</option>
                    {tags
                      .filter((tag) => tag.parent === 1)
                      .map((tag) => (
                        <option key={tag.tag_id} value={tag.tag_id}>
                          {tag.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Material:</label>
                  <select
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Wähle das Material</option>
                    {tags
                      .filter((tag) => tag.parent === 9)
                      .map((tag) => (
                        <option key={tag.tag_id} value={tag.tag_id}>
                          {tag.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Farbe:</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Wähle eine Farbe</option>
                    {tags
                      .filter((tag) => tag.parent === 25)
                      .map((tag) => (
                        <option key={tag.tag_id} value={tag.tag_id}>
                          {tag.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Diverse:</label>
                  <select
                    name="diverse"
                    value={formData.diverse}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Wähle diverse</option>
                    {tags
                      .filter((tag) => tag.parent === 39)
                      .map((tag) => (
                        <option key={tag.tag_id} value={tag.tag_id}>
                          {tag.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Beschreibung:</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                    rows="4"
                    placeholder="Beschreibe deinen Artikel..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-teal">
                  Anzeige aktualisieren
                </button>
              </form>
            </div>
          </div>
        )
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default EditAd;
