import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedResetPasswordRoute = ({ children }) => {
    const forgotPasswordVisited = useSelector(state => state.register.forgotPasswordVisited);

    if (!forgotPasswordVisited) {
        return <Navigate to="/forgot-password" replace />;
    }

    return children;
};

export default ProtectedResetPasswordRoute;
