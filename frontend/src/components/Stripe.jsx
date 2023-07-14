import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51KShu0Cb4jB24EPJiKkcfxqPeTQfP20Ew8VPSh1l1dT8TE1GAEt9zECv83ZErRIzU8wzTQlGYLTjz4SZLlOmR1Bl00GfSeA21z"
);

export default function Stripe({ amount }) {
    return (
        <Elements stripe={stripePromise}>
            <StripeCheckoutForm amount={amount} />
        </Elements>
    );
}
