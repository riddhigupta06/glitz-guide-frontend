import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AnonymousRoute({ element }) {
    const user = sessionStorage.getItem('user');
    const navigate = useNavigate()

    return user === undefined || user === null || user === 'null' ? element : <Navigate to={'/profile'} replace />;
}