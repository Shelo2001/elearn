import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router";
import NewVideo from "../components/NewVideo";

const CourseFileUpload = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <NewVideo
                id={id}
                onClose={onClose}
                onOpen={onOpen}
                isOpen={isOpen}
            />
        </div>
    );
};

export default CourseFileUpload;
