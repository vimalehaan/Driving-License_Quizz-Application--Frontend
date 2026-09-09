import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext_Handle/Auth_Context';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>; // Display a loading message while checking authentication
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>;
};

export default ProtectedRoute;
