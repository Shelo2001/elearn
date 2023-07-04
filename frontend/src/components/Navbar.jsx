import React from "react";
import { Box, Flex, Button, IconButton } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo-udemy.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Box bg="white" py={4} px={8} color="gray.900" width="100%">
            <Flex align="center" justify="space-between">
                <Box>
                    <Link to="/">
                        <img src={logo} width="100px" height="100px" />
                    </Link>
                </Box>

                <Box>
                    <IconButton
                        icon={<FaShoppingCart />}
                        aria-label="Cart"
                        variant="ghost"
                        colorScheme="gray"
                        _hover={{
                            background: "white",
                            color: "#a832a8",
                        }}
                        mr={4}
                    />
                    <Link to="/login">
                        <Button
                            colorScheme="blackAlpha"
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="white"
                            color="black"
                            size="md"
                            _hover={{
                                background: "blackAlpha.100",
                            }}
                            mr={2}
                        >
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button
                            colorScheme="blackAlpha"
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="black"
                            color="white"
                            _hover={{
                                background: "blackAlpha.900",
                            }}
                            size="md"
                        >
                            Register
                        </Button>
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;
