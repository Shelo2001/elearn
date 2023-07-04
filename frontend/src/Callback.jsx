import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Callback = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const location = useLocation();

    useEffect(() => {
        const callback = async () => {
            const res = await axios.get(
                `http://localhost:8000/api/auth/google/callback${location.search}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            console.log(res);
            setLoading(false);
            setData(res.data);
        };

        callback();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    } else {
        return (
            <div>
                <div>
                    <samp>{JSON.stringify(data, null, 2)}</samp>
                </div>
            </div>
        );
    }
};

export default Callback;
