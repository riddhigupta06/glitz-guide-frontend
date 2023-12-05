import React from "react";
import { Navigate } from "react-router-dom";

export default function AnonymousRoute({ element }) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log('anon',user)
    return user === undefined || user === null || user === 'null' ? element : <Navigate to={'/profile'} replace />;
}