import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleAuth = () => {
    const [login, setLogin] = useState("");

    useEffect(() => {
        const googleLogin = async () => {
            const res = await axios.get(
                "http://localhost:8000/api/auth/google"
            );
            setLogin(res.data.url);
        };
        googleLogin();
    }, []);

    return (
        <div>
            <a href={`${login}`}>Login with google</a>
        </div>
    );
};

export default GoogleAuth;
