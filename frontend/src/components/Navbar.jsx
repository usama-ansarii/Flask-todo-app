import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        TODO
      </div>

      <div className="navbar__buttons">
        {isLoggedIn && (
          <>
            <Link to="/add" className="nav-btn">
              Add Todo
            </Link>
            <Link to="/list" className="nav-btn">
              Todo List
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <button onClick={handleLogout} className="login-btn logout">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="login-btn">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
