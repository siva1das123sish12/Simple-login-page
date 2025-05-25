import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import HelloWorld from "./HelloWorld";
import "./styles.css";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get("/api/checkAuth", { withCredentials: true })
      .then(res => setLoggedIn(res.data.loggedIn));
  }, []);

  return loggedIn ? <HelloWorld setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />;
}

export default App;
