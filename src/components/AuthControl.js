import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/Context';
import { Navigate } from 'react-router-dom';

const AuthControl = ({ children }) => {
    const [auth, setAuth] = useContext(AuthContext);
    
    useEffect(() => {
        console.log(auth.authenticated)
    }, [])
    console.log(auth.userId)
    return auth.authenticated
        ? children
        : <Navigate to="/login" replace />;
}

export default AuthControl
