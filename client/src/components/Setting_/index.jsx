import React, { useState } from "react";
import Main from "../Main";
import "../Setting_/Settings.css";
const SettingsPage = () => {
  // Example settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [fontSize, setFontSize] = useState("medium");
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationsChange = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleFontSizeChange = (selectedFontSize) => {
    setFontSize(selectedFontSize);
  };

  const handleAutoSaveChange = () => {
    setAutoSave((prev) => !prev);
  };

  const handleDarkModeChange = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <Main />
      <div className="settings-page">
        <h1>Settings</h1>
        <section className="settings-section">
          <h2>General</h2>
          <div>
            <label>
              Enable Notifications
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleNotificationsChange}
              />
            </label>
          </div>
          <div>
            <label>
              Select Theme
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select Language
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </label>
          </div>
        </section>
        <section className="settings-section">
          <h2>Display</h2>
          <div>
            <label>
              Select Font Size
              <select
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Auto-Save
              <input
                type="checkbox"
                checked={autoSave}
                onChange={handleAutoSaveChange}
              />
            </label>
          </div>
          <div>
            <label>
              Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleDarkModeChange}
              />
            </label>
          </div>
        </section>
      </div>
    </>
  );
};

export default SettingsPage;
