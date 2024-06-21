import { Route, Routes, BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { useContext, useEffect, useState } from "react";
import { UserProvider } from "./userContext/userContext";
import api from "./api";
import AuthRequires from "./components/AuthRequires";
import Home from "./pages/Home";

function App() {
  const { user, setUser } = useContext(UserProvider);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const getCurrentUser = async () => {
      try {
        const response = await api.post("users/current-user");
        setUser(response.data.data.currentuser);
      } catch (error) {
        console.error("Failed to fetch current user:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <AuthRequires>
            <Home />
          </AuthRequires>
        }
      />
    </Routes>
  );
}

export default App;
