import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createCheckoutSession } from "../api/stripeApi";
import { toast } from "react-toastify";

const OrderForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.products) {
    navigate("/cart");
    return null;
  }

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // BASIC VALIDATION FUNCTION
  const validateAddress = () => {
    for (const key in address) {
      if (!address[key].trim()) {
        toast.error(`Please enter ${key}`);
        return false;
      }
    }

    if (!/^\d{10}$/.test(address.phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      toast.error("Pincode must be 6 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    //  STOP if validation fails
    if (!validateAddress()) return;

    try {
      const res = await createCheckoutSession({
        products: state.products,
        address,
        
      });

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-lg mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-serif tracking-tight text-slate-800">
            Delivery Details
          </h2>
          <p className="mt-2 text-sm uppercase tracking-widest text-slate-500">
            Secure Checkout
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
            {Object.keys(address).map((key) => (
              <div
                key={key}
                className={key === "street" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={key}
                  className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1 ml-1"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  placeholder={`Enter ${key}...`}
                  value={address[key]}
                  onChange={handleChange}
                  className="block w-full border-0 border-b border-slate-200 bg-transparent px-1 py-2 text-slate-900 placeholder-slate-300 focus:border-black focus:ring-0 transition-colors duration-300 sm:text-sm"
                />
              </div>
            ))}
          </div>

          <div className="pt-8">
            <button
              onClick={handleSubmit}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium uppercase tracking-[0.2em] text-white bg-slate-900 hover:bg-black focus:outline-none transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
            >
              Proceed to Payment
            </button>
            <p className="mt-4 text-center text-xs text-slate-400 italic">
              Complimentary shipping on all premium orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
