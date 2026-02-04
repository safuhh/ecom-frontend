import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminNavbar from "./AdminNavbar";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  const toggleBlock = async (id, isBlocked) => {
    await api.put(
      isBlocked ? `/admin/unblock/${id}` : `/admin/block/${id}`
    );
    fetchUsers();
  };

  const changeRole = async (id, role) => {
    await api.put(`/admin/role/${id}`, { role });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <div className="min-h-screen bg-white p-4 md:p-8 font-sans antialiased text-slate-900">
    <AdminNavbar/>
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-800">User Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage permissions and account status for your members.</p>
        </div>
        <div className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full w-fit">
          {users.length} Total Users
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((u) => (
          <div 
            key={u._id} 
            className="group flex flex-col lg:flex-row lg:items-center justify-between p-4 md:p-6 rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-200 gap-6"
          >
            {/* Left: User Info */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="h-10 w-10 md:h-12 md:w-12 shrink-0 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-medium">
                {u.email.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-slate-700 truncate">{u.email}</span>
                <span className="text-xs text-slate-400 mt-0.5 tracking-wide">ID: {u._id.slice(-6)}</span>
              </div>
            </div>

            {/* Right: Controls Container */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 md:gap-8 border-t lg:border-none pt-4 lg:pt-0">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${u.isBlocked ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                <span className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider ${u.isBlocked ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {u.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>

              {/* Action Group */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Role Selector */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u._id, e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-none text-xs font-medium text-slate-600 py-2.5 pl-4 pr-10 rounded-full cursor-pointer hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-slate-200 outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => toggleBlock(u._id, u.isBlocked)}
                  className={`flex-1 sm:flex-none text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 md:px-6 py-2.5 rounded-full transition-all duration-200 ${
                    u.isBlocked 
                    ? "bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200" 
                    : "border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
                  }`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
