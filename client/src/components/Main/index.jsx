import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useUser } from "../UserContext/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../Main/Navbar.css";
import { IconContext } from "react-icons";

const Main = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const userId = userData ? userData.user.userId : null;
  const [user, setUser] = useState({});
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const handleLogout = () => {
    try {
      localStorage.setItem("jwtToken", null);
      const tokenAfterRemoval = localStorage.getItem("jwtToken");
      console.log("Token after removal:", tokenAfterRemoval);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8001/auth/users/${userId}`);
          if (response.status === 200) {
            const data = await response.json();
            console.log("Data from the response:", data);
            setUser(data.user);
          } else {
            console.error("Request failed with status:", response.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [userId]);

  const firstName = user ? user.firstname : null;
  const lastName = user ? user.lastname : null;

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="user-info">
            <h2 className="username">{`Hello, ${firstName} ${lastName || ""}`}</h2>
          </div>
          <div className="navbar-buttons">
            <button className="white_btn" onClick={handleLogout}>
              Logout
            </button>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <h2 className="tmctext">TMC Tool</h2>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="close_menubar" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Main;
