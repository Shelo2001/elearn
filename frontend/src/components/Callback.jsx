import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthentication } from "../services/authentication";

const GoogleCallback = () => {
    const location = useLocation();
    const { googleAuthentication, user } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        googleAuthentication(location.search);
    }, []);

    useEffect(() => {
        if (user.name) {
            navigate("/");
        }
    }, [user]);

    return <div>{user.name && <p>{user.name}</p>}</div>;
};

export default GoogleCallback;
