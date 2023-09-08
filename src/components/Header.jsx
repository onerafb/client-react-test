import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/header.css";
const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setloading } =
    useContext(Context);
  const logoutHandler = async () => {
    setloading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logout successfull");
      setIsAuthenticated(false);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setloading(false);
    }
  };
  return (
    <div>
      <nav className="header">
        <ul className="header-ul">
          <Link to={"/"} className="header-li">
            Home
          </Link>
          <Link to={"/profile"} className="header-li">
            Profile
          </Link>
          {isAuthenticated ? (
            <button
              disabled={loading}
              onClick={logoutHandler}
              className="header-bt"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="header-li">
              Login
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
