import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
    const isLoggedIn = !!localStorage.getItem('user'); // or based on session check
    return isLoggedIn ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
