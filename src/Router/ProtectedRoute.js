import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, influencerOnly }) {
    const user = sessionStorage.getItem('user');
    const role = sessionStorage.getItem('role');

    if (influencerOnly === true) {
        return user !== undefined && user !== null && user !== 'null' && role === 'influencer' ? element : <Navigate to={'/login'} replace />;
    }

    return user !== undefined && user !== null && user !== 'null' ? element : <Navigate to={'/login'} replace />;
}