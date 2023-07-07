import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Textarea,
    Button,
    Alert,
    Link,
    Box,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useCourses } from "../services/courses";

const ReviewComponent = ({ course }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const { createReview } = useCourses();

    const [reviewRating, setReviewRating] = useState(0);
    const [comment, setComment] = useState(0);

    const userHasRated =
        course?.rating?.some((rating) => rating.user_id === user?.id) ?? false;

    const submitHandler = (e) => {
        e.preventDefault();
        let data = {
            course_id: course.id,
            user_id: user.id,
            rating: reviewRating,
            comment,
        };

        createReview(data);
    };

    return (
        <Box mx={"30px"} my={"50px"} w={"50%"}>
            {!user ? (
                <Alert>
                    Please&nbsp;
                    <ReachLink to="/login">
                        <Link>sign in</Link>
                    </ReachLink>
                    &nbsp;to write a review
                </Alert>
            ) : !userHasRated ? (
                <Box p={4} boxShadow="lg" borderRadius="md" margin="0 auto">
                    <h2
                        style={{
                            textAlign: "center",
                            fontSize: "30px",
                            marginBottom: "30px",
                            marginTop: "30px",
                            fontWeight: "bold",
                        }}
                    >
                        Write a review, {user.name}
                    </h2>
                    <form onSubmit={submitHandler}>
                        <FormControl id="rating">
                            <FormLabel>Rating</FormLabel>
                            <Box mt={2}>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    onChange={(newRating) =>
                                        setReviewRating(newRating)
                                    }
                                    activeColor="#FDCC0D"
                                    emptyIcon={<BsStar />}
                                    filledIcon={<BsStarFill />}
                                />
                            </Box>
                        </FormControl>
                        <FormControl id="comment">
                            <FormLabel>Comment</FormLabel>
                            <Textarea
                                type="text"
                                id="description"
                                rows={"3"}
                                focusBorderColor="black"
                                border="1px solid black"
                                borderRadius="0"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            mt={"10px"}
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="black"
                            color="white"
                            size="md"
                            _hover={{
                                background: "blackAlpha.800",
                            }}
                            type="submit"
                            colorScheme="blue"
                        >
                            Submit review
                        </Button>
                    </form>
                </Box>
            ) : (
                <Alert>You already reviewed post!</Alert>
            )}
        </Box>
    );
};

export default ReviewComponent;
