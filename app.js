import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);

  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/search" /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/search"
          element={token ? <Search /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
