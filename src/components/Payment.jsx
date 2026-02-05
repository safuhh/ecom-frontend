import React, { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";

const stripePromise = loadStripe(
  "pk_test_51SvXBu23YwOYrkMqXrtNbxTZWH5B15sT39qiFgbSQa1Z4C1UL1PiQPjmFU5kkdiSwew6wgikZQ7xqQvpKORhfg7W00qDVODZZb"
);

function Payment({ children }) {
  const clientSecretPromise = useMemo(() => {
    return fetch("https://ecom-backend-9ok5.onrender.com/api/stripe/create-checkout-session", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        clientSecret: clientSecretPromise,
        elementsOptions: { appearance: { theme: "stripe" } },
      }}
    >
      {children}
    </CheckoutProvider>
  );
}

export default Payment;
