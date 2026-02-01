import { useEffect, useState, useRef } from "react";
import { getproducts } from "../api/productApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      const res = await getproducts(category, search);
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

 return (
    <div className="min-h-screen bg-[#ffffff] text-[#121212] overflow-x-hidden" ref={containerRef}>
     
      {/* 1. OVERLAY GRID: Reduced opacity and columns for mobile */}
      <div className="fixed inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 px-4 md:px-6 gap-4 md:gap-6 opacity-[0.02] md:opacity-[0.03]">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-black h-full" />
        ))}
      </div>

      {/* 2. HEADER: Responsive spacing and font sizes */}
      <header className="relative pt-20 pb-12 md:pt-32 md:pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-4"
        >
          <span className="text-[9px] md:text-[10px] uppercase font-light text-neutral-400">
            Heritage & Precision
          </span>
        </motion.div>
        
        <h1 className="text-center text-4xl sm:text-6xl md:text-8xl font-extralight tracking-tight md:tracking-[-0.05em] leading-[1.1] mb-8 md:mb-12">
          Chronometric <br />
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif italic text-neutral-400"
          >
            Icons
          </motion.span>
        </h1>

        {/* 3. FILTERS: Flex-wrap for small screens */}
        <nav className="flex flex-wrap justify-center items-center gap-6 md:gap-20 py-6 md:py-10 border-b border-neutral-100">
          {["", "analog", "timer"].map((val) => {
            const isActive = category === val;
            return (
              <button key={val} onClick={() => setCategory(val)} className="relative py-2 group">
                <span className={`text-[11px] md:text-[14px] tracking-[0.3em] md:tracking-[0.5em] uppercase transition-all duration-700 ${
                    isActive ? "text-black font-medium" : "text-neutral-300"
                  }`}>
                  {val === "" ? "Archive" : val}
                </span>
                <div className="absolute -bottom-[2px] left-0 w-full flex justify-center">
                  {isActive ? (
                    <motion.div layoutId="nav_underline" className="w-full h-[1px] bg-black" />
                  ) : (
                    <div className="w-0 h-[1px] bg-neutral-200 group-hover:w-full transition-all duration-500" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </header>

      {/* 4. GALLERY: Improved Grid Spacing */}
      <main className="max-w-7xl mx-auto px-6 pb-24 md:pb-40">
        <AnimatePresence mode="wait">
          <motion.div 
            key={category}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-16 md:gap-y-32"
          >
            {products.map((p, i) => (
              <ProductCard key={p._id} product={p} index={i} navigate={navigate} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// ... (keep imports and ProductList function the same)

function ProductCard({ product, index, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: (index % 3) * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
      className={`relative group ${index % 2 !== 0 ? "md:mt-24" : ""}`}
    >
      {/* IMAGE CONTAINER */}
      <div 
        onClick={() => navigate(`/product/${product._id}`)}
        className="relative aspect-[3/4] w-full max-w-[320px] mx-auto overflow-hidden bg-[#f9f9f9] cursor-pointer"
      >
        {/* REVEAL ANIMATION (Keeping this as it adds "Museum" luxury feel) */}
        <motion.div 
          className="absolute inset-0 z-10 bg-white"
          initial={{ height: "100%" }}
          whileInView={{ height: "0%" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        />
        
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          src={product.imageUrl}
          alt={product.name}
          // REMOVED grayscale and grayscale-0 here
          className="h-full w-full object-cover transition-all duration-1000"
        />
      </div>

      {/* TEXT: MUSEUM LABEL STYLE */}
      <div className="mt-8 max-w-[320px] mx-auto">
        <div className="flex justify-between items-start border-l border-neutral-200 pl-4 py-1">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-900">
              {product.name}
            </h3>
          </div>
          <span className="text-[11px] font-light text-neutral-900">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>
        
        {/* PROGRESSIVE DISCLOSURE */}
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: "auto" }}
          className="text-[9px] text-neutral-500 leading-relaxed mt-4 overflow-hidden pr-4"
        >
          {product.description}
        </motion.p>
      </div>
    </motion.div>
  );
}