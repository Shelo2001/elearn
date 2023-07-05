import { Badge, Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useCartStore } from "../services/cart";

const PopoverCourse = ({ course }) => {
    const { addToCart, cartItems } = useCartStore();

    console.log(cartItems);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Box>
            <Text fontWeight="bolder" fontSize={"22px"}>
                {course.title}
            </Text>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <Badge colorScheme="purple">{course.category}</Badge>
                <Text color="green.600">
                    Created {formatDate(course.created_at)}
                </Text>
            </Box>
            <Text fontSize={"15px"} color="gray.500">
                {course.duration_minutes} minutes
            </Text>

            <Text fontSize={"18px"} marginTop={"10px"} marginBottom={"10px"}>
                {course.description}
            </Text>

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
            >
                Add to cart
            </Button>
        </Box>
    );
};

export default PopoverCourse;
