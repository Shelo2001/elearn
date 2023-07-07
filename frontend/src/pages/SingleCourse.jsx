import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useCourses } from "../services/courses";
import ReviewComponent from "../components/ReviewComponent";
import { Avatar, Box, Divider, Text, useDisclosure } from "@chakra-ui/react";
import ReviewModal from "../components/ReviewModal";
import Rating from "../components/Rating";

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
                    <Box marginY={"10px"} maxH={"200px"} w={"50%"}>
                        <Divider />
                        <Box mt={"10px"} display={"flex"} gap={"20px"}>
                            <Avatar
                                name={com.user.name}
                                color={"white"}
                                bg={"black"}
                            />
                            <Box display={"flex"} flexDirection={"column"}>
                                <Text fontWeight={"bold"} fontSize={"20px"}>
                                    {com.user.name}
                                </Text>
                                <Rating
                                    value={
                                        course.rating.find(
                                            (rating) =>
                                                rating.user_id === com.user.id
                                        )?.rating || 0
                                    }
                                    text={`(${
                                        course.rating.find(
                                            (rating) =>
                                                rating.user_id === com.user.id
                                        )?.rating || 0
                                    })`}
                                    color={"#FDCC0D"}
                                />
                            </Box>
                        </Box>

                        <Box m={"20px"}>{com.comment.substring(0, 300)}</Box>
                    </Box>
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
