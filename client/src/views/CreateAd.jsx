import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import LoginForm from "../components/LoginForm.jsx";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import { categories } from "../utils/categories.js";
import { tags } from "../utils/tags";

const CreateAd = () => {
  const { isLoggedIn, userData } = useAuth();

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
    media_files: [],
    condition: "",
    material: "",
    color: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDiverse, setSelectedDiverse] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (userData && userData._id) {
      setFormData((prev) => ({
        ...prev,
        user_id: userData._id,
      }));
    }
  }, [userData]);

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

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prev) => [...prev, file]);
      setFormData((prev) => ({
        ...prev,
        media_files: [...prev.media_files, file],
      }));
    });
  }, []);

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
    setFormData({ ...formData, tradeOption: checked });
  };

  const handleTagChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      tags: [...prev.tags.filter((tag) => tag !== value), value],
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
    formDataToSend.append("tags", formData.tags.join(", "));
    formDataToSend.append("condition", formData.condition);
    formDataToSend.append("material", formData.material);
    formDataToSend.append("color", formData.color);
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
        tags: [],
        media_files: [],
        condition: "",
        material: "",
        color: "",
      });

      setSelectedImages([]);
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  const toggleAddressSection = () => {
    setExpandAddress(!expandAddress);
  };

  const [expandAddress, setExpandAddress] = useState(false);

  const conditionTags = tags.filter((tag) => tag.parent === 1);
  const materialTags = tags.filter((tag) => tag.parent === 9);
  const colorTags = tags.filter((tag) => tag.parent === 25);
  const diverseTags = tags.filter((tag) => tag.parent === 39);

  return (
    <div className="container mx-auto py-4">
      {isLoggedIn ? (
        <>
          <div>
            <div>
              <h1 className="text-2xl font-bold mb-4">
                Erstelle deine Anzeige
              </h1>

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
                      <div key={index} className="w-1/4 p-2">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="max-w-full h-auto rounded-lg shadow"
                        />
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
                  <span className="ml-2">
                    {formData.tradeOption ? "Tauschen" : "Verschenken"}
                  </span>
                </div>
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
                      className="w-full max-w-xs border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-indigo-200 text-sm rounded-lg"
                      required
                    />
                  </div>

                  <div className="relative mb-4">
                    <button
                      type="button"
                      className="form-button bg-white/30 text-teal-500 w-fill"
                      onClick={toggleAddressSection}
                    >
                      {expandAddress
                        ? "Einklappen"
                        : " alternative Abholadresse?"}
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
                        setFormData({
                          ...formData,
                          categories: e.target.value,
                        });
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
                    <label className="block mb-1">Unterkatgeorie:</label>
                    <select
                      name="subCategory"
                      value={selectedSubCategory}
                      onChange={(e) => {
                        setSelectedSubCategory(e.target.value);
                        setFormData({
                          ...formData,
                          subCategory: e.target.value,
                        });
                      }}
                      className="form-select"
                      required
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
                      value={selectedCondition}
                      onChange={(e) => {
                        setSelectedCondition(e.target.value);
                        handleTagChange("condition", e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="">Wähle einen Zustand</option>
                      {conditionTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">Material:</label>
                    <select
                      name="material"
                      value={selectedMaterial}
                      onChange={(e) => {
                        setSelectedMaterial(e.target.value);
                        handleTagChange("material", e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="">Wähle das Material</option>
                      {materialTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">Farbe:</label>
                    <select
                      name="color"
                      value={selectedColor}
                      onChange={(e) => {
                        setSelectedColor(e.target.value);
                        handleTagChange("color", e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="">Wähle eine Farbe</option>
                      {colorTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">Diverse:</label>
                    <select
                      name="diverse"
                      value={selectedDiverse}
                      onChange={(e) => {
                        setSelectedDiverse(e.target.value);
                        handleTagChange("diverse", e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="">Select</option>
                      {diverseTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
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
                    Anzeige erstellen
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default CreateAd;
