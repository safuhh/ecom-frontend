import { useState } from "react";
import { useDispatch } from "react-redux";
import {  toast } from "react-toastify";

import api from "../api/axios";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 const navigate = useNavigate(); 
  const loginUser = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/user/login", { email, password });
    console.log(res.data);


    dispatch(
      loginSuccess({
        token: res.data.token,
        user: res.data.user,
      })
    );

    toast.success("Login successful");


    if (res.data.user.role === "admin") {
      navigate("/dashboard"); 
    } else {
      navigate("/");
    }
  } catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message || "Login failed");
  }
};


 return (
  <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6] px-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-12 border border-black/5">

      {/* Brand */}
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[0.45em] uppercase text-gray-500">
          Vyntra
        </span>
        <h2 className="mt-4 text-3xl font-serif text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Enter your details to continue
        </p>
      </div>

      <form className="space-y-6" onSubmit={loginUser}>
        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="you@vyntra.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-8 py-3 text-sm tracking-widest uppercase bg-black text-white hover:bg-gray-900 transition rounded-full"
        >
          Sign In
        </button>
      </form>

      {/* Footer */}
      <p className="mt-10 text-center text-xs text-gray-500 tracking-wide">
        New to Vyntra?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-black hover:underline"
        >
          Create an account
        </button>
      </p>
    </div>
  </div>
);

}

export default Login;
