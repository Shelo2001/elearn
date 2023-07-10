import { Box, Flex, Icon, Radio, RadioGroup } from "@chakra-ui/react";
import { FaPaypal, FaStripe } from "react-icons/fa";

const PaymentMethodSelection = ({
    paymentMethods,
    selectedMethod,
    onChange,
}) => {
    return (
        <RadioGroup
            my="20px"
            display="flex"
            flexDirection="column"
            value={selectedMethod}
            onChange={onChange}
            gap="10px"
        >
            {paymentMethods.map((method) => (
                <Box
                    key={method.id}
                    border="1px solid black"
                    borderRadius="xl"
                    bg={selectedMethod === method.id ? "purple.300" : "white"}
                    onClick={() => onChange(method.id)}
                    padding={"10px"}
                    cursor="pointer"
                    display={"flex"}
                >
                    {method.id === "PayPal" && (
                        <Flex marginRight="10px">
                            <Icon as={FaPaypal} boxSize={6} color="black" />
                        </Flex>
                    )}
                    {method.id === "Stripe" && (
                        <Flex marginRight="10px">
                            <Icon as={FaStripe} boxSize={6} color="black" />
                        </Flex>
                    )}
                    <Radio
                        padding="10px"
                        value={method.id}
                        mx="10px"
                        colorScheme="purple"
                        size="lg"
                        _hover={{ borderColor: "purple.500" }}
                        _focus={{ boxShadow: "outline" }}
                        opacity={0}
                        fontWeight="bold"
                        position="absolute"
                    />

                    {method.name}
                </Box>
            ))}
        </RadioGroup>
    );
};

export default PaymentMethodSelection;
