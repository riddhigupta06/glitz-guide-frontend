import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import RouterErrorPage from './Router/RouterErrorPage';
import reportWebVitals from './reportWebVitals';
import Root from './Router/Root';
import Search from './Search';
import Details from './Details';
import Auth from './Auth';
import Profile from './Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RouterErrorPage />,
    children: [
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Auth />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/:userID",
        element: <div>Public Profile</div>,
      },
      {
        path: "details/:detailID",
        element: <Details />,
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
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
