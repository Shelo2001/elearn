import React, { useEffect, useState } from "react";
import {
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverBody,
    IconButton,
    Box,
    Text,
    PopoverFooter,
    Button,
} from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import Pusher from "pusher-js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNotifications } from "../services/notifications";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const { setNotificationsToSeen, deleteNotifications } = useNotifications();

    useEffect(() => {
        const pusher = new Pusher("b80dd59eacbbef5e3da6", {
            cluster: "eu",
            encrypted: true,
        });

        const channel = pusher.subscribe(`new-comments.${user.id}`);

        const fetchNotifications = async () => {
            let token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/notifications/${user.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const notificationsFromDatabase = data.notifications;
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                ...notificationsFromDatabase,
            ]);
        };

        fetchNotifications();

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

    const unseenNotifications = notifications.filter(
        (notification) => !notification.is_seen
    );

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
                {unseenNotifications.length == 0 ? (
                    <></>
                ) : (
                    unseenNotifications.length
                )}
            </Box>
            <Portal>
                <PopoverContent>
                    <PopoverBody>
                        {notifications.length == 0 ? (
                            <>No notifications yet</>
                        ) : (
                            notifications.map((notification) => (
                                <Link to={`/course/${notification.course_id}`}>
                                    <Box
                                        padding={"3px"}
                                        mt={"10px"}
                                        bgColor={
                                            notification.is_seen
                                                ? `white`
                                                : `blue.100`
                                        }
                                        onClick={() =>
                                            setNotificationsToSeen(
                                                notification.id
                                            )
                                        }
                                    >
                                        <Text p={"3px"}>
                                            {notification.username}{" "}
                                            {notification.action}:{" "}
                                            {notification.message}
                                        </Text>
                                    </Box>
                                </Link>
                            ))
                        )}
                    </PopoverBody>
                    <PopoverFooter>
                        <Button
                            onClick={() => deleteNotifications(notifications)}
                            colorScheme="blackAlpha"
                            border="2px solid black"
                            borderRadius="0px"
                            bgColor="black"
                            color="white"
                            _hover={{
                                background: "blackAlpha.900",
                            }}
                            size="md"
                            width="100%"
                        >
                            Clear all notifications
                        </Button>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default Notifications;
