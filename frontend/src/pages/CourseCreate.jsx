import React, { useEffect, useState } from "react";
import {
    FormControl,
    Input,
    Button,
    Stack,
    Box,
    Textarea,
    FormLabel,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import InputLabel from "../components/InputLabel";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../services/courses";
import MyCreatedCourses from "../components/MyCreatedCourses";

const CourseCreate = () => {
    const navigate = useNavigate();

    const { createCourse, success } = useCourses();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration_minutes, setDuration_minutes] = useState(0);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState();

    const changeHandler = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = (file) => {
            console.log(file);
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let data = {
            title,
            description,
            duration_minutes,
            price,
            category,
            image,
            user_id: JSON.parse(localStorage.getItem("user")).id,
        };

        createCourse(data);
    };

    return (
        <>
            <Box
                width="400px"
                p={4}
                boxShadow="lg"
                borderRadius="md"
                margin="0 auto"
            >
                <h2
                    style={{
                        textAlign: "center",
                        fontSize: "30px",
                        marginBottom: "30px",
                        marginTop: "30px",
                        fontWeight: "bold",
                    }}
                >
                    Create new course
                </h2>
                {success && (
                    <Alert
                        marginBottom={"20px"}
                        status="success"
                        variant="solid"
                    >
                        <AlertIcon />
                        {success}
                    </Alert>
                )}
                <form onSubmit={submitHandler}>
                    <Stack spacing={4}>
                        <FormControl>
                            <InputLabel text="Title" />
                            <Input
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                id="title"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                id="description"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel text="Duration" />
                            <Input
                                type="text"
                                onChange={(e) =>
                                    setDuration_minutes(e.target.value)
                                }
                                id="duration"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <FormControl>
                            <InputLabel text="Price" />
                            <Input
                                type="text"
                                onChange={(e) => setPrice(e.target.value)}
                                id="price"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel text="Category" />
                            <Input
                                type="text"
                                onChange={(e) => setCategory(e.target.value)}
                                id="category"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type="file"
                                onChange={changeHandler}
                                id="image"
                                accept="image"
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="black"
                            color="white"
                            size="md"
                            _hover={{
                                border: "2px solid #a832a8",
                                bgColor: "#a832a8",
                            }}
                        >
                            Create course
                        </Button>
                    </Stack>
                </form>
            </Box>

            <MyCreatedCourses />
        </>
    );
};

export default CourseCreate;
