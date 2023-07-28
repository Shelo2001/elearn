import {
    Avatar,
    Box,
    Button,
    FormControl,
    Input,
    Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InputLabel from "../components/InputLabel";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <Box width={"80%"} margin={"auto"} gap="30px" display={"flex"}>
            <Box w={"50%"} mt={"50px"} h={"500px"}>
                <Avatar
                    name={user.name}
                    bgColor={"black"}
                    float={"right"}
                    w={"80px"}
                    h={"80px"}
                />
            </Box>
            <Box w={"50%"} mt={"50px"} h={"500px"}>
                <form onSubmit={submitHandler}>
                    <Stack spacing={4}>
                        <FormControl>
                            <InputLabel text="Full name" />
                            <Input
                                type="text"
                                value={name}
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
                                value={email}
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
                            Update profile
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
};

export default Profile;
