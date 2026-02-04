import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPayment } from "../api/orderApi";

const Complete = () => {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) {
      setStatus("failed");
      return;
    }

    const saveOrder = async () => {
      try {
        await verifyPayment(sessionId);
        setStatus("success");
      } catch (err) {
        console.log("VERIFY ERROR 👉", err.response?.data || err.message);
        setStatus("failed");
      }
    };

    saveOrder();
  }, []);

  if (status === "loading") return <p>Processing order…</p>;

return (
  <div className="min-h-screen bg-white flex items-center justify-center px-4">
    <div className="w-full max-w-md text-center">
      
      {/* Card */}
      <div className="relative rounded-3xl border border-gray-200 bg-white p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
        
        {/* Soft Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl" />
        </div>

        {status === "success" ? (
          <>
            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <span className="text-2xl text-white">✓</span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Order Confirmed
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your order has been placed successfully.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-8 w-full rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
            >
              Go to Home
            </button>
          </>
        ) : (
          <>
            {/* Error Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-red-200 bg-red-50">
              <span className="text-2xl text-red-600">×</span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Payment Failed
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Something went wrong. Please try again.
            </p>

            <button
              onClick={() => navigate("/cart")}
              className="mt-8 w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 active:scale-[0.98]"
            >
              Back to Cart
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

};

export default Complete;
