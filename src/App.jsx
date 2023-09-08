import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context, server } from "./main";
import axios from "axios";

const App = () => {
  const {setUser,setIsAuthenticated,setloading}=useContext(Context);
  useEffect(()=>{
    setloading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    })
    .then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
    setloading(false);
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
    setloading(false);
    })
  },[]);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
