import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Api } from "../commonapi/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  //  Load user from localStorage on page refresh
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("userid : ", userId);
    
    

    if (userId) {
      Api.get(`/users/${userId}`)
        .then((res) => setCurrentUser(res.data))
        .catch((err) => {
          console.error("Failed to restore user on refresh", err);
        });
    }
  }, []);
  

  // Login logic
  const loginUser = async (email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const {
        data: [user],
      } = await axios.get(`http://localhost:3000/users?email=${cleanEmail}`);

      if (!user) {
        toast.error("User not found. Please register first.");
        return navigate("/register");
      }

      if (user.password !== password) {
        toast.error("Incorrect password");
        return;
      }

      localStorage.setItem("userId", user.id);
      setCurrentUser(user);
      toast.success("Login successful!");
      navigate("/");
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  // ✅ Registration logic
  const registerUser = async (formData) => {
    try {
      const { data: existingUsers } = await axios.get(
        `http://localhost:3000/users?email=${formData.email}`
      );

      if (existingUsers.length > 0) {
        toast.success("Email already registered. Please login.");
        navigate("/");
        return;
      }

      await axios.post("http://localhost:3000/users", formData);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error("Error registering user", err);
    }
  };

  // ✅ Logout logic
  const logoutUser = () => {
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
