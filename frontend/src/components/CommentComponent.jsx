import React from "react";
import { Avatar, Box, Divider, Text, useDisclosure } from "@chakra-ui/react";
import Rating from "../components/Rating";

const CommentComponent = ({ comment, course, width }) => {
    return (
        <Box marginY={"10px"} maxH={"200px"} w={width}>
            <Divider />
            <Box mt={"10px"} display={"flex"} gap={"20px"}>
                <Avatar name={comment.user.name} color={"white"} bg={"black"} />
                <Box display={"flex"} flexDirection={"column"}>
                    <Text fontWeight={"bold"} fontSize={"20px"}>
                        {comment.user.name}
                    </Text>
                    <Rating
                        value={
                            course.rating.find(
                                (rating) => rating.user_id === comment.user.id
                            )?.rating || 0
                        }
                        text={`(${
                            course.rating.find(
                                (rating) => rating.user_id === comment.user.id
                            )?.rating || 0
                        })`}
                        color={"#FDCC0D"}
                    />
                </Box>
            </Box>

            <Box m={"20px"}>{comment.comment.substring(0, 300)}</Box>
        </Box>
    );
};

export default CommentComponent;
