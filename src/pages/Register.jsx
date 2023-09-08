import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/register.css"
const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setloading } =
    useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setloading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
    setloading(false);
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="register">
      <form onSubmit={submitHandler} className="reg-form">
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
          className="reg-input"
        />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="reg-input"
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="reg-input"
        />
        <br />

        <button disabled={loading} type="submit" className="reg-bt">
          Sign Up
        </button>
        <h4>Or</h4>
        <Link to="/login" className="reg-link">Log In</Link>
      </form>
    </div>
  );
};

export default Register;
