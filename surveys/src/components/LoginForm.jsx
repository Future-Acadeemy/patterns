import React, { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const [phone, setPhone] = useState("");
  const { setUserInfo } = useUserStore();
  const navigate = useNavigate();
  const { login, loading, message } = useLogin(); // Use the login hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ phone }); // Send only phone number
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-lg">
      <form
        className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Login
        </h2>

        {/* Phone Number Input */}
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {message && <p className="text-red-500 text-center">{message}</p>}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/registeration")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
