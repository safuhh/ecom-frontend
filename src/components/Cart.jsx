import { useEffect, useState } from "react";
import { getcart, addtocart, removecart } from "../api/cartApis";

export default function Cart() {
  const [cart, setcart] = useState({ products: [] });

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

  const handleadd = async (productId) => {
    try {
      await addtocart(productId, 1);
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

  return (
    <div>
      <h1>cart section</h1>
      {cart.products.length === 0 ? (
        <p>cart is empty</p>
      ) : (
        <ul>
          {cart.products.map((item) => (
            <li key={item.productId}>
              <span>{item.productName}</span> 
              <span>{item.quantity}</span>
              <button onClick={() => handleadd(item.productId)}>plus</button>
              <button onClick={() => handleremove(item.productId)}>remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
