import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Home from "./components/Home/Home";
import Support from "./components/Support";
import AssignTask from "./components/AssignTask";
import SettingsPage from "./components/Setting_";
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

export default App;
