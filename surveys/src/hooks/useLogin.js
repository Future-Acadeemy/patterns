import { useState } from "react";
import axios from "axios";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userInfo, setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const login = async (formData) => {
    setLoading(true);
    setMessage("");

    //        "https://survey-backend.up.railway.app/api/auth/login",

    try {
      const res = await axios.post(
        "https://survey-backend.up.railway.app/api/auth/login",
        formData
      );
      setMessage(res.data.message);
      setUserInfo({ ...res.data.user, token: null }); // Save user info
      // "https://survey-backend.up.railway.app/api/auth/profile"
      const profile = await axios.get(
        "https://survey-backend.up.railway.app/api/auth/profile",
        {
          headers: { "x-user-phone": formData.phone }, // Replace with actual phone number
        }
      );
      const { _id, createdAt, updatedAt, __v, ...userData } = profile.data;
      setUserInfo(userData);
      navigate("/survey");
    } catch (error) {
      setMessage(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, message };
};

export default useLogin;
