import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoList = ({ videos }) => {
    const videoRefs = useRef([]);

    useEffect(() => {
        videos.forEach((video, index) => {
            const player = videojs(videoRefs.current[index], {
                controls: true,
                preload: "auto",
                fluid: true,
            });

            player.src({
                type: "video/mp4",
                src: `${import.meta.env.VITE_BASE_URL}/video/${video.video}`,
            });

            videoRefs.current[index].player = player;
        });

        return () => {
            videoRefs.current.forEach((ref) => {
                if (ref.player) {
                    ref.player.dispose();
                }
            });
        };
    }, [videos]);

    return (
        <Box
            marginStart={"50px"}
            display={"flex"}
            gap={"30px"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
        >
            {videos.map((video, index) => (
                <Box width={"320px"} key={video.id}>
                    <h1 fontSize={"25px"}>
                        {index + 1}.{video.title.substring(0, 30)}...
                    </h1>
                    <Box w={"320px"} h="180px">
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            className="video-js vjs-default-skin"
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default VideoList;
