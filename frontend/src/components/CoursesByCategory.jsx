import axios from "axios";
import React, { useEffect } from "react";

const CoursesByCategory = ({ url }) => {
    useEffect(() => {
        const getCourses = async () => {
            const res = axios.get(`${import.meta.env.VITE_BASE_URL}/${url}`);

            console.log(res);
        };

        getCourses();
    }, []);

    return <div>CoursesByCategory {url}</div>;
};

export default CoursesByCategory;
