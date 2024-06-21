import React, { useContext, useState } from "react";
import api from "../api";
import axios from "axios";
import { UserProvider } from "../userContext/userContext";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const basicStyle = { display: "block", margin: "1rem" };
  const { user, setUser } = useContext(UserProvider);

  const location = useLocation();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  function onDetailsChnage(e) {
    const { value, name } = e.target;

    setUserCredentials((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const handleLogin = async () => {
    try {
      const response = await api.post("users/login", userCredentials);
      setUser(response.data.data.user);
      localStorage.setItem("token", response.data.data.accessToken);

      const from = location.state?.from?.pathname || "/";
  
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };

  function loginHandler() {
    handleLogin();
  }

  return (
    <div>
      <input
        name="username"
        style={basicStyle}
        type="text"
        placeholder="Enter username or email"
        onChange={onDetailsChnage}
        value={userCredentials.username}
      />
      <input
        name="password"
        style={basicStyle}
        type="password"
        placeholder="enter  password"
        onChange={onDetailsChnage}
        value={userCredentials.password}
      />
      <button style={basicStyle} onClick={loginHandler}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
