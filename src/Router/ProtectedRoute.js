import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ element, influencerOnly }) {
    const user = sessionStorage.getItem('user');
    const role = sessionStorage.getItem('role');
    const navigate = useNavigate();

    if (influencerOnly === true) {
        if (user === undefined || user === null || user === 'null') {
            navigate('/login')
        }
        return user !== undefined && user !== null && user !== 'null' && role === 'influencer' ? element : <Navigate to={'/profile'} replace />;
    }

    return user !== undefined && user !== null && user !== 'null' ? element : <Navigate to={'/login'} replace />;
}