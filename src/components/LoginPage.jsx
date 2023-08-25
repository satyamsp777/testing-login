// // src/components/LoginPage.js
// import React, { useState } from "react";

// function LoginPage({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Basic validation, you should perform actual authentication here.
//     if (username === "admin" && password === "admin") {
//       onLogin();
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div>
//       <h2>Login Page</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default LoginPage;

// src/components/LoginPage.js
import React, { useState } from "react";
import "./LoginPage.css"; // Import the CSS file for styling

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Basic validation, you should perform actual authentication here.
    if (
      username === import.meta.env.VITE_REACT_APP_ADMIN &&
      password === import.meta.env.VITE_REACT_APP_ADMIN_PASSWORD
    ) {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
