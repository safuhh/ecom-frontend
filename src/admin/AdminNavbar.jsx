import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      toast.success("Logged Out");
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err) {
      toast.error("Error");
    }
  };

  const navLinkStyles = ({ isActive }) =>
    `text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-500 hover:opacity-50 ${
      isActive ? "text-black border-b border-black pb-1" : "text-gray-400"
    }`;

  return (
    <nav className="w-full bg-white border-b border-gray-50 sticky top-0 z-50">

      <div className="w-full bg-gray-50 py-1.5 px-10 flex justify-end">
        <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-semibold">
          Vyntra Internal Systems — 2026
        </span>
      </div>

      <div className="max-w-[1800px] mx-auto px-10 h-24 flex items-center">
        

        <div className="flex-1 hidden lg:flex items-center gap-10">
          <NavLink to="/adminproduct" className={navLinkStyles}>Update</NavLink>
          <NavLink to="/admin/products" className={navLinkStyles}>Collection</NavLink>
        </div>


        <div className="flex-1 flex justify-center">
          <div className="text-center group cursor-pointer">
            <h1 className="text-3xl font-serif tracking-[0.4em] text-gray-900 uppercase transition-all duration-700 group-hover:tracking-[0.5em]">
              VYNTRA
            </h1>
            <p className="text-[9px] uppercase tracking-[0.6em] text-amber-700 font-bold ml-1 mt-1">
              Administrator
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-end items-center gap-12">
           <NavLink to="/admin/orders" className={navLinkStyles}>Orders</NavLink>
           <NavLink to="/admin/users" className={navLinkStyles}>Users</NavLink>
           
           <div className="h-6 w-[1px] bg-gray-200"></div>

           <button
            onClick={handleLogout}
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 hover:text-red-800 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}