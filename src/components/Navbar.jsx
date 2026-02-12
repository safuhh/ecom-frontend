import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Added useEffect
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Menu, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/product?search=${search}`);
    setSearch("");
    setShowSearch(false);
    setOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Watches", path: "/product" },
    { name: "Cart", path: "/cart" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Profile", path: "/profile" },
    { name: "Login", path: "/login" },
  ];

  const menuVariants = {
    closed: { x: "100%", transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    opened: { x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    // Solid white background for the main bar
    <motion.nav className="fixed top-0 z-[100] w-full bg-white border-b border-gray-100">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12 md:py-6">
        
        {/* BRAND */}
        <Link to="/" className="text-2xl font-serif tracking-[0.3em] text-gray-900 uppercase relative z-[120]">
          Vyntra
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-[10px] uppercase tracking-[0.3em] font-medium text-gray-500 hover:text-black transition-colors">
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={() => setShowSearch(!showSearch)} 
            className="text-gray-800 hover:opacity-60 transition-opacity"
          >
            {showSearch ? <X size={20} strokeWidth={1.2} /> : <Search size={20} strokeWidth={1.2} />}
          </button>

          <Link to="/register" className="bg-gray-900 text-white px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all rounded-sm">
            Register
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="flex lg:hidden">
            <button onClick={() => setOpen(true)} className="p-1">
                <Menu size={24} strokeWidth={1.2} />
            </button>
        </div>
      </div>

      {/* DESKTOP SEARCH DROP */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100px", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="hidden lg:flex absolute top-full left-0 w-full bg-white border-b border-gray-100 items-center px-12 overflow-hidden shadow-sm"
          >
            <form onSubmit={handleSearch} className="w-full max-w-[800px] mx-auto flex items-center border border-gray-200 rounded-full px-6 py-3">
              <Search size={18} className="text-gray-400 mr-4" strokeWidth={1} />
              <input
                autoFocus
                type="text"
                placeholder="Search the collection..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm font-light outline-none bg-transparent"
              />
              <button type="submit" className="text-[10px] uppercase tracking-widest font-bold text-gray-900">Discover</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 z-[110] bg-white flex flex-col px-8 py-6 h-screen w-screen overflow-y-auto"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center mb-12">
              
              <button onClick={() => setOpen(false)} className="p-2 text-gray-900">
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-12 flex items-center border-b border-gray-100 py-3">
              <input
                type="text"
                placeholder="Search watches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-2xl font-serif font-light outline-none bg-transparent"
              />
              <button type="submit">
                <Search className="text-gray-400" size={20} strokeWidth={1} />
              </button>
            </form>

            {/* Navigation Links */}
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div 
                  key={link.name} 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i } }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-4xl font-serif tracking-tight text-gray-900">
                        {link.name}
                    </span>
                    <ArrowRight size={20} strokeWidth={1} className="text-gray-300 group-hover:text-black transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 pb-6">
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block w-full bg-gray-900 text-white text-center py-5 text-[10px] font-bold uppercase tracking-[0.3em] rounded-none"
              >
                Join the Maison
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}