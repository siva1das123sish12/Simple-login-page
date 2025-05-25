import React from "react";
import axios from "axios";

function HelloWorld({ setLoggedIn }) {
  const handleLogout = async () => {
    await axios.post("/api/logout", {}, { withCredentials: true });
    setLoggedIn(false);
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default HelloWorld;
