import { Box, Divider, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PaymentMethodSelection from "../components/PaymentMethodSelection";
import { GrSecure } from "react-icons/gr";
import { useCartStore } from "../services/cart";
import Paypal from "../components/Paypal";
import Stripe from "../components/Stripe";
import { useNavigate } from "react-router";

const Checkout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, []);

    const [selectedMethod, setSelectedMethod] = useState(null);
    const { cartItems } = useCartStore();

    const handlePaymentMethodChange = (value) => {
        setSelectedMethod(value);
    };

    let paymentMethods = [
        { id: "Stripe", name: "Stripe" },
        { id: "PayPal", name: "PayPal" },
    ];
    const totalPrice = cartItems.reduce((sum, course) => sum + course.price, 0);
    return (
        <>
            <Box display={"flex"}>
                <Box width={"55%"} minH={"92vh"} bg={"white"}>
                    <Box padding={"10px"} float={"right"} w={"60%"}>
                        <Heading>Checkout</Heading>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Text fontSize={"22px"} fontWeight={"bold"}>
                                Choose payment method
                            </Text>
                            <Box
                                display={"flex"}
                                gap={"10px"}
                                alignItems={"center"}
                            >
                                <Text fontSize={"12px"} color={"gray.600"}>
                                    secured connection
                                </Text>
                                <GrSecure />
                            </Box>
                        </Box>
                        <PaymentMethodSelection
                            paymentMethods={paymentMethods}
                            selectedMethod={selectedMethod}
                            onChange={handlePaymentMethodChange}
                        />
                        <Text fontSize={"22px"} fontWeight={"bold"}>
                            Order details
                        </Text>
                        {cartItems.map((item) => (
                            <Box
                                border={"1px solid gray"}
                                my={"10px"}
                                borderRadius={"2xl"}
                                display={"flex"}
                                justifyContent={"space-between"}
                                padding={"10px"}
                                alignItems={"center"}
                            >
                                <Image
                                    w={"70px"}
                                    h={"70px"}
                                    src={`${import.meta.env.VITE_IMG_URL}/${
                                        item.image
                                    }`}
                                />
                                <Text fontSize={"20px"} fontWeight={"bold"}>
                                    {item.title}
                                </Text>
                                <Text fontSize={"20px"} fontWeight={"bold"}>
                                    ${item.price}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box width={"45%"} minH={"92vh"} bg={"gray.100"}>
                    <Box width={"70%"} margin={"auto"}>
                        <Heading my={"20px"}>Summary</Heading>
                        <Text mx={"20px"} my={"10px"} fontSize={"22px"}>
                            Total price: ${totalPrice}
                        </Text>
                        <Divider mb={"20px"} borderColor="blackAlpha.800" />
                    </Box>
                    {selectedMethod === "PayPal" ? (
                        <Paypal totalPrice={totalPrice} />
                    ) : selectedMethod === "Stripe" ? (
                        <Stripe amount={totalPrice} />
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Checkout;
