import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight, AlertCircle } from "lucide-react";
import { Auth } from "../Context/AuthContext";

const LoginPage = () => {
  const { registeredUsers, setLoggedInUser } = useContext(Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const formSubmit = (data) => {
    setAuthError("");

    const user = registeredUsers.find(
      (val) => val.email === data.email && val.password === data.password
    );

    if (!user) {
      setAuthError("Invalid email or password");
      return;
    }

    setLoggedInUser(user);
    localStorage.setItem("loggedinUser", JSON.stringify(user));
    toast.success("User logged in successfully!");
    reset();
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white flex flex-col lg:flex-row font-sans selection:bg-[#ccff00] selection:text-black">
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800/80 relative overflow-hidden bg-gradient-to-br from-zinc-900 via-[#0d0d0e] to-black">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3 z-10">
          <div className="w-10 h-10 bg-[#ccff00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.4)]">
            <Zap className="w-6 h-6 text-black fill-black" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Sky<span className="text-[#ccff00]">Mart</span>
          </span>
        </div>

        <div className="my-12 lg:my-0 space-y-6 max-w-lg z-10">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#ccff00] bg-[#ccff00]/10 rounded-full border border-[#ccff00]/20">
            Welcome Back
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Shop the future. <br />
            <span className="text-[#ccff00] drop-shadow-[0_0_25px_rgba(204,255,0,0.3)]">
              Today.
            </span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 z-10">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md text-center hover:border-zinc-700 transition">
            <h3 className="text-xl sm:text-2xl font-bold text-[#ccff00]">20K+</h3>
            <p className="text-xs text-zinc-400 mt-1">Products</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md text-center hover:border-zinc-700 transition">
            <h3 className="text-xl sm:text-2xl font-bold text-[#ccff00]">50K+</h3>
            <p className="text-xs text-zinc-400 mt-1">Users</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md text-center hover:border-zinc-700 transition">
            <h3 className="text-xl sm:text-2xl font-bold text-[#ccff00]">4.9★</h3>
            <p className="text-xs text-zinc-400 mt-1">Rating</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-[#09090a]">
        <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:shadow-[0_10px_30px_rgba(204,255,0,0.05)]">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Sign in</h2>
            <p className="text-zinc-400 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          {authError && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-[#2a1215] border border-red-900/60 text-red-400 text-sm font-medium flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  onChange={() => setAuthError("")}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                  })}
                  onChange={() => setAuthError("")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] disabled:opacity-50 cursor-pointer"
            >
              <span>Sign in</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="text-[#ccff00] hover:underline font-semibold cursor-pointer transition"
            >
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;