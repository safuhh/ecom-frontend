import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getproduct } from "../api/productApi";
import { addtocart } from "../api/cartApis";
import { useNavigate } from "react-router-dom";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getproduct(id)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
const handleadd = async () => {
  try {
    await addtocart(product._id, 1);
    navigate("/cart");
  } catch (err) {
    console.log(err.response?.data?.message || err.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </p>
<button
  onClick={handleadd}
  className="rounded-xl bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800"
>
  Add to Cart
</button>

        </div>
      </div>
    </div>
  );
}
