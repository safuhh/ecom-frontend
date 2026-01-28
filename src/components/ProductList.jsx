import { useEffect, useState } from "react";
import { getproducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getproducts()
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-gray-900">
        Our Products
      </h2>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((p) => (
          <div
            key={p._id}
            className="group rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-gray-50">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2 px-4 py-4">
              <h3 className="truncate text-sm font-medium text-gray-900">
                {p.name}
              </h3>

              <p className="line-clamp-2 text-xs text-gray-500">
                {p.description}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-900">
                  ₹{p.price}
                </span>

                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="rounded-full border border-gray-900 px-3 py-1 text-xs font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white active:scale-95"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
