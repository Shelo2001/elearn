import React, { useEffect } from "react";
import { useCourses } from "../services/courses";
import { Box } from "@chakra-ui/react";
import CourseCard from "./CourseCard";

const MyCreatedCourses = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { getMyCreatedCourses, courses } = useCourses();

    useEffect(() => {
        getMyCreatedCourses(user.id);
    }, []);

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap="10px"
                width={"80%"}
                margin={"auto"}
                my={"20px"}
            >
                {courses.map((course) => (
                    <CourseCard course={course} />
                ))}
            </Box>
        </>
    );
};

export default MyCreatedCourses;
