import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    Box,
    Divider,
    Avatar,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Rating from "./Rating";

const ReviewModal = ({ isOpen, onClose, onOpen, course }) => {
    return (
        <>
            <Button
                mx={"30px"}
                colorScheme="blackAlpha"
                border="2px solid black"
                borderRadius="0px"
                bgColor="white"
                width={"50%"}
                color="black"
                size="md"
                _hover={{
                    background: "blackAlpha.100",
                }}
                mr={2}
                onClick={onOpen}
            >
                Show all reviews
            </Button>
            <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>All comments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {course?.comment?.map((com) => (
                            <Box marginY={"10px"} maxH={"200px"}>
                                <Divider />
                                <Box mt={"10px"} display={"flex"} gap={"20px"}>
                                    <Avatar
                                        name={com.user.name}
                                        color={"white"}
                                        bg={"black"}
                                    />
                                    <Box
                                        display={"flex"}
                                        flexDirection={"column"}
                                    >
                                        <Text
                                            fontWeight={"bold"}
                                            fontSize={"20px"}
                                        >
                                            {com.user.name}
                                        </Text>
                                        <Rating
                                            value={
                                                course.rating.find(
                                                    (rating) =>
                                                        rating.user_id ===
                                                        com.user.id
                                                )?.rating || 0
                                            }
                                            text={`(${
                                                course.rating.find(
                                                    (rating) =>
                                                        rating.user_id ===
                                                        com.user.id
                                                )?.rating || 0
                                            })`}
                                            color={"#FDCC0D"}
                                        />
                                    </Box>
                                </Box>

                                <Box m={"20px"}>
                                    {com.comment.substring(0, 300)}
                                </Box>
                            </Box>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReviewModal;
