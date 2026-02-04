import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "./Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed");
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="animate-pulse tracking-[0.3em] font-light uppercase">Vyntra</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans antialiased">
      <Navbar/>

      <header className="bg-white py-8 border-b border-gray-100 text-center">
        <h1 className="text-3xl tracking-[0.4em] font-extralight">V | T</h1>
        <p className="text-[10px] tracking-[0.3em] uppercase mt-2 text-gray-500">Vyntra Archive</p>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
  
          <aside className="w-full md:w-1/4">
            <nav className="flex flex-col space-y-8">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Account</h3>
                <ul className="space-y-4 text-[13px] tracking-wide uppercase">
                  <li><a href="/" className="hover:text-gray-500 transition-colors">Overview</a></li>
                  <li><a href="#" className="font-bold border-b border-black pb-1">Personal Details</a></li>
                  <li><a href="/my-orders" className="hover:text-gray-500 transition-colors">My Orders</a></li>
                  <li><a href="/product" className="hover:text-gray-500 transition-colors">Watches</a></li>
                </ul>
              </div>
              <button 
                onClick={handleLogout}
                className="text-left text-[11px] font-bold uppercase tracking-[0.2em] text-red-800 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </nav>
          </aside>

      
          <section className="flex-1 bg-white border border-gray-200 p-8 md:p-12 shadow-sm">
            <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-1">Personal Information</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Manage your account settings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
    
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">Username</label>
                <p className="text-[15px] font-medium tracking-wide">{user?.email?.split('@')[0] || "N/A"}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">Email Address</label>
                <p className="text-[15px] font-medium tracking-wide">{user?.email}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">Account Status</label>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <p className="text-[15px] font-medium tracking-wide">Verified Member</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">Location</label>
                <p className="text-[15px] font-medium tracking-wide text-gray-400 italic">Not provided</p>
              </div>
            </div>

       
            <div className="mt-16 bg-[#fdfdfd] border border-gray-100 p-6 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest mb-1">Vyntra Concierge</p>
                <p className="text-xs text-gray-500">Access exclusive watch releases and 24/7 support.</p>
              </div>
              <span className="text-xl">✦</span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Profile;