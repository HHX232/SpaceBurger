import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie, checkAndUpdateAccessToken } from "../../services/actions/register-action";
import preloader from '../../images/preloader.svg'
const UnprotectedRouteElement = ({ children }) => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const refreshToken = getCookie('refreshToken');
    const accessToken = getCookie('accessToken');

    useEffect(() => {
        const verifyTokens = async () => {
            if (refreshToken && !accessToken) {
                try {
                    await checkAndUpdateAccessToken();
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Ошибка при обновлении accessToken:", error);
                    setIsAuthenticated(false);
                }
            } else if (refreshToken && accessToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setIsChecking(false);
        };

        verifyTokens();
    }, [refreshToken, accessToken]);

    if (isChecking) {
        return <img src={preloader} alt="Loading..." />; 
    }

    
    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

   
    return children;
};

export default UnprotectedRouteElement;
