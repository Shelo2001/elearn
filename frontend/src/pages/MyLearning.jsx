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
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const MyLearning = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { getMyLearning, myLearning } = useCourses();

    useEffect(() => {
        getMyLearning(user.id);
    }, []);

    return (
        <>
            <Heading mx={"30px"} my={"20px"}>
                My ordered courses
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
                {myLearning?.map((course) => (
                    <Link to={`/course/${course.course_id}`}>
                        <Card
                            cursor="pointer"
                            height="380px"
                            w="sm"
                            borderRadius={"0px"}
                        >
                            <CardBody height="100px">
                                <Image
                                    src={`${import.meta.env.VITE_IMG_URL}/${
                                        course.course.image
                                    }`}
                                    alt={`${course?.course.title}`}
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
                                    <Text
                                        color="blackAlpha"
                                        fontWeight="bolder"
                                        fontSize="2xl"
                                    >
                                        ${course.course.price}
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

export default MyLearning;
