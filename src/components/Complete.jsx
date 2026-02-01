import { useEffect, useState } from "react";

const Complete = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    fetch(
      `http://localhost:3033/api/stripe/session-status?session_id=${sessionId}`
    )
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Checking payment status…</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>
        {data.payment_status === "paid"
          ? "✅ Payment Successful"
          : "❌ Payment Failed"}
      </h2>

      <a href="/">Go Home</a>
    </div>
  );
};

export default Complete;
