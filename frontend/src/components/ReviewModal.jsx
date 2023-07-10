import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
} from "@chakra-ui/react";
import React from "react";
import CommentComponent from "./CommentComponent";

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
                            <CommentComponent
                                width={"100%"}
                                comment={com}
                                course={course}
                            />
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReviewModal;
