import { Box } from "@chakra-ui/react";
import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
    return (
        <Box display={"flex"} alignItems={"center"} gap={"2px"}>
            <span>
                {value >= 1 ? (
                    <FaStar color={color} />
                ) : value >= 0.5 ? (
                    <FaStarHalfAlt color={color} />
                ) : (
                    <FaStar color="#e4e5e9" />
                )}
            </span>
            <span>
                {value >= 2 ? (
                    <FaStar color={color} />
                ) : value >= 1.5 ? (
                    <FaStarHalfAlt color={color} />
                ) : (
                    <FaStar color="#e4e5e9" />
                )}
            </span>
            <span>
                {value >= 3 ? (
                    <FaStar color={color} />
                ) : value >= 2.5 ? (
                    <FaStarHalfAlt color={color} />
                ) : (
                    <FaStar color="#e4e5e9" />
                )}
            </span>
            <span>
                {value >= 4 ? (
                    <FaStar color={color} />
                ) : value >= 3.5 ? (
                    <FaStarHalfAlt color={color} />
                ) : (
                    <FaStar color="#e4e5e9" />
                )}
            </span>
            <span>
                {value >= 5 ? (
                    <FaStar color={color} />
                ) : value >= 4.5 ? (
                    <FaStarHalfAlt color={color} />
                ) : (
                    <FaStar color="#e4e5e9" />
                )}
            </span>
            <span>{text && text}</span>
        </Box>
    );
};

export default Rating;
