import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import GoogleCallback from "./components/Callback";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/auth/google",
                element: <GoogleCallback />,
            },
        ],
    },
]);

export default router;
