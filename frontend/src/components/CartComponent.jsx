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
    Box,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartStore } from "../services/cart";

const CartComponent = () => {
    const { cartItems } = useCartStore();

    useEffect(() => {}, [cartItems]);

    const totalPrice = cartItems.reduce((sum, course) => sum + course.price, 0);

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
                        <Box maxH="350px" overflowY="auto">
                            {cartItems?.map((item) => (
                                <Link to={`/course/${item.id}`}>
                                    <Card
                                        direction={{
                                            base: "column",
                                            sm: "row",
                                        }}
                                        overflow="hidden"
                                        variant="outline"
                                        mb={"10px"}
                                    >
                                        <Image
                                            objectFit="contain"
                                            w="100px"
                                            px={"1"}
                                            src={`${
                                                import.meta.env.VITE_IMG_URL
                                            }/${item.image}`}
                                            alt="Caffe Latte"
                                        />

                                        <Stack>
                                            <CardBody>
                                                <Text
                                                    fontSize={"20px"}
                                                    color={"black"}
                                                    fontWeight={"extrabold"}
                                                >
                                                    {item.title}
                                                </Text>
                                                <Text
                                                    fontSize="15px"
                                                    color={"gray.500"}
                                                >
                                                    {item.user.name}
                                                </Text>
                                                <Text
                                                    fontSize="15px"
                                                    fontWeight="medium"
                                                >
                                                    {item.price} $
                                                </Text>
                                            </CardBody>
                                        </Stack>
                                    </Card>
                                </Link>
                            ))}
                        </Box>
                    </PopoverBody>
                    <Divider />
                    <Text
                        px={"2"}
                        fontSize={"22px"}
                        fontWeight={"bold"}
                        marginTop={"15px"}
                        marginBottom={"15px"}
                    >
                        Total Price: {totalPrice} $
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
