import React, { useEffect, useState } from "react";
import {
    FormControl,
    Divider,
    AbsoluteCenter,
    Link,
    Input,
    Button,
    Stack,
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
} from "@chakra-ui/react";
import google from "../assets/google.png";
import InputLabel from "../components/InputLabel";
import { Link as ReachLink } from "react-router-dom";
import { useAuthentication } from "../services/authentication";

const Register = () => {
    const { getGoogleAuthUrl, googleUrl, register, errorUser } =
        useAuthentication();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getGoogleAuthUrl();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        register({ name, email, password });
    };

    return (
        <div>
            <h2
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    marginBottom: "30px",
                    marginTop: "30px",
                    fontWeight: "bold",
                }}
            >
                Sign up your account
            </h2>
            <Box
                width="400px"
                p={4}
                boxShadow="lg"
                borderRadius="md"
                margin="0 auto"
            >
                {errorUser && (
                    <Alert mb={"10px"} status="error">
                        <AlertIcon />
                        <AlertTitle>{errorUser}</AlertTitle>
                    </Alert>
                )}
                <form onSubmit={submitHandler}>
                    <Stack spacing={4}>
                        <FormControl>
                            <InputLabel text="Full name" />
                            <Input
                                type="text"
                                id="fullname"
                                onChange={(e) => setName(e.target.value)}
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel text="Email" />
                            <Input
                                type="email"
                                id="email"
                                focusBorderColor="black"
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <Button
                            type="submit"
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
                            Sign Up
                        </Button>

                        <Button
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="black"
                            color="white"
                            size="md"
                            _hover={{
                                background: "blackAlpha.800",
                            }}
                        >
                            <img src={google} width="40px" height="40px" />{" "}
                            <a href={`${googleUrl}`}>Continue with Google</a>
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
                        Allready have an account?{" "}
                        <Link as={ReachLink} to="/login">
                            <Link color="#a435f0">Sign In</Link>
                        </Link>
                    </p>
                </Box>
            </Box>
        </div>
    );
};

export default Register;
