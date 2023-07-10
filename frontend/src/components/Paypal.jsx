import { Box } from "@chakra-ui/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

const Paypal = () => {
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
                                        value: "1.99",
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
                        });
                    }}
                />
            </PayPalScriptProvider>
        </Box>
    );
};

export default Paypal;
