import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Button,
    Avatar,
    Menu,
    MenuGroup,
    MenuButton,
    MenuList,
    MenuDivider,
    MenuItemOption,
} from "@chakra-ui/react";
import logo from "../assets/logo-udemy.svg";
import { Link } from "react-router-dom";
import CartComponent from "./CartComponent";
import { useAuthentication } from "../services/authentication";
import Notifications from "./Notifications";
import { useCartStore } from "../services/cart";

const Navbar = () => {
    const [user, setUser] = useState(null);

    const { logout } = useAuthentication();
    const { cartItems } = useCartStore();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [setUser]);

    return (
        <Box
            bg="white"
            py={4}
            px={8}
            color="gray.900"
            width="100%"
            boxShadow="lg"
            zIndex="10000"
        >
            <Flex align="center" justify="space-between">
                <Box>
                    <Link to="/">
                        <img src={logo} width="100px" height="100px" />
                    </Link>
                </Box>

                <Box>
                    <CartComponent />
                    {user?.name ? (
                        <>
                            <Notifications />
                            <Menu>
                                <MenuButton>
                                    <Avatar
                                        size="sm"
                                        bg="black"
                                        color="white"
                                        name={user.name}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title="MANAGE PROFILE">
                                        <Link to="/mylearning">
                                            <MenuItemOption>
                                                My Learning
                                            </MenuItemOption>
                                        </Link>
                                        <Link to="/cart">
                                            <MenuItemOption>
                                                My Cart
                                            </MenuItemOption>
                                        </Link>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <Link to="/create">
                                        <MenuItemOption>
                                            Create Course
                                        </MenuItemOption>
                                    </Link>
                                    <MenuDivider />
                                    <Link to="/profile">
                                        <MenuItemOption>Profile</MenuItemOption>
                                    </Link>
                                    <MenuDivider />

                                    <MenuItemOption onClick={() => logout()}>
                                        Log Out
                                    </MenuItemOption>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;
