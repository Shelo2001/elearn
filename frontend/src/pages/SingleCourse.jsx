import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Text, useDisclosure } from "@chakra-ui/react";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { useCourses } from "../services/courses";
import ReviewComponent from "../components/ReviewComponent";
import ReviewModal from "../components/ReviewModal";
import CommentComponent from "../components/CommentComponent";

const SingleCourse = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getCourseById, course } = useCourses();

    console.log(course);

    useEffect(() => {
        getCourseById(id);
    }, []);

    return (
        <div>
            <Box mx={"30px"} w={"50%"} display={"flex"} gap={"10px"}>
                {course?.comment?.slice(0, 2).map((com) => (
                    <CommentComponent
                        width={"50%"}
                        comment={com}
                        course={course}
                    />
                ))}
            </Box>
            {course?.comment?.length != 0 && (
                <ReviewModal
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    course={course}
                />
            )}
            <ReviewComponent course={course} />
        </div>
    );
};

export default SingleCourse;
