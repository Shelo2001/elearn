import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Link,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useCartStore } from "../services/cart";
import { Link as ReachLink } from "react-router-dom";
import nocart from "../assets/nocart.jpg";
import Rating from "../components/Rating";
import axios from "axios";

const Cart = () => {
    const { cartItems, removeFromCart } = useCartStore();

    const totalPrice = cartItems.reduce((sum, course) => sum + course.price, 0);

    useEffect(() => {
        const get = async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/sendmessage`
            );
            console.log(res);
        };
        get();
    }, []);

    return (
        <Box paddingX={"200px"} mt={"10"}>
            <Heading>Shopping Cart</Heading>

            <Text mt={"20px"} fontSize={"16px"} fontWeight={"bold"}>
                {cartItems.length == 1
                    ? `${cartItems.length} course in cart`
                    : `${cartItems.length} courses in cart`}
            </Text>
            {cartItems.length == 0 ? (
                <Box
                    width={"60%"}
                    height={"500px"}
                    margin={"auto"}
                    borderWidth={"1px"}
                    textAlign={"center"}
                >
                    <Image margin={"auto"} src={nocart} />
                    <Text marginY={"30px"}>
                        Your cart is empty. Keep shopping to find a course!
                    </Text>
                    <ReachLink to="/home">
                        <Button
                            border="2px solid #a435f0"
                            borderRadius="0px"
                            bgColor="#a435f0"
                            color="white"
                            size="md"
                            _hover={{
                                border: "2px solid #7325a3",
                                bgColor: "#7325a3",
                            }}
                        >
                            Keep shopping
                        </Button>
                    </ReachLink>
                </Box>
            ) : (
                <Box display="flex" justifyContent="space-between">
                    <Box
                        w="75%"
                        gap={"10px"}
                        margin={"20px 20px 0px 0px"}
                        p="4"
                    >
                        {cartItems.map((item) => (
                            <>
                                <Divider />
                                <Box
                                    borderRadius="md"
                                    p="4"
                                    width="100%"
                                    display="grid"
                                    gridTemplateColumns="repeat(4, 1fr)"
                                    gap="5"
                                >
                                    <Box gridColumn="1">
                                        <Image
                                            src={`${
                                                import.meta.env.VITE_IMG_URL
                                            }/${item.image}`}
                                            alt={item.title}
                                            objectFit="cover"
                                            h="100px"
                                            w="100%"
                                        />
                                    </Box>
                                    <Stack gridColumn="2" spacing="2">
                                        <ReachLink to={`/course/${item.id}`}>
                                            <Link>
                                                <Text
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                >
                                                    {item.title}
                                                </Text>
                                            </Link>
                                        </ReachLink>
                                        <Flex alignItems="center">
                                            <Text>by {item.user.name}</Text>

                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                                mx="1"
                                            >
                                                |
                                            </Text>
                                            <Text w={"220px"}>
                                                <Rating
                                                    value={
                                                        item.rating.reduce(
                                                            (sum, rating) =>
                                                                sum +
                                                                rating.rating,
                                                            0
                                                        ) / item.rating.length
                                                    }
                                                    text={`(${item.rating.length}) reviews`}
                                                    color={"#FDCC0D"}
                                                />
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Box gridColumn="3">
                                        <Button
                                            border="2px solid #a435f0"
                                            borderRadius="0px"
                                            bgColor="#a435f0"
                                            color="white"
                                            size="md"
                                            _hover={{
                                                border: "2px solid #7325a3",
                                                bgColor: "#7325a3",
                                            }}
                                            onClick={() => removeFromCart(item)}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                    <Box gridColumn="4">
                                        <Text fontSize="lg" fontWeight="bold">
                                            {item.price} $
                                        </Text>
                                    </Box>
                                </Box>
                            </>
                        ))}
                    </Box>
                    <Box
                        w="25%"
                        maxH={"200px"}
                        margin={"20px 0px 0px 0px"}
                        p="4"
                    >
                        <Text
                            fontSize={"20px"}
                            color={"gray.500"}
                            fontWeight={"bold"}
                        >
                            Total:
                        </Text>
                        <Text
                            fontSize={"30px"}
                            color={"black"}
                            fontWeight={"extrabold"}
                            paddingX={"3"}
                        >
                            {totalPrice} $
                        </Text>
                        <ReachLink to={"/checkout"}>
                            <Button
                                border="2px solid #a435f0"
                                borderRadius="0px"
                                bgColor="#a435f0"
                                color="white"
                                width={"100%"}
                                size="md"
                                marginY={"10px"}
                                _hover={{
                                    border: "2px solid #7325a3",
                                    bgColor: "#7325a3",
                                }}
                            >
                                Checkout
                            </Button>
                        </ReachLink>
                        <Divider />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Cart;
