import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          Vyntra
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link className="hover:text-gray-900 transition" to="/product">
            Products
          </Link>
          <Link className="hover:text-gray-900 transition" to="/cart">
            Cart
          </Link>
          <Link className="hover:text-gray-900 transition" to="/wish">
            Wishlist
          </Link>
           <Link className="hover:text-gray-900 transition" to="/profile">
            Profile
          </Link>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
          <Link onClick={() => setOpen(false)} to="/product" className="block">
            Products
          </Link>
          <Link onClick={() => setOpen(false)} to="/Cart" className="block">
            Cart
          </Link>
          <Link onClick={() => setOpen(false)} to="/wishlist" className="block">
            Wishlist
          </Link>
          <Link onClick={() => setOpen(false)} to="/profile" className="block">
            Profile
          </Link>
          <hr />

          <Link onClick={() => setOpen(false)} to="/login" className="block">
            Login
          </Link>
       <Link
  onClick={() => setOpen(false)}
  to="/register"
  className="block rounded-full bg-gray-50 border border-gray-200 px-8 py-3 text-center text-xs font-bold uppercase tracking-widest text-gray-700 transition-all hover:bg-white hover:border-gray-400 hover:text-black"
>
  Get Started
</Link>
        </div>
      )}
    </nav>
  );
}
