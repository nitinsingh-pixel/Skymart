import React from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../Context/CartContext";

const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#121214] text-white h-full flex flex-col shadow-2xl p-6 border-l border-zinc-800 animate-in slide-in-from-right duration-300">
        
       
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#ccff00]" />
            <h2 className="text-lg font-bold">Cart</h2>
            <span className="bg-[#ccff00]/20 text-[#ccff00] text-xs px-2 py-0.5 rounded-full font-bold">
              {totalItems} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
              <ShoppingBag className="w-16 h-16 text-zinc-600" />
              <p className="text-zinc-400 text-sm">Cart is empty</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#ccff00] text-black font-bold text-xs px-6 py-3 rounded-xl"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-zinc-900/80 p-3 rounded-2xl border border-zinc-800"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">{item.title}</h4>
                  <p className="text-[#ccff00] text-sm font-bold">${item.price}</p>
                  
                  
                  <div className="flex items-center gap-3 mt-2 bg-zinc-950 px-2 py-1 rounded-lg w-max border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, Number(item.quantity) - 1)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, Number(item.quantity) + 1)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

               
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-zinc-500 hover:text-red-400 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-[#ccff00]">${totalPrice}</span>
            </div>

            <button className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black py-3.5 rounded-2xl transition">
              Checkout →
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="w-full text-zinc-500 hover:text-red-400 text-xs text-center"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;