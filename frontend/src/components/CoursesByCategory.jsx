import axios from "axios";
import React, { useEffect } from "react";
import { useCourses } from "../services/courses";
import { Stack, Skeleton, Box, Alert, AlertIcon } from "@chakra-ui/react";
import CourseCard from "./CourseCard";

const CoursesByCategory = ({ url }) => {
    const { getCourseByCategory, courses, loading } = useCourses();

    useEffect(() => {
        getCourseByCategory(url);
    }, []);

    return (
        <div>
            {loading ? (
                <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap="30px"
                >
                    {courses.length == 0 ? (
                        <Alert status="info">
                            <AlertIcon />
                            There is no courses yet!
                        </Alert>
                    ) : (
                        courses?.map((course) => <CourseCard course={course} />)
                    )}
                </Box>
            )}
        </div>
    );
};

export default CoursesByCategory;
