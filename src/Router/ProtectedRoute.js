import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log('protected', user)
    return user !== undefined && user !== null && user !== 'null' ? element : <Navigate to={'/login'} replace />;
}