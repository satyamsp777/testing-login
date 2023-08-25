import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user was previously logged in
    const storedLoggedIn = sessionStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    // Store the login state in localStorage
    sessionStorage.setItem("loggedIn", "true");

    // Set a session timeout here (e.g., 30 minutes)
    setTimeout(() => {
      setLoggedIn(false);
      // Remove the login state from localStorage on timeout
      sessionStorage.removeItem("loggedIn");
    }, 2 * 60 * 1000); // 30 minutes in milliseconds
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Remove the login state from localStorage on logout
    sessionStorage.removeItem("loggedIn");
  };

  return (
    <div className="App">
      {loggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
