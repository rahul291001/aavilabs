import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";
import { UserProvider } from "./components/UserContext/UserContext";
import React, { useState, useEffect } from 'react';
import Signup from "./components/Singup/index";
import Login from "./components/Login/index";
import Home from "./components/Home/Home";
import Support from "./components/Support/index";
import AssignTask from "./components/AssignTask/index";
import SettingsPage from "./components/Setting_/index";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/dashboard" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/support" exact element={<Support />} />
      <Route path="/AssignTask" exact element={<AssignTask />} />
      <Route path="/AssignTask" exact element={<AssignTask />} />
      <Route path="/Setting" exact element={<SettingsPage />} />
    </Routes>
  );
}



function AppWithProvider() {
  const [userData, setUserData] = useState(null);
  return (
    <UserProvider userData={userData} setUserData={setUserData}>
      <App />
    </UserProvider>
  );
}

export default AppWithProvider;