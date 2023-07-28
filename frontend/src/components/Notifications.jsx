import React, { useEffect, useState } from "react";
import {
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverBody,
    PopoverFooter,
    IconButton,
    Button,
    Box,
    Text,
} from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const pusher = new Pusher("b80dd59eacbbef5e3da6", {
            cluster: "eu",
            encrypted: true,
        });

        const channel = pusher.subscribe(`new-comments.${user.id}`);

        channel.bind(`new-comment`, function (data) {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data,
            ]);
        });

        return () => {
            pusher.unsubscribe("new-comments");
            pusher.disconnect();
        };
    }, []);
    console.log(notifications);

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    icon={<IoMdNotifications size={"22px"} />}
                    aria-label="Cart"
                    variant="ghost"
                    colorScheme="gray"
                    _hover={{
                        background: "white",
                        color: "#a832a8",
                    }}
                    mr={4}
                ></IconButton>
            </PopoverTrigger>
            <Box position={"absolute"} top="20px" right={"84px"}>
                {notifications.length}
            </Box>
            <Portal>
                <PopoverContent>
                    <PopoverBody>
                        {notifications.length == 0 ? (
                            <>No notifications yet</>
                        ) : (
                            notifications.map((notification) => (
                                <Link to={`/course/${notification.courseId}`}>
                                    <Box padding={"3px"} bgColor={"blue.100"}>
                                        <Text p={"3px"}>
                                            {notification.username} commented:{" "}
                                            {notification.message}
                                        </Text>
                                    </Box>
                                </Link>
                            ))
                        )}
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default Notifications;
