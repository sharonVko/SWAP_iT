import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider.jsx";
import Cookies from "js-cookie";

function LoginForm({ target }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { checkUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login/`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "success") {

				// const token = response.data.token;
				//
        // if (token) {
        //   Cookies.set("token", token, { expires: 1, path: "/" });
        //   console.log("Token set in cookie:", Cookies.get("token")); // Debugging log
        // }


				checkUser(); // Update auth context
        console.log("Du hast dich erfolgreich eingeloggt");
        navigate(target); // Navigate to the dashboard or desired page after login
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging log
      setErrorMsg(
        error.response?.data?.message ||
          "Login failed. Please check your username and password."
      );
    }
  };


  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="mb-6 text-center">Login</h1>
      <div className="bg-white/30 p-8 rounded-xl">
        {errorMsg && (
          <div className="mb-4 bg-red-400 text-white text-center p-4 rounded">
            {errorMsg}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm uppercase tracking-wider">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm uppercase tracking-wider">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn-teal btn-lg mt-4 px-8">
              Login
            </button>
          </div>
        </form>
      </div>

      <p className="mt-4 text-center">
        Noch kein Konto?{" "}
        <a href="/signup" className="">
          Konto einrichten
        </a>
      </p>
    </div>
  );
}

export default LoginForm;
