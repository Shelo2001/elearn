import React, { useEffect, useState } from "react";
import hero from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import { Box, IconButton, Button } from "@chakra-ui/react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const carouselData = [
        {
            image: hero,
            title: "The latest in learning",
            description:
                "Courses for every step of your learning journey, starting at $15.99. Sale ends July 5.",
        },
        {
            image: hero2,
            title: "Code your future",
            description:
                "Take control of your career. Learn the latest skills in web development.",
        },

        {
            image: hero3,
            title: "Stay a step ahead (or two)",
            description:
                "Learn the latest skills from real-world experts that have been where you want to go.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(
                (prevIndex) => (prevIndex + 1) % carouselData.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex]);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
        );
    };

    return (
        <Box position="relative">
            <img
                src={carouselData[activeIndex].image}
                alt="Hero Image"
                style={{ margin: "auto" }}
            />
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
                        {carouselData[activeIndex].title}
                    </h1>
                    <p>{carouselData[activeIndex].description}</p>
                </Box>
            </Box>
            <IconButton
                icon={<AiFillCaretLeft />}
                aria-label="Cart"
                onClick={handlePrev}
                borderRadius="100%"
                position="absolute"
                top="43%"
                left="15%"
                color="white"
                background="blackAlpha.700"
                _hover={{
                    background: "blackAlpha",
                }}
                mr={4}
            ></IconButton>
            <IconButton
                icon={<AiFillCaretRight />}
                aria-label="Cart"
                onClick={handleNext}
                borderRadius="100%"
                position="absolute"
                top="43%"
                right="14%"
                color="white"
                background="blackAlpha.700"
                _hover={{
                    background: "blackAlpha",
                }}
                mr={4}
            ></IconButton>
        </Box>
    );
};

export default Hero;
