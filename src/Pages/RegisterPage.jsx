import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { User, Mail, Lock, Eye, EyeOff, Zap, ArrowRight } from "lucide-react";
import { Auth } from "../Context/AuthContext";

const RegisterPage = () => {
  const { registeredUsers, setRegisteredUsers, setLoggedInUser } = useContext(Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailAlert, setEmailAlert] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const formSubmit = (data) => {
    setEmailAlert("");

    const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) {
      setEmailAlert("Email already registered!");
      toast.error("An account with this email already exists!");
      return;
    }

    const { confirmPassword, ...newUser } = data;

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    setLoggedInUser(newUser);

    localStorage.setItem("loggedinUser", JSON.stringify(newUser));
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    toast.success("Account created successfully!");
    reset();
    navigate("/main");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-[#ccff00] selection:text-black">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex items-center space-x-3 mb-8 z-10">
        <div className="w-10 h-10 bg-[#ccff00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]">
          <Zap className="w-6 h-6 text-black fill-black" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight text-white">
          Sky<span className="text-[#ccff00]">Mart</span>
        </span>
      </div>

      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-2xl z-10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(204,255,0,0.05)] hover:-translate-y-1">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create account
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Join SkyMart and start shopping
          </p>
        </div>

        {emailAlert && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-800/60 text-red-400 rounded-xl text-sm font-medium">
            {emailAlert}
          </div>
        )}

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^(?!\s*$).+/,
                    message: "Name cannot contain only spaces",
                  },
                })}
                type="text"
                placeholder="Full name"
                className="w-full pl-12 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition duration-200"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400 font-medium pl-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                  onChange: () => setEmailAlert(""),
                })}
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition duration-200"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 font-medium pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
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
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 chars)"
                className="w-full pl-12 pr-12 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition duration-200"
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
              <p className="text-xs text-red-400 font-medium pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (val) => val === password || "Passwords do not match",
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full pl-12 pr-12 py-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400 font-medium pl-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] disabled:opacity-50 cursor-pointer"
          >
            <span>Create Account</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            type="button"
            className="text-[#ccff00] hover:underline font-semibold cursor-pointer transition"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;