import React, { useEffect } from "react";
import {
    Popover,
    PopoverTrigger,
    Portal,
    PopoverContent,
    PopoverBody,
    PopoverFooter,
    IconButton,
    Button,
    Text,
    CardBody,
    Stack,
    Card,
    Image,
    Divider,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartStore } from "../services/cart";

const CartComponent = () => {
    const { cartItems } = useCartStore();

    useEffect(() => {}, [cartItems]);

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    icon={<FaShoppingCart />}
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
                        {cartItems?.map((item) => (
                            <Link to={`/course/${item.id}`}>
                                <Card
                                    direction={{ base: "column", sm: "row" }}
                                    overflow="hidden"
                                    variant="outline"
                                    mb={"10px"}
                                >
                                    <Image
                                        objectFit="contain"
                                        w="100px"
                                        src={`${import.meta.env.VITE_IMG_URL}/${
                                            item.image
                                        }`}
                                        alt="Caffe Latte"
                                    />

                                    <Stack>
                                        <CardBody>
                                            <Text>{item.title}</Text>
                                            <Text>{item.user.name}</Text>
                                            <Text>{item.price}</Text>
                                        </CardBody>
                                    </Stack>
                                </Card>
                            </Link>
                        ))}
                    </PopoverBody>
                    <Divider />
                    <Text marginTop={"15px"} marginBottom={"15px"}>
                        asd
                    </Text>
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

export default CartComponent;
