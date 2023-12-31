import React from "react";
import { Navigate } from "react-router-dom";

export default function AnonymousRoute({ element }) {
    const user = sessionStorage.getItem('user');

    return user === undefined || user === null || user === 'null' ? element : <Navigate to={'/profile'} replace />;
}