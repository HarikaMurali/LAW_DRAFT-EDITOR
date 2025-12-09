import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../App.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} relative`}>
      {/* Background */}
      <div className="fixed inset-0 bg-black -z-10"></div>
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div style={{ marginLeft: sidebarOpen ? '0' : '0' }} className="lg:ml-64 min-h-screen">
        {/* Top Header */}
        <header style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          backgroundColor: "#1a1a1a",
          borderBottom: "1px solid #333",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              style={{
                display: window.innerWidth < 1024 ? "block" : "none",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px"
              }}
              aria-label="Toggle menu"
            >
              <svg style={{ width: "24px", height: "24px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#4ade80",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px"
              }}>
                📄
              </div>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>LexiCraft</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                fontSize: "20px"
              }}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>

            {/* Notifications */}
            <button 
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                fontSize: "20px",
                position: "relative"
              }}
              aria-label="Notifications"
              title="Notifications"
            >
              🔔
              <span style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                width: "8px",
                height: "8px",
                backgroundColor: "#ef4444",
                borderRadius: "50%"
              }}></span>
            </button>

            {/* Security Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "10px" }}>
              <span style={{ fontSize: "20px", color: "#4ade80" }}>🔒</span>
              <span style={{ fontSize: "14px" }}>Secure</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
