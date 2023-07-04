import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </ChakraProvider>
);
