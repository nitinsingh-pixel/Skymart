import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { Zap, ShoppingBag, LogOut } from "lucide-react";
import { Auth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext"; 

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(Auth);
  const { setIsCartOpen, totalItems } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedinUser");
    toast.warn("Logged out successfully");
    setLoggedInUser(null);
    navigate("/");
  };

  const getUserInitial = () => {
    if (!loggedInUser?.name) return "N";
    return loggedInUser.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="w-full bg-[#0d0d0e] border-b border-zinc-800/80 px-6 sm:px-12 py-4 sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        
     
        <div 
          onClick={() => navigate("/main")} 
          className="flex items-center space-x-3 cursor-pointer select-none flex-1 justify-start"
        >
          <div className="w-9 h-9 bg-[#ccff00] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            <Zap className="w-5 h-5 text-black fill-black" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            Sky<span className="text-[#ccff00]">Mart</span>
          </span>
        </div>

      
        <div className="flex items-center justify-center space-x-10 flex-1">
          <NavLink
            to="/main"
            end
            className={({ isActive }) =>
              isActive
                ? "text-[#ccff00] font-bold text-sm transition-colors duration-200"
                : "text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-200"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/main/products"
            className={({ isActive }) =>
              isActive
                ? "text-[#ccff00] font-bold text-sm transition-colors duration-200"
                : "text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-200"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/main/about"
            className={({ isActive }) =>
              isActive
                ? "text-[#ccff00] font-bold text-sm transition-colors duration-200"
                : "text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-200"
            }
          >
            About
          </NavLink>
        </div>

       
        <div className="flex items-center justify-end space-x-3 flex-1">
         
          <div className="flex items-center space-x-2.5 bg-zinc-900/90 border border-zinc-800/80 px-3.5 py-1.5 rounded-xl">
            <div className="w-5 h-5 bg-[#ccff00] text-black font-extrabold rounded-md flex items-center justify-center text-[11px]">
              {getUserInitial()}
            </div>
            <span className="text-sm font-semibold text-zinc-200 max-w-[130px] truncate">
              {loggedInUser?.name || "Nitin Singh"}
            </span>
          </div>

          
          <button
            onClick={() => setIsCartOpen(true)} 
            type="button"
            className="relative p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700 transition cursor-pointer"
            title="Cart"
          >
            <ShoppingBag className="w-4 h-4" />

            
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ccff00] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0d0d0e]">
                {totalItems}
              </span>
            )}
          </button>

        
          <button
            onClick={handleLogout}
            type="button"
            className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;