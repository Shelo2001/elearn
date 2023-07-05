import React, { useState } from "react";
import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Popover,
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    PopoverTrigger,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PopoverCourse from "./PopoverCourse";
import Rating from "./Rating";

const CourseCard = ({ course }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handlePopoverOpen = () => {
        setIsPopoverOpen(true);
    };

    const handlePopoverClose = () => {
        setIsPopoverOpen(false);
    };

    const handleContainerMouseLeave = () => {
        setIsPopoverOpen(false);
    };

    const totalRating = (
        course.rating.reduce((sum, rating) => sum + rating.rating, 0) /
        course.rating.length
    ).toFixed(1);

    return (
        <div
            onMouseLeave={handleContainerMouseLeave}
            onMouseEnter={handlePopoverOpen}
            style={{ position: "relative" }}
        >
            <Popover
                placement="right-start"
                isOpen={isPopoverOpen}
                onOpen={handlePopoverOpen}
                onClose={handlePopoverClose}
            >
                <Link to={`/course/${course.id}`}>
                    <PopoverTrigger>
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
                                        value={totalRating}
                                        text={
                                            totalRating === "NaN"
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
                    </PopoverTrigger>
                </Link>
                <Portal>
                    {isPopoverOpen && (
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <PopoverCourse course={course} />
                            </PopoverBody>
                        </PopoverContent>
                    )}
                </Portal>
            </Popover>
        </div>
    );
};

export default CourseCard;
