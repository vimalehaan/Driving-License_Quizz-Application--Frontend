import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New state to manage loading
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token in useEffect:", token);
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.userRole);
      setUserId(decodedToken.userId);
      

    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after the check
  }, []);

  const login = (token) => {
    console.log("Logging in with token:", token);
    setIsAuthenticated(true);
    const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.userId);
      setUserId(decodedToken.userRole);
      postActivityLog(decodedToken.userId, 'User logged in');

  };

  const logout = () => {
    console.log("Logging out");
    localStorage.remove('token');
    setIsAuthenticated(false);
    setUserRole(null);
    postActivityLog(userId, 'User logged out');

  };

  const postActivityLog = async (userId, action) => {
    try {
      const response = await axios.post('http://localhost:3000/api/activityLogs/logs', {
        userId,
        action,
        loginTime: action === 'User logged in' ? new Date() : null,
        logoutTime: action === 'User logged out' ? new Date() : null,
      });
      console.log('Activity log created:', response.data);
    } catch (error) {
      console.error('Error creating activity log:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, loading, userRole, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

