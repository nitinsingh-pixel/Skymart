import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { CartProvider } from "../Context/CartContext";
import CartDrawer from "../components/CartDrawer";

const MainLayout = () => {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#0d0d0e]">
        <Navbar />

        <main className="flex-1 w-full">
          <Outlet />
        </main>

        
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default MainLayout;