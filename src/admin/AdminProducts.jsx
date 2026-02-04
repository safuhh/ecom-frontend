import { useEffect, useState } from "react";
import {
  getproducts,
  createproduct,
  deleteproduct,
  updateproduct,
} from "../api/productApi";
import AdminNavbar from "./AdminNavbar";

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
  <div className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans antialiased">
    <AdminNavbar/>
    {/* Header Section */}
    <header className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-6 gap-4">
        <div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
            Inventory Management
          </p>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-gray-950">
            Products <span className="text-gray-300">/ Catalog</span>
          </h2>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 italic">
          Total items: <span className="font-medium text-gray-900">{products.length}</span>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-20">
      
      {/* LEFT: Management Form (Responsive Sticky) */}
      <aside className="lg:col-span-4 order-2 lg:order-1">
        <div className="lg:sticky lg:top-8 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/50">
            <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              {editingId ? "Refine Product" : "New Collection Item"}
            </h3>
            
            <div className="space-y-5">
              <div className="group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1.5 block">Product Identity</label>
                <input
                  className="w-full bg-gray-50/50 rounded-xl border-transparent px-4 py-3 text-sm transition-all focus:bg-white focus:ring-2 focus:ring-gray-950/5 focus:border-gray-200 placeholder:text-gray-300 outline-none"
                  placeholder="e.g. Signature Leather Weekender"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1.5 block">Price (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                    <input
                      type="number"
                      className="w-full bg-gray-50/50 rounded-xl border-transparent pl-8 pr-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-gray-950/5 focus:border-gray-200 outline-none"
                      placeholder="0.00"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1.5 block">Category</label>
                  <input
                    className="w-full bg-gray-50/50 rounded-xl border-transparent px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-gray-950/5 focus:border-gray-200 outline-none"
                    placeholder="Luxury"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1.5 block">Image URL</label>
                <input
                  className="w-full bg-gray-50/50 rounded-xl border-transparent px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-gray-950/5 focus:border-gray-200 outline-none"
                  placeholder="https://images.unsplash.com/..."
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1.5 block">Narrative</label>
                <textarea
                  rows="3"
                  className="w-full bg-gray-50/50 rounded-xl border-transparent px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-gray-950/5 focus:border-gray-200 outline-none resize-none"
                  placeholder="Describe the craftmanship..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="pt-2 space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full rounded-xl bg-gray-950 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-gray-200"
                >
                  {editingId ? "Update Product" : "Publish to Catalog"}
                </button>

                {editingId && (
                  <button
                    onClick={resetForm}
                    className="w-full rounded-xl border border-gray-100 py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors"
                  >
                    Discard Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT: Product Display */}
      <div className="lg:col-span-8 order-1 lg:order-2">
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="group flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-3xl p-4 border border-gray-100/50 shadow-sm transition-all hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1"
            >
              {/* Thumbnail Preview */}
              <div className="h-24 w-full sm:w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 mb-4 sm:mb-0">
                <img 
                  src={p.imageUrl || 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=200'} 
                  alt={p.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="sm:ml-6 flex-grow w-full">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block">
                      {p.category || "General"}
                    </span>
                    <h4 className="text-lg font-medium text-gray-900 leading-tight group-hover:text-black transition-colors">{p.name}</h4>
                    <p className="text-sm text-gray-400 line-clamp-1 max-w-sm font-light">{p.description || "Minimalist design and premium build."}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-light text-gray-950">₹{Number(p.price).toLocaleString('en-IN')}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-6 sm:opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <button
                    onClick={() => handleEdit(p)}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="py-24 text-center rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50/30">
              <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
                <span className="text-gray-300">📦</span>
              </div>
              <p className="text-gray-400 font-light text-sm">The catalog is currently empty.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
);
}
