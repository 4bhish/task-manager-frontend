import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"; 
import { UserProvider } from "../userContext/userContext";

function AuthRequires({ children }) {
  const { user } = useContext(UserProvider);
  const location = useLocation();

  return user ? children : <Navigate to={'/login'} state={{ from: location }} />;
}

export default AuthRequires;
