import { Box } from "@chakra-ui/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import { useCartStore } from "../services/cart";
import axios from "axios";

const Paypal = ({ totalPrice }) => {
    const { cartItems } = useCartStore();

    return (
        <Box w={"70%"} margin={"auto"}>
            <PayPalScriptProvider
                options={{
                    clientId:
                        "AT0QH7eEJSx2OeIGjDnMfSA_rdQBgQLPzJg16l1Al_F8db3_H3lgcw7ayt2eqsOyK4HMtmUpaSzajEHl",
                }}
            >
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: totalPrice,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            if (details.status === "COMPLETED") {
                                const createPayment = async () => {
                                    const response = await axios.post(
                                        `${
                                            import.meta.env.VITE_BASE_URL
                                        }/paypal`,
                                        {
                                            courses: cartItems,
                                            user_id: JSON.parse(
                                                localStorage.getItem("user")
                                            ).id,
                                        }
                                    );
                                    console.log(response);
                                };
                                createPayment();
                            }
                        });
                    }}
                />
            </PayPalScriptProvider>
        </Box>
    );
};

export default Paypal;
