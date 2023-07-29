import React, { useEffect } from "react";
import {
    Alert,
    Box,
    Button,
    Heading,
    Image,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCourses } from "../services/courses";
import ReviewComponent from "../components/ReviewComponent";
import VideoList from "../components/VideoList";
import ReviewModal from "../components/ReviewModal";
import CommentComponent from "../components/CommentComponent";
import { useCartStore } from "../services/cart";

const SingleCourse = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getCourseById, course, getMyOrderedCourses, myOrderedCourses } =
        useCourses();
    const { addToCart } = useCartStore();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getCourseById(id);
        getMyOrderedCourses(user?.id);
    }, []);

    const hasOrderedCourse = () => {
        return myOrderedCourses.some((order) => order.course_id == id);
    };

    return (
        <div>
            <Box
                w={"18%"}
                boxShadow="lg"
                float={"right"}
                mr={"200px"}
                my={"100px"}
            >
                <Image
                    src={`${import.meta.env.VITE_IMG_URL}/${course?.image}`}
                />
                <Text ml={"2px"} fontWeight={"bold"} fontSize={"18px"}>
                    {course?.title}
                </Text>
                <Text ml={"10px"} fontSize={"14px"}>
                    {course?.description}
                </Text>
                <Text
                    ml={"2px"}
                    my="10px"
                    fontWeight={"bolder"}
                    fontSize={"22px"}
                >
                    ${course?.price}
                </Text>
                {hasOrderedCourse() ? (
                    <Button
                        isDisabled={true}
                        border="2px solid #a435f0"
                        borderRadius="0px"
                        bgColor="#a435f0"
                        width={"100%"}
                        color="white"
                        size="md"
                        _hover={{
                            border: "2px solid #7325a3",
                            bgColor: "#7325a3",
                        }}
                        mb={"10px"}
                        my={"2px"}
                    >
                        Already bought
                    </Button>
                ) : (
                    <Button
                        onClick={() => addToCart(course)}
                        border="2px solid #a435f0"
                        borderRadius="0px"
                        bgColor="#a435f0"
                        width={"100%"}
                        color="white"
                        size="md"
                        _hover={{
                            border: "2px solid #7325a3",
                            bgColor: "#7325a3",
                        }}
                        mb={"10px"}
                        my={"2px"}
                    >
                        Add to cart
                    </Button>
                )}
            </Box>
            {hasOrderedCourse() ? (
                <>
                    <Heading ml={"40px"}>Content</Heading>
                    <VideoList
                        width={"500px"}
                        height={"360px"}
                        container={"500px"}
                        videos={course?.videos}
                    />
                </>
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
