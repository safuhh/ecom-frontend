import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getproduct } from "../api/productApi";
import { addtocart } from "../api/cartApis";
import { addToWishlist } from "../api/wishlistApis";
import { toast } from "react-toastify";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getproduct(id)
      .then((res) => setProduct(res.data.product))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load product");
      });
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
      </div>
    );
  }

  const handleadd = async () => {
    try {
      await addtocart(product._id, 1);
      toast.success("Added to cart");
      navigate("/cart");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Something went wrong while adding to cart");
        console.log(err);
      }
    }
  };


  const handlewishlist = async () => {
    try {
      await addToWishlist(product._id);
      toast.success("Added to wishlist ");
      navigate("/wishlist")
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
      } else {
        toast.error("Failed to add to wishlist");
        console.log(err);
      }
    }
  };
const handleBuyNow = () => {
  const products = [
    {
      productId: product._id,
      quantity: 1,
    },
  ];

  navigate("/order", {
    state: { products },
  });
};





  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Product Image */}
          <div className="overflow-hidden rounded-xl bg-gray-50 transition-all hover:shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-6">
              <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl font-medium text-gray-900">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest">
                Description
              </h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleadd}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
              >
                order now
              </button>
              <button
                onClick={handlewishlist}
                className="flex items-center justify-center rounded-full border border-gray-200 px-8 py-4 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50 active:scale-[0.98]"
              >
                <Heart size={18} className="mr-2" /> Wishlist
              </button>
            </div>

            {/* Extra Info */}
            <div className="mt-10 border-t border-gray-100 pt-10">
              <div className="grid grid-cols-2 gap-4 text-xs font-medium uppercase tracking-tighter text-gray-400">
                <div>• Free shipping on orders over ₹2000</div>
                <div>• 14-day return policy</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
