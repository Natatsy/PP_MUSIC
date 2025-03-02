import React from "react";

const Header = ({ token, setToken }) => {
  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

  return (
    <header className="header">
      <h1>Spotify Search</h1>
      {token && <button onClick={logout}>Logout</button>}
    </header>
  );
};

export default Header;
