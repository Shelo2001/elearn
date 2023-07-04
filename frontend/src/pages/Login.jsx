import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FormControl,
    Input,
    AbsoluteCenter,
    Divider,
    Link,
    Button,
    Stack,
    Box,
} from "@chakra-ui/react";
import google from "../assets/google.png";
import InputLabel from "../components/InputLabel";
import { Link as ReachLink } from "react-router-dom";

const Login = () => {
    const [login, setLogin] = useState("");

    useEffect(() => {
        const googleLogin = async () => {
            const res = await axios.get(
                "http://localhost:8000/api/auth/google"
            );
            setLogin(res.data.url);
        };
        googleLogin();
    }, []);

    return (
        <div>
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    marginBottom: "30px",
                    fontWeight: "bold",
                }}
            >
                Sign in into your account
            </h2>
            <Box
                width="400px"
                p={4}
                boxShadow="lg"
                borderRadius="md"
                margin="0 auto"
            >
                <form>
                    <Stack spacing={4}>
                        <FormControl>
                            <InputLabel text="Email" />
                            <Input
                                type="email"
                                id="email"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel text="Password" />
                            <Input
                                type="password"
                                id="password"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            border="2px solid #a832a8"
                            borderRadius="0px"
                            bgColor="#a832a8"
                            color="white"
                            size="md"
                            _hover={{
                                border: "2px solid #7b247b",
                                bgColor: "#7b247b",
                            }}
                            colorScheme="teal"
                        >
                            Sign In
                        </Button>

                        <Button
                            colorScheme="red"
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="white"
                            color="black"
                            size="md"
                            _hover={{
                                background: "blackAlpha.100",
                            }}
                        >
                            <img src={google} width="40px" height="40px" />{" "}
                            <a href={`${login}`}>Continue with Google</a>
                        </Button>
                    </Stack>
                </form>
                <Box position="relative" padding="10">
                    <Divider />
                    <AbsoluteCenter bg="white" px="4">
                        Or
                    </AbsoluteCenter>
                </Box>
                <Box textAlign="center">
                    <p>
                        Don't have an account?{" "}
                        <Link as={ReachLink} to="/register">
                            <Link color="#a832a8">Sign Up</Link>
                        </Link>
                    </p>
                </Box>
            </Box>
        </div>
    );
};

export default Login;
