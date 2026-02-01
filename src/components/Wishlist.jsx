import { useEffect, useState } from "react";
import { getwishlist, removeFromWishlist } from "../api/wishlistApis";
import { addtocart } from "../api/cartApis";
import Navbar from "./Navbar";
import { ShoppingBag, X, Heart } from "lucide-react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState({ products: [] });

  const fetchWishlist = async () => {
    const res = await getwishlist();
    setWishlist(res.data || { products: [] });
  };

  useEffect(() => { fetchWishlist(); }, []);

  const handleRemove = async (id) => {
    await removeFromWishlist(id);
    fetchWishlist();
  };

  const handleAddToCart = async (id) => {
    await addtocart(id, 1);
    await removeFromWishlist(id);
    fetchWishlist();
  };

  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] font-sans">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-8 py-16">
        {/* Rolex-Style Header: Centered & Prestigious */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="h-10 w-[1px] bg-[#b39359] mb-6"></div> {/* Gold Accent Line */}
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] uppercase text-stone-800 mb-4">
            My Selection
          </h1>
          <p className="text-stone-500 tracking-[0.05em] text-sm uppercase font-medium">
            Personal Collection &mdash; {wishlist.products.length} Items
          </p>
        </div>

        {wishlist.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 border-t border-b border-stone-100">
            <Heart className="w-12 h-12 text-stone-200 mb-6 stroke-[1px]" />
            <h2 className="text-2xl font-light text-stone-400 italic mb-8">Your selection is currently empty.</h2>
            <button className="px-10 py-4 border border-stone-800 text-xs tracking-[0.2em] uppercase hover:bg-stone-800 hover:text-white transition-all duration-500">
              Discover Novelties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {wishlist.products.map((item) => (
              <div 
                key={item.productId._id} 
                className="group relative flex flex-col"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/5] bg-[#fdfdfd] flex items-center justify-center overflow-hidden border border-stone-50 transition-colors duration-500 group-hover:border-stone-200">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Luxury Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500" />
             
                  <button 
                    onClick={() => handleRemove(item.productId._id)}
                    className="absolute top-6 right-6 text-black hover:text-red-800 transition-colors duration-300"
                    aria-label="Remove"
                  >
                    <X size={20} strokeWidth={1} />
                  </button>
                </div>

                <div className="mt-8 flex flex-col items-center text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#b39359] font-bold mb-2">
                    Heritage Collection
                  </span>
                  <h3 className="text-xl font-light tracking-tight text-stone-900 mb-3 group-hover:text-stone-600 transition-colors">
                    {item.productId.name}
                  </h3>
                  <div className="w-6 h-[1px] bg-stone-200 mb-3"></div>
                  <p className="text-lg font-medium tracking-widest text-stone-800">
                    ₹{item.productId.price?.toLocaleString()}
                  </p>
                  
           
                  <button 
                    onClick={() => handleAddToCart(item.productId._id)}
                    className="mt-6 flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-bold text-stone-900 overflow-hidden relative group/btn"
                  >
                    <span className="relative z-10">Move to Shopping Bag</span>
                    <ShoppingBag size={14} className="relative z-10" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-900 transition-all duration-500 group-hover/btn:w-full"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="max-w-[1400px] mx-auto px-8 pb-20">
        <div className="w-full h-[1px] bg-stone-100 mt-20"></div>
        <div className="flex justify-between mt-10 text-[10px] tracking-[0.2em] text-stone-400 uppercase">
          <span>Est. 2024</span>
          <span>Terms & Disclaimers</span>
        </div>
      </div>
    </div>
  );
}