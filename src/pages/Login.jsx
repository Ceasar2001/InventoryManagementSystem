import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    

    try {
        const response = await axios.post("http://localhost:3000/api/auth/login", {email, password});

        if(response.data.success){
            await login(response.data.user, response.data.token);

            if(response.data.user.role === "admin"){
                navigate("/admin/dashboard");
            }else{
                navigate("/staff/dashboard");
            }
        }else{
            alert(response.data.message);
        }

    } catch (error) {
        if(error.response) {
            setError(error.response.data.message);
        }
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1a3f] to-[#0f2557] px-4">

      {/* Top Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-wide drop-shadow-lg text-center">
        INVENTORY MANAGEMENT SYSTEM
      </h2>

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-12">

        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Login
        </h1>
        {error && (
            <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-200 mb-2 text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="px-5 py-3 rounded-xl bg-white/20 text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with Show/Hide Icon */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-gray-200 mb-2 text-lg">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="px-5 py-3 pr-12 rounded-xl bg-white/20 text-white text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-15 -translate-y-1/2 text-gray-300 hover:text-white transition cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={26} />
              ) : (
                <AiOutlineEye size={26} />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold transition-all duration-200 shadow-lg cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-300 text-lg mt-6">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-400 font-semibold hover:underline hover:text-blue-300 transition"
            >
              Sign Up
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
