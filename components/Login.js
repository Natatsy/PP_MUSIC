import React from "react";
import { API_URL } from "../utils/api";

const Login = ({ setToken }) => {
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/login`;
  };

  return (
    <div className="center">
      <h2>Login to Spotify</h2>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Login;
