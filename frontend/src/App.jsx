import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import GoogleCallback from "./components/Callback";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CourseCreate from "./pages/CourseCreate";
import SingleCourse from "./pages/SingleCourse";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import MyLearning from "./pages/MyLearning";
import Profile from "./pages/Profile";
import CourseFileUpload from "./pages/CourseFileUpload";

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
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/create",
                element: <CourseCreate />,
            },
            {
                path: "/course/:id",
                element: <SingleCourse />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/mylearning",
                element: <MyLearning />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/course/upload/:id",
                element: <CourseFileUpload />,
            },
        ],
    },
]);

export default router;
