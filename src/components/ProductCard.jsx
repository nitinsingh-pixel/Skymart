import React from "react";
import { Link } from "react-router";
import { Star, Check, ShoppingCart } from "lucide-react";
import { useCart } from "../Context/CartContext";

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();

  const isAdded = cartItems.some((item) => item.id === product.id);

  const ratingValue = product.rating?.rate || 4.5;
  const reviewCount = product.rating?.count || 120;

  return (
    <div className="group relative bg-[#121214] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#ccff00]/50 hover:shadow-[0_0_25px_rgba(204,255,0,0.15)] transition-all duration-300">
      <Link
        to={`/main/products/${product.id}`}
        className="block relative bg-white p-6 aspect-square overflow-hidden group-hover:opacity-95 transition"
      >
        <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-zinc-700/60 z-10 capitalize">
          {product.category || "General"}
        </span>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col justify-between flex-1 bg-[#121214]">
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-zinc-500 capitalize">
            {product.category}
          </p>

          <Link
            to={`/main/products/${product.id}`}
            className="text-sm font-bold text-white line-clamp-1 hover:text-[#ccff00] transition-colors"
            title={product.title}
          >
            {product.title}
          </Link>

          <div className="flex items-center space-x-1.5 pt-1">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(ratingValue)
                      ? "fill-amber-400 text-amber-400"
                      : "text-zinc-700 fill-zinc-800"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-zinc-400">
              ({reviewCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-800/60">
          <span className="text-lg font-black text-white">
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isAdded
                ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40"
                : "bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 fill-black" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;