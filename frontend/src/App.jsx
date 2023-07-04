import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import Callback from "./Callback";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GoogleAuth />} />
                <Route path="/auth/google" element={<Callback />} />
            </Routes>
        </Router>
    );
};

export default App;
