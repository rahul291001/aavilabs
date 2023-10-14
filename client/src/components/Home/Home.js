import React from "react";
import {
  FaTasks,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import Main from "../Main";
import "../Home/Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <Main />
      <main className="main-container">
        <div className="main-title">
          <h3 className="dashtext">DASHBOARD</h3>
        </div>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>All Tasks</h3>
              <FaTasks className="card_icon" />
            </div>
            <h2>10</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Completed</h3>
              <FaCheck className="card_icon" />
            </div>
            <h2>12</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Pending</h3>
              <FaClock className="card_icon" />
            </div>
            <h2>33</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Issues</h3>
              <FaExclamationTriangle className="card_icon" />
            </div>
            <h2>42</h2>
          </div>
        </div>
      </main>
      <div className="card-container">
        <Link to="/projects" className="card_pt">
          <p className="inside-text">Projects</p>
        </Link>
        <div className="vertical-line"></div>

        <Link to="/teams" className="card_pt">
          <p className="inside-text">Teams</p>
        </Link>
      </div>
    </>
  );
}

export default Home;
