import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Survey from "./components/Survey";
import UserInfoForm from "./components/UserInfoForm";
import "./index.css";
import "./output.css";
import Layout from "./layout/Layout";
import Registeration from "./pages/Registeration";
import SurveyForm from "./pages/SurveyForm";
import Report from "./pages/Report";
import DecisionMatrix from "./components/DecisionMatrix";
import Home from "./components/Home";
import Login from "./pages/Login";

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/registeration" element={<Registeration />} />{" "}
        <Route path="/home" element={<Home />} />
        <Route path="/survey" element={<SurveyForm />} />
        <Route path="/report" element={<Report />} />
        <Route path="/decision" element={<DecisionMatrix />} />
      </Routes>
    </Router>

    // <DecisionMatrix />
    // <Home />
  );
};

export default App;
