import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setloading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
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
      setloading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />
        <button disabled={loading} type="submit">
          Login
        </button>
        <h4>Or</h4>
        <Link to="/register">Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
