import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Select a Survey
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-blue-100 transition"
          onClick={() => navigate("/personality")}
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Personality Survey
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
