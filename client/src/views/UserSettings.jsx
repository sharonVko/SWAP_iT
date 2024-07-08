import { useState, useCallback, useEffect } from "react";
import beispielfotoprofil from "../assets/beispielfotoprofil.png";
import { Label } from "flowbite-react";
import { ReactTags } from "react-tag-autocomplete";
import { suggestions } from "../components/Categories.jsx";
import { useAuth } from "../context/AuthProvider.jsx";

const MIN_SELECTED_LENGTH = 3;

const UserSettings = () => {
  const { isLoggedIn, userData } = useAuth();
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    number: "",
    zip: "",
    country: "",
    name: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editableField, setEditableField] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isLoggedIn && userData) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        phone: userData.phone || "",
        street: userData.address?.street || "",
        number: userData.address?.housenumber || "",
        zip: userData.address?.zip || "",
        country: userData.address?.city || "",
        name: userData.username || "",
        imageUrl: userData.profileImage || beispielfotoprofil,
      }));
    }
  }, [isLoggedIn, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditableField(null);
    // PUT REQUEST!
    console.log("Saved profile:", profile);
  };

  const onAdd = useCallback((newTag) => {
    setSelected((prevSelected) => [...prevSelected, newTag]);
  }, []);

  const onDelete = useCallback((index) => {
    setSelected((prevSelected) => prevSelected.filter((_, i) => i !== index));
  }, []);

  const isInvalid = selected.length < MIN_SELECTED_LENGTH;

  if (!isLoggedIn) {
    return <div>Please log in to access your profile.</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols- md:grid-cols-2 bg-teal-600 bg-opacity-80 rounded-lg">
      <div className="max-w-sm mx-auto">
        <div className="text-4xl pb-12 pt-6 text-peach-300 text-center">
          Profile Settings
        </div>
        <div>
          <img
            src={profile.imageUrl}
            alt="Profilbild"
            className="rounded-full max-w-sm mx-auto h-29 w-40 border-8 border-peach-500 mb-6"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="profile-image-upload"
        />
        <label
          htmlFor="profile-image-upload"
          className="max-w-sm mx-auto btn-sm btn-red text-lemon-500 py-2 mb-4"
        >
          Change your Pic
        </label>

        <h1 className="h2 text-peach-300 text-center text-3xl font-bold mt-8">
          {profile.firstname} {profile.lastname}
        </h1>

        <div className="max-w-sm mx-auto">
          <button className="bg-green-700 text-white rounded-lg border-peach-300 p-3 w-full mb-9 mt-9">
            Change your Password
          </button>
        </div>

        <form className="max-w-sm mx-auto">
          <p id="custom-validity-description">
            Please select at least {MIN_SELECTED_LENGTH} tags:
          </p>
          <ReactTags
            ariaDescribedBy="custom-validity-description"
            ariaErrorMessage="error"
            id="custom-validity-demo"
            isInvalid={isInvalid}
            labelText="Select countries"
            onDelete={onDelete}
            onAdd={onAdd}
            selected={selected}
            suggestions={suggestions}
          />
          {isInvalid && (
            <p id="error" style={{ color: "#fd5956" }}>
              You must select {MIN_SELECTED_LENGTH - selected.length} more tags
            </p>
          )}

          <div className="mb-2 block">
            <Label
              className="text-2xl text-peach-300"
              htmlFor="categories"
              value="Select a Category"
            />
          </div>
          <select
            id="cats"
            className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
          >
            <option className="bg-peach-300 text-black hover:red-100">
              Shopping
            </option>
            <option className="bg-peach-300 focus:ring-orange-500 text-black">
              Household
            </option>
            <option className="bg-peach-300 text-black">Garden</option>
            <option className="bg-peach-300 text-black">Sport</option>
          </select>
        </form>

        <form className="max-w-sm mx-auto">
          <div className="mb-2 block">
            <Label
              className="text-2xl text-peach-300"
              htmlFor="categories"
              value="Select a Subcategory"
            />
          </div>
          <select
            id="subcats"
            className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
          >
            <option className="bg-peach-300 text-black hover:red-100">
              Shopping
            </option>
            <option className="bg-peach-300 focus:ring-orange-500 text-black">
              Household
            </option>
            <option className="bg-peach-300 text-black">Garden</option>
            <option className="bg-peach-300 text-black">Sport</option>
          </select>
        </form>

        <form className="max-w-sm mx-auto">
          <div className="mb-2 block">
            <Label
              className="text-2xl text-peach-300"
              htmlFor="categories"
              value="Select at least three Tags"
            />
          </div>
          <select
            id="tag"
            className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
          >
            <option className="bg-peach-300 text-black hover:red-100">
              Shopping
            </option>
            <option className="bg-peach-300 focus:ring-orange-500 text-black">
              Household
            </option>
            <option className="bg-peach-300 text-black">Garden</option>
            <option className="bg-peach-300 text-black">Sport</option>
          </select>
          <select
            id="tag"
            className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
          >
            <option className="bg-peach-300 text-black hover-red-100">
              Shopping
            </option>
            <option className="bg-peach-300 focus-ring-orange-500 text-black">
              Household
            </option>
            <option className="bg-peach-300 text-black">Garden</option>
            <option className="bg-peach-300 text-black">Sport</option>
          </select>
          <select
            id="tag"
            className="bg-red-400 border-peach-300 text-peach-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8"
          >
            <option className="bg-peach-300 text-black hover:red-100">
              Shopping
            </option>
            <option className="bg-peach-300 focus:ring-orange-500 text-black">
              Household
            </option>
            <option className="bg-peach-300 text-black">Garden</option>
            <option className="bg-peach-300 text-black">Sport</option>
          </select>
        </form>
      </div>

      <div className="md:col-span-1 p-12 flex flex-col">
        <div>
          {[
            "firstname",
            "lastname",
            "email",
            "phone",
            "street",
            "number",
            "zip",
            "country",
          ].map((field) => (
            <div key={field} className="mb-6">
              <div className="text-2xl text-green-200">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </div>
              <div>
                {isEditing && editableField === field ? (
                  <input
                    type="text"
                    name={field}
                    value={profile[field]}
                    className="bg-peach-300 text-black text-lg rounded-lg p-4 w-full"
                    onChange={handleInputChange}
                    onBlur={() => setEditableField(null)}
                    autoFocus
                  />
                ) : (
                  <div
                    className="field text-black-300 border-green-200 p-4 border rounded-lg whitespace-pre-wrap cursor-pointer bg-peach-400"
                    onClick={() => {
                      setIsEditing(true);
                      setEditableField(field);
                    }}
                  >
                    {profile[field] || `Edit your ${field}`}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isEditing && (
            <button
              className="btn-sm btn-red text-lemon-500 px-4 py-2 rounded block mt-4"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
