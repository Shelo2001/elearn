import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import NewVideo from "../components/NewVideo";
import { useVideos } from "../services/video";
import VideoList from "../components/VideoList";

const CourseFileUpload = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getVideos, courseVideos } = useVideos();

    useEffect(() => {
        getVideos(id);
    }, []);

    return (
        <div>
            <NewVideo
                id={id}
                onClose={onClose}
                onOpen={onOpen}
                isOpen={isOpen}
            />
            <VideoList videos={courseVideos} />
        </div>
    );
};

export default CourseFileUpload;
