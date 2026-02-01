import { useEffect, useState } from "react";
import { getcart, addtocart, removecart } from "../api/cartApis";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"; 
import {  useNavigate } from "react-router-dom";
import { createCartCheckoutSession } from "../api/stripeApi";
export default function Cart() {
  const [cart, setcart] = useState({ products: [] });
  const navigate = useNavigate()

  const fetchcart = async () => {
    try {
      const res = await getcart();
      setcart(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchcart();
  }, []);

  const handleIncrease = async (productId) => {
    try {
      await addtocart(productId, 1);
      fetchcart();
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      await addtocart(productId, -1);
      fetchcart();
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const handleremove = async (productId) => {
    try {
      await removecart(productId);
      fetchcart();
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };
  const handle= ()=>{
    navigate("/")
  }
const handleBuyNow = async () => {
  try {
    const products = cart.products.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const res = await createCartCheckoutSession(products);
    window.location.href = res.data.url;
  } catch (err) {
    toast.error("Payment failed");
    navigate("/login");
  }
};

 
  const totalPrice = cart.products.reduce((acc, item) => {
    return acc + (item.productId.price || 0) * item.quantity;
  }, 0);

 return (
  <div className=" min-h-screen   sm:px-10 lg:px-16 font-serif">
    
    <div className="max-w-7xl mx-auto mt-12">
      
      {/* MINIMALIST HEADER */}
      <div className="text-center mb-20">
      <div className="flex flex-col items-center py-12">
  {/* The Header: Smaller, lighter, and vastly more spaced out */}
  <h1 className="text-2xl md:text-3xl font-light tracking-[0.6em] text-zinc-800 uppercase text-center">
    Your Selection
  </h1>

  {/* The Divider: Barely visible, like a silk thread */}
  <div className="w-16 h-[0.5px] bg-zinc-200 mt-8" />

  {/* The Subtext: Lowercase for a relaxed, confident "Quiet" vibe */}
  <p className="text-xs italic tracking-[0.2em] text-zinc-400 font-light font-serif">
    chosen. reserved. almost yours.
  </p>
</div>

      </div>

      {cart.products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border-t border-zinc-200">
          <p className="text-zinc-500 text-lg font-light italic mb-10">
            "Your collection is awaiting its first piece."
          </p>
          <button
            onClick={handle}
            className="px-12 py-4 border border-zinc-900 text-zinc-900 text-xs tracking-[0.3em] uppercase hover:bg-zinc-900 hover:text-white transition-all duration-500 font-sans"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* PRODUCTS LIST */}
          <div className="lg:col-span-7 space-y-12">
            {cart.products.map((item) => (
              <div
                key={item.productId._id}
                className="group flex flex-col sm:flex-row gap-10 pb-12 border-b border-zinc-100 last:border-0 items-center sm:items-start"
              >
                {/* ELEGANT IMAGE WRAPPER */}
                <div className="relative w-48 h-64 overflow-hidden bg-[#F3F2EE] transition-all duration-700">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="flex flex-1 flex-col justify-between py-1 w-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-2xl font-light text-zinc-900 tracking-tight">
                        {item.productId.name}
                      </h3>
                      <p className="text-lg font-light text-zinc-600 font-sans">
                        ₹{((item.productId.price || 0) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-sans">
                      Edition Ref. {item.productId._id.slice(-6)}
                    </p>
                  </div>

                  {/* MINIMAL CONTROLS */}
                  <div className="flex items-center justify-between mt-12">
                    <div className="flex items-center border border-zinc-200 rounded-sm px-1">
                      <button
                        onClick={() => handleDecrease(item.productId._id)}
                        className="p-3 text-zinc-400 hover:text-zinc-900 transition-colors"
                      >
                        <Minus size={12} strokeWidth={1} />
                      </button>
                      <span className="px-4 text-xs font-sans text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.productId._id)}
                        className="p-3 text-zinc-400 hover:text-zinc-900 transition-colors"
                      >
                        <Plus size={12} strokeWidth={1} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleremove(item.productId._id)}
                      className="text-[10px] uppercase tracking-[0.2em] text-zinc-300 hover:text-red-900 transition-colors font-sans"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY - STICKY FLOATING SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="bg-white/50 backdrop-blur-sm p-10 lg:sticky lg:top-24 border border-zinc-100">
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-400 mb-10 border-b border-zinc-100 pb-4">
                Summary
              </h2>

              <div className="space-y-6 font-sans">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 font-light">Subtotal</span>
                  <span className="text-zinc-900">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 font-light">Shipping</span>
                  <span className="text-zinc-400 italic font-light tracking-wide">Complimentary</span>
                </div>
              </div>

              <div className="h-px bg-zinc-200 my-10" />

              <div className="flex justify-between items-baseline mb-12">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-900">Total</span>
                <span className="text-4xl font-extralight text-zinc-900">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

             <button
  onClick={handleBuyNow}
  className="w-full bg-zinc-900 text-white py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all duration-300 shadow-sm"
>
  Proceed to Checkout
</button>

              
              <div className="mt-8 flex flex-col items-center space-y-2">
                 <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-sans">
                   Verified Secure Checkout
                 </p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  </div>
);

}