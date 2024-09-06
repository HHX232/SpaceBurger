import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC } from 'react';

interface IProtectedResetPasswordRoute {
    children: React.ReactNode; 
}
interface IProtecredState {
    register: {
        forgotPasswordVisited: boolean;
    };
}
const ProtectedResetPasswordRoute: FC<IProtectedResetPasswordRoute> = ({ children }) => {

    const forgotPasswordVisited = useSelector((state: IProtecredState) => state.register.forgotPasswordVisited);
    if (!forgotPasswordVisited) {
        return <Navigate to="/forgot-password" replace />;
    }

    return <>{children}</>;
};

export default ProtectedResetPasswordRoute;
