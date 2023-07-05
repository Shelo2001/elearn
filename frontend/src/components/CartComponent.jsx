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
                            <div>{item.title}</div>
                        ))}
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

export default CartComponent;
