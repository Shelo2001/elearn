import React, { useEffect } from "react";
import { Alert, Box, Heading, useDisclosure } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCourses } from "../services/courses";
import ReviewComponent from "../components/ReviewComponent";
import VideoList from "../components/VideoList";
import ReviewModal from "../components/ReviewModal";
import CommentComponent from "../components/CommentComponent";

const SingleCourse = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getCourseById, course, getMyOrderedCourses, myOrderedCourses } =
        useCourses();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getCourseById(id);
        getMyOrderedCourses(user?.id);
    }, []);

    const hasOrderedCourse = () => {
        return myOrderedCourses.some((order) => order.course_id == id);
    };

    console.log(course);

    return (
        <div>
            {hasOrderedCourse() ? (
                <VideoList
                    width={"500px"}
                    height={"360px"}
                    container={"500px"}
                    videos={course.videos}
                />
            ) : (
                <>
                    <Heading ml={"40px"}>Content</Heading>
                    {course?.videos?.map((v, index) => (
                        <Heading
                            mb={"5px"}
                            fontWeight={"medium"}
                            ml={"60px"}
                            fontSize={"24px"}
                        >
                            {index + 1}. {v.title}
                        </Heading>
                    ))}
                    <Alert w={"50%"} ml={"20px"}>
                        You have to buy this course to access content.
                    </Alert>
                </>
            )}
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
