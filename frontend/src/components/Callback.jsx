import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthentication } from "../services/authentication";

const GoogleCallback = () => {
    const location = useLocation();
    const { googleAuthentication, user } = useAuthentication();

    useEffect(() => {
        googleAuthentication(location.search);
    }, []);

    return <div></div>;
};

export default GoogleCallback;
