import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router";
import { Box, Button } from "@chakra-ui/react";
import { useCartStore } from "../services/cart";

export default function StripeCheckoutForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const { cartItems } = useCartStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/stripe`,
                    {
                        amount: amount * 100,
                        courses: cartItems,
                        user_id: JSON.parse(localStorage.getItem("user")).id,
                        id,
                    }
                );
                console.log(response);

                if (response?.data[0] === "succeeded") {
                    navigate("/mylearning");
                }
            } catch (error) {
                console.log("Error", error);
            }
        } else {
            console.log(error.message);
        }
    };

    return (
        <Box w={"70%"} margin={"auto"}>
            <form onSubmit={handleSubmit}>
                <div>
                    <CardElement
                        options={{ style: { base: { fontSize: "16px" } } }}
                    />
                </div>
                <Button
                    border="2px solid black"
                    borderRadius="0px"
                    bgColor="black"
                    color="white"
                    size="md"
                    _hover={{
                        background: "blackAlpha.800",
                    }}
                    my={"20px"}
                    width={"100%"}
                    type="submit"
                >
                    Finish payment
                </Button>
            </form>
        </Box>
    );
}
