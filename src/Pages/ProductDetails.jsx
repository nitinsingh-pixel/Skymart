import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { 
  Star, 
  ShoppingCart, 
  Check, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useCart } from "../Context/CartContext";
import ProductCard from "../components/ProductCard";

const TOTAL_PRODUCTS = 20;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, setIsCartOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentId = parseInt(id, 10);

  const cartItem = cartItems.find((item) => Number(item.id) === currentId);
  const isAdded = Boolean(cartItem);
  const currentCartQuantity = cartItem ? Number(cartItem.quantity) : 1;

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`https://fakestoreapi.com/products/${currentId}`);
        setProduct(res.data);

        if (res.data?.category) {
          const allRes = await axios.get("https://fakestoreapi.com/products");
          const related = allRes.data.filter(
            (item) => item.category === res.data.category && item.id !== currentId
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentId) {
      fetchProductAndRelated();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentId]);

  const handlePrevious = () => {
    const prevId = currentId <= 1 ? TOTAL_PRODUCTS : currentId - 1;
    navigate(`/main/products/${prevId}`);
  };

  const handleNext = () => {
    const nextId = currentId >= TOTAL_PRODUCTS ? 1 : currentId + 1;
    navigate(`/main/products/${nextId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-zinc-400 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#ccff00]/30 blur-2xl animate-pulse" />
          <Loader2 className="w-12 h-12 animate-spin text-[#ccff00] relative z-10" />
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 animate-pulse">
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (!product) return null;

  const ratingValue = product.rating?.rate || 4.5;
  const reviewCount = product.rating?.count || 120;

  return (
    <div className="min-h-screen bg-[#070709] text-white p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
      
      <nav className="flex items-center space-x-2 text-xs font-semibold text-zinc-400 capitalize">
        <Link to="/main/products" className="hover:text-white transition">
          Products
        </Link>
        <span>/</span>
        <span className="text-zinc-500">{product.category}</span>
        <span>/</span>
        <span className="text-white truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#121214] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        <div className="bg-white p-8 rounded-2xl aspect-square flex items-center justify-center overflow-hidden border border-zinc-700/50 relative group">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="inline-block bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center space-x-2 pt-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(ratingValue)
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-700 fill-zinc-800"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white">{ratingValue}</span>
              <span className="text-xs text-zinc-400">({reviewCount} reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-black text-[#ccff00]">
            ${Number(product.price).toFixed(2)}
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed border-t border-b border-zinc-800/80 py-4">
            {product.description}
          </p>

          <div className="space-y-4 pt-2">
            {isAdded ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-4 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl w-fit">
                  <span className="text-xs text-zinc-400 px-2 font-semibold">In cart:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, currentCartQuantity - 1)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white transition active:scale-95 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">
                      {currentCartQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, currentCartQuantity + 1)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white transition active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>Added to Cart</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(true)}
                    className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold py-3.5 px-6 rounded-2xl flex items-center space-x-2 transition active:scale-95 shadow-[0_5px_15px_rgba(204,255,0,0.2)] cursor-pointer"
                  >
                    <span>View Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                  setIsCartOpen(true);
                }}
                className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition active:scale-95 shadow-[0_10px_25px_rgba(204,255,0,0.2)] cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 fill-black" />
                <span>Add To Cart</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80">
            <div className="flex flex-col items-center justify-center p-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
              <Truck className="w-5 h-5 text-[#ccff00] mb-1" />
              <span className="text-[11px] font-bold text-white">Free Delivery</span>
              <span className="text-[9px] text-zinc-500">On orders $50+</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
              <ShieldCheck className="w-5 h-5 text-[#ccff00] mb-1" />
              <span className="text-[11px] font-bold text-white">Secure Pay</span>
              <span className="text-[9px] text-zinc-500">256-Bit SSL</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
              <RotateCcw className="w-5 h-5 text-[#ccff00] mb-1" />
              <span className="text-[11px] font-bold text-white">Easy Returns</span>
              <span className="text-[9px] text-zinc-500">30-Day Policy</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 px-4 bg-[#ccff00] hover:bg-[#b8e600] text-black rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition cursor-pointer active:scale-95 shadow-[0_5px_15px_rgba(204,255,0,0.15)]"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;