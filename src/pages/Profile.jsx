import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Profile = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setloading, User } =
    useContext(Context);
  if (!isAuthenticated) {
    <Navigate to={"/login"} />;
    toast.error("login first");
  }
  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{User?.name}</h1>
      <p>{User?.email}</p>
    </div>
  );
};

export default Profile;
