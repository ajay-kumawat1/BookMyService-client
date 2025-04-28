// StripeElementsWrapper.jsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51RHpvjRwGVLBR8IvPlzc8e77oWu5rmdPmubQ46XeYwHfVjAp6XuTIikB1MHZ7KmuAdIRTnJ1EjQfMgPNnJUVNmJA00YRaGqv20");

export default function StripeElementsWrapper({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}