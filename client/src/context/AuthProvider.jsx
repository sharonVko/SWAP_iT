import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const checkUser = async () => {

    const token = Cookies.get("token");

		if (!token) {
      setIsLoggedIn(false);
      setUserData({});
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.data && response.data._id) {
        setIsLoggedIn(true);
        setUserData(response.data);
      }
			else {
        setIsLoggedIn(false);
        setUserData({});
      }
    }
		catch (error) {
      setIsLoggedIn(false);
      setUserData({});
      console.error(error);
    }
  };

  useEffect(() => {
		const token = Cookies.get("token");
    if (token) {
      checkUser().then();
    }
  }, []);




  const values = {
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    checkUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
