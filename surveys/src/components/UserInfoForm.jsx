import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserInfoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    workingEntity: "",
    age: "",
    gender: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userInfo, setUserInfo } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Adjust payload to match backend schema
    const payload = {
      name: formData.fullName, // Map fullName to name
      phone: formData.phone,
      age: Number(formData.age), // Convert age to a number
      gender: formData.gender,
      job: formData.workingEntity, // Map workingEntity to job
    };

    try {
      const res = await axios.post(
        "https://survey-backend.up.railway.app/api/auth/register",
        payload
      );

      setMessage(res.data.message);
      setUserInfo(payload);
      onSubmit(payload);
      navigate("/");
    } catch (error) {
      setMessage(
        "Error submitting data: " + error.response?.data?.message ||
          error.message
      );
      console.error("Submission error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Enter Your Information
      </h2>

      {[
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "Working Entity", name: "workingEntity", type: "text" },
        { label: "Age", name: "age", type: "number" },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            {label}
          </label>
          <input
            type={type}
            name={name}
            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={formData[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <div>
        <label className="block text-lg font-medium mb-2 text-gray-700">
          Gender
        </label>
        <select
          name="gender"
          className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;
