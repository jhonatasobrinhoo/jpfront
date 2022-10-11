import {useAuth} from "../contexts/auth/AuthContext";
import {Navigate} from "react-router";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};