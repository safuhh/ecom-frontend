import { useEffect, useState } from "react";
import {
  getproducts,
  createproduct,
  deleteproduct,
  updateproduct,
} from "../api/productApi";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  // ✅ Load products with try/catch
  const loadProducts = async () => {
    try {
      const res = await getproducts();
      setProducts(res.data.products);
    } catch (err) {
      console.error("Failed to load products:", err.response?.data || err.message);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      category: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      return alert("Name and price are required");
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await updateproduct(editingId, payload).catch((err) => {
          console.error("Update failed:", err.response?.data || err.message);
          alert(err.response?.data?.message || "Update failed");
          throw err;
        });
      } else {
        await createproduct(payload).catch((err) => {
          console.error("Create failed:", err.response?.data || err.message);
          alert(err.response?.data?.message || "Create failed");
          throw err;
        });
      }

      resetForm();
      loadProducts();
    } catch (err) {
      // Already handled individually above
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      category: product.category || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setLoading(true);
      await deleteproduct(id).catch((err) => {
        console.error("Delete failed:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Delete failed");
        throw err;
      });
      loadProducts();
    } catch (err) {
      // already handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="mb-8 text-3xl font-semibold text-gray-900">
        Admin · Products
      </h2>

      {/* FORM */}
      <div className="mb-10 max-w-xl space-y-4 rounded-2xl border border-gray-200 p-6 shadow-sm">
        <input
          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-gray-900"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-gray-900"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-gray-900"
          placeholder="Category (e.g. Luxury, Sport, Classic)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-gray-900"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <textarea
          rows="3"
          className="w-full rounded-lg border px-4 py-2 text-sm focus:border-gray-900"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-full border px-6 py-2 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex items-center justify-between rounded-xl border border-gray-100 px-5 py-4"
          >
            <div>
              <p className="font-medium text-gray-900">{p.name}</p>
              <p className="text-sm text-gray-500">
                ₹{p.price} · {p.category || "No category"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(p)}
                className="rounded-full border px-4 py-1.5 text-sm hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="rounded-full border border-red-500 px-4 py-1.5 text-sm text-red-500 hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
