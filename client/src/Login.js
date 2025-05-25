import React, { useState } from "react";
import axios from "axios";
import Register from "./Register";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/login", { username, password }, { withCredentials: true });
      setLoggedIn(true);
    } catch {
      alert("Invalid credentials");
    }
  };

  if (showRegister) return <Register setLoggedIn={setLoggedIn} />;

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Don't have an account? <button type="button" onClick={() => setShowRegister(true)}>Register</button></p>
    </form>
  );
}

export default Login;
