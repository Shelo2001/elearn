import React, { useState } from "react";
import {
    FormControl,
    Input,
    Button,
    Stack,
    Box,
    Textarea,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import InputLabel from "./InputLabel";

const NewVideo = ({ id, onClose, onOpen, isOpen }) => {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
    };

    console.log(selectedFile);

    return (
        <>
            <Button
                mx={"30px"}
                mt={"20px"}
                colorScheme="blackAlpha"
                border="2px solid black"
                borderRadius="0px"
                bgColor="black"
                color="white"
                _hover={{
                    background: "blackAlpha.900",
                }}
                size="md"
                mr={2}
                onClick={onOpen}
            >
                Upload new video
            </Button>
            <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload new video</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            width="400px"
                            p={4}
                            borderRadius="md"
                            margin="0 auto"
                        >
                            <form onSubmit={handleUpload}>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <InputLabel text="Title" />
                                        <Input
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            type="text"
                                            id="title"
                                            focusBorderColor="black"
                                            border="1px solid black"
                                            borderRadius="0"
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <Input
                                            onChange={handleFileChange}
                                            type="file"
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
                                        Upload video
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewVideo;
