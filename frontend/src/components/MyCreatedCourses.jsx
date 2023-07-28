import React, { useEffect } from "react";
import { useCourses } from "../services/courses";
import {
    Box,
    Card,
    CardBody,
    Heading,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const MyCreatedCourses = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { getMyCreatedCourses, courses } = useCourses();

    useEffect(() => {
        getMyCreatedCourses(user.id);
    }, []);

    return (
        <>
            <Heading mx={"30px"} my={"20px"}>
                My created courses
            </Heading>
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
                    <Link to={`/course/upload/${course.id}`}>
                        <Card
                            cursor="pointer"
                            height="380px"
                            w="sm"
                            borderRadius={"0px"}
                        >
                            <CardBody height="100px">
                                <Image
                                    src={`${import.meta.env.VITE_IMG_URL}/${
                                        course.image
                                    }`}
                                    alt={`${course.title}`}
                                    minHeight={"150px"}
                                    maxHeight={"150px"}
                                    objectFit={"cover"}
                                    borderRadius={"0px"}
                                    width={"350px"}
                                />
                                <Stack mt="6" spacing="3">
                                    <Heading size="md">{course.title}</Heading>
                                    <Text fontSize={"16px"} color={"gray.500"}>
                                        {course.user.name}
                                    </Text>
                                    <Rating
                                        value={
                                            course.rating.reduce(
                                                (sum, rating) =>
                                                    sum + rating.rating,
                                                0
                                            ) / course.rating.length
                                        }
                                        text={
                                            course.rating.reduce(
                                                (sum, rating) =>
                                                    sum + rating.rating,
                                                0
                                            ) /
                                                course.rating.length ===
                                            "NaN"
                                                ? `(0) review`
                                                : `(${course.rating.length}) reviews`
                                        }
                                        color={"#FDCC0D"}
                                    />
                                    <Text
                                        color="blackAlpha"
                                        fontWeight="bolder"
                                        fontSize="2xl"
                                    >
                                        ${course.price}
                                    </Text>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </Box>
        </>
    );
};

export default MyCreatedCourses;
