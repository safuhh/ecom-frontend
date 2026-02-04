import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/adminApi";
import AdminNavbar from "./AdminNavbar";
import { motion } from "framer-motion";
import RevenueChart from "./RevenueChart";
const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!stats) {
    return (
      <>
        <AdminNavbar />
        <div className="md:ml-[80px] min-h-screen bg-white flex items-center justify-center px-4">
          <p className="text-sm text-gray-500 tracking-wide animate-pulse">
            Loading dashboard…
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      {/* MAIN CONTENT */}
      <main className="md:ml-[80px] min-h-screen bg-white px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
        <div className="mb-8 sm:mb-12 text-center relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -top-10 bg-gradient-to-b from-indigo-50/50 to-transparent blur-3xl -z-10"></div>

      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl sm:text-5xl font-light tracking-tight text-gray-950"
      >
        Admin <span className="font-serif italic text-black">Dashboard</span>
      </motion.h2>

      {/* Animated Underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "60px" }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="h-[2px] bg-black mx-auto mt-2 rounded"
      />

      {/* Subtitle with fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-4 text-xs sm:text-sm uppercase tracking-[0.15em] text-gray-400 font-medium"
      >
        Store Performance Overview
      </motion.p>
    </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <StatCard title="Total Orders" value={stats.totalOrders} />
            <StatCard title="Delivered" value={stats.deliveredOrders} />
            <StatCard title="Cancelled" value={stats.cancelledOrders} />
            <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} />
            <StatCard title="Pending Orders" value={stats.pendingOrders} />
          </div>
           <RevenueChart/>
        </div>
      </main>
      
    </>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Soft luxury glow (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block opacity-0 hover:opacity-100 transition duration-500">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-black/5 rounded-full blur-3xl" />
      </div>

      <p className="relative z-10 text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">
        {title}
      </p>

      <p className="relative z-10 mt-3 sm:mt-4 text-2xl sm:text-3xl font-semibold text-gray-900">
        {value}
      </p>
     
    </div>
    
  );
};

export default Dashboard;
