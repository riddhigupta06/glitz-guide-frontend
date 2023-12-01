import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import RouterErrorPage from './Router/RouterErrorPage';
import reportWebVitals from './reportWebVitals';
import Root from './Router/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RouterErrorPage />,
    children: [
      {
        path: "/search",
        element: <div>Search</div>,
      },
      {
        path: "login",
        element: <div>Login</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
      {
        path: "profile/:userID",
        element: <div>Public Profile</div>,
      },
      {
        path: "details/:detailID",
        element: <div>Details</div>,
      },
      {
        path: "blog",
        element: <div>Blog posts</div>,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
