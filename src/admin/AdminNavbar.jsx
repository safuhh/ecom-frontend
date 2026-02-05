import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../api/axios";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      toast.success("Session Terminated");
      
      navigate("/login");
    } catch (err) {
      toast.error("Logout Failed");
    }
  };

  const navItems = [
    { to: "/dash", label: "Dashboard" },
    { to: "/adminproduct", label: "Products" },
    { to: "/admin/managment", label: "Orders" },
    { to: "/admin/users", label: "Users" },
  ];

  return (
    <>
      {/* FIXED TOP NAV */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white z-[1000] border-b border-gray-100 flex items-center justify-between px-4 sm:px-8">
        
       {/* BRAND */}
<div className="flex items-center gap-6 cursor-pointer group">
  {/* THE ICON: THE SILENT 'V' */}
  <div className="relative w-12 h-12 flex items-center justify-center">
    {/* Ultra-thin architectural circle */}
    <div className="absolute inset-0 border-[0.5px] border-gray-200 rounded-full transition-colors duration-700 group-hover:border-black" />
    
    {/* THE V: Serif/Sharp Aesthetic */}
    <div className="relative">
      <span className="text-2xl font-serif font-light text-black tracking-tighter">
        V
      </span>
      {/* Precision Dot - Smaller, No Glow, Just Black */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[2px] h-[2px] bg-black rounded-full" />
    </div>
  </div>

  {/* THE TEXT: SPACIOUS & MINIMAL */}
  <div className="flex flex-col py-1">
    <div className="flex flex-col">
      <h1 className="text-[15px] font-medium tracking-[0.5em] text-black leading-tight uppercase">
        Vyntra
      </h1>
      <span className="text-[6px] font-medium tracking-[0.6em] text-gray-400 uppercase mt-1">
        Controll Center
      </span>
    </div>
  </div>
  
  {/* The "Invisible" Divider */}
  <div className="h-4 w-[1px] bg-gray-100 ml-2" />
</div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center h-full">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative px-6 h-full flex items-center text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300
                 ${isActive ? "text-black" : "text-gray-400 hover:text-black"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black shadow-[0_-4px_10px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-1 duration-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between w-6 h-5"
          >
            <span className={`block h-[2px] w-full bg-black transition-transform ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block h-[2px] w-full bg-black transition-opacity ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block h-[2px] w-full bg-black transition-transform ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>

        {/* RIGHT ACTIONS (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] font-bold text-gray-900">Admin User</span>
            <span className="text-[8px] text-green-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> SYSTEM ONLINE
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 px-4 py-2 border border-black rounded-full hover:bg-black transition-all duration-300"
          >
            <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-white">Exit</span>
            <div className="group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE MENU */}
      <div className={`lg:hidden fixed top-16 left-0 w-full bg-white shadow-md transition-transform duration-300 z-50 ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex flex-col py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-6 py-3 text-sm font-bold uppercase ${isActive ? "text-black" : "text-gray-500 hover:text-black"}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* MOBILE LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-2 mx-6 px-4 py-2 border border-black rounded-full text-xs font-bold uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            Exit
          </button>
        </div>
      </div>

      {/* SPACER */}
      <div className="h-16 w-full"></div>
    </>
  );
}
