import React, { useEffect } from "react";
import { useCourses } from "../services/courses";

const MyCreatedCourses = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { getMyCreatedCourses } = useCourses();

    useEffect(() => {
        getMyCreatedCourses(user.id);
    }, []);

    return <div>MyCreatedCourses</div>;
};

export default MyCreatedCourses;
