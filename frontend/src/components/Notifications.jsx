import React from "react";
import {
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverBody,
    PopoverFooter,
    IconButton,
    Button,
} from "@chakra-ui/react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Notifications = () => {
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
            <Portal>
                <PopoverContent>
                    <PopoverBody>
                        <div>asdasd</div>
                        <div>asdasd</div>
                        <div>asdasd</div>
                        <div>asdasd</div>
                        <div>asdasd</div>
                    </PopoverBody>
                    <PopoverFooter>
                        <Link to="/cart">
                            <Button
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
                                Go to cart
                            </Button>
                        </Link>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default Notifications;
