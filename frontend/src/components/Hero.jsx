import React from "react";
import hero from "../assets/hero.jpg";
import { Box } from "@chakra-ui/react";

const Hero = () => {
    return (
        <Box position="relative">
            <img src={hero} style={{ margin: "auto" }} />
            <Box
                boxShadow="lg"
                position="absolute"
                maxWidth="400px"
                top="20%"
                left="30%"
                transform="translate(-30%, -20%)"
                bg="white"
                p={4}
            >
                <Box style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
                        The latest in learning
                    </h1>
                    <p>
                        Courses for every step of your learning journey,
                        starting at $15.99. Sale ends July 5.
                    </p>
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
