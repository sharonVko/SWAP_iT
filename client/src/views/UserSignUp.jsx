import React, { useState } from "react";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    passwort: "",
    passwordrepeat: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Logik?
    console.log(formData);
  };

  return (
    <div className=" m-5">
      <div className="p-10  max-w-sm mx-auto bg-gradient-to-b from-teal-600 to-teal-200 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-zinc-50 text-xl mb-3">
            <div>New Here? Register Now!</div>
            <div>Already have an account? Log in here.</div>
          </div>
          <div>
            <label
              htmlFor="firstname"
              className="block mb-3 text-sm font-medium text-gray-700"
            >
              <div className="mb-1">First Name</div>
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="mt-1 block w-full px-2 py-2 bg-transparent text-white placeholder-white border-b-4 border-blue-600 focus:border-green-300 focus:ring-0"
              placeholder="Enter your first name"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              <div className="mb-2">Last Name</div>
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              <div className="mb-2">User Name</div>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Create a username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              <div className="mb-2">E-mail</div>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your e-mail adress"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              <div className="mb-2">Create Password</div>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Create a Password"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="passwordrepeat"
              className="block text-sm font-medium text-gray-700"
            >
              <div className="mb-2">Password Repeat</div>
            </label>
            <input
              type="passwordrepeat"
              name="passwordrepeat"
              id="passwordrepeat"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Repeat your Password"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium text-gray-700"
            >
              <div className="m-2">Zip Code</div>
            </label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter your zip code"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignUp;
