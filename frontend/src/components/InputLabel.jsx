import React from "react";
import { FormLabel } from "@chakra-ui/react";

const InputLabel = ({ text }) => {
    return (
        <FormLabel
            htmlFor="email"
            position="absolute"
            transform="translateY(-50%)"
            fontSize="sm"
            color="gray.500"
            transition="transform 0.2s, font-size 0.2s"
            pointerEvents="none"
            zIndex="1"
            top="50%"
            left="4"
            _focus={{
                transform: "translateY(-130%)",
                fontSize: "xs",
            }}
        >
            {text}
        </FormLabel>
    );
};

export default InputLabel;
