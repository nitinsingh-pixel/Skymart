import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { 
  ShoppingBag, 
  DollarSign, 
  Star, 
  Grid, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Tag, 
  ChevronRight, 
  ShoppingCart,
  Clock
} from "lucide-react";
import { useCart } from "../Context/CartContext";
import { Auth } from "../Context/AuthContext";

const categoriesList = [
  { name: "Electronics", count: "6 items", slug: "electronics" },
  { name: "Clothing", count: "10 items", slug: "clothing" },
  { name: "Jewelery", count: "4 items", slug: "jewelery" },
  { name: "Men's Wear", count: "4 items", slug: "men's clothing" },
  { name: "Women's Wear", count: "6 items", slug: "women's clothing" },
  { name: "Accessories", count: "4 items", slug: "jewelery" }
];

const Home = () => {
  const navigate = useNavigate();
  const { totalPrice, totalItems, addToCart } = useCart();
  const { loggedInUser } = useContext(Auth) || {};
  
  const [products, setProducts] = useState([]);

  const userName = loggedInUser?.name || "Nitin";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching home products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/main/products?category=${encodeURIComponent(slug)}`);
  };

  const topRatedProducts = products.slice(0, 5);
  const newArrivals = products.slice(5, 10);

  return (
    <div className="min-h-screen bg-[#070709] text-white p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-12 font-sans">
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#121214] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4 z-10">
              <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#ccff00] uppercase">
                <Sparkles className="w-3 h-3 text-[#ccff00]" />
                <span>GOOD MORNING ☀️</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                Welcome back, <br />
                <span className="text-[#ccff00]">{userName}!</span>
              </h1>

              <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                Discover today's picks — hand-curated products across electronics, fashion, and more.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-8 z-10">
              <button
                type="button"
                onClick={() => navigate("/main/products")}
                className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3.5 rounded-2xl flex items-center space-x-2 transition active:scale-95 shadow-[0_5px_20px_rgba(204,255,0,0.2)] cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate("/main/products")}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white font-bold px-6 py-3.5 rounded-2xl transition active:scale-95 cursor-pointer"
              >
                View All Products
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="bg-[#121214] border border-zinc-800/80 rounded-3xl p-6 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden group hover:border-zinc-700 transition">
              <div className="text-4xl font-black text-[#ccff00]">20+</div>
              <div className="text-xs font-semibold text-zinc-400">Products Available</div>
            </div>

            <div className="bg-[#121214] border border-zinc-800/80 rounded-3xl p-6 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden group hover:border-zinc-700 transition">
              <div className="text-3xl font-black text-white">Free</div>
              <div className="text-xs font-semibold text-zinc-400">Delivery on $100+</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-white">{totalItems || 0}</div>
              <div className="text-[11px] text-zinc-400 font-medium">Cart Items in your bag</div>
            </div>
          </div>

          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-white">
                ${totalPrice ? Number(totalPrice).toFixed(2) : "0.00"}
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">Cart Value Ready to checkout</div>
            </div>
          </div>

          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00]">
              <Star className="w-5 h-5 fill-[#ccff00]" />
            </div>
            <div>
              <div className="text-lg font-black text-white">5</div>
              <div className="text-[11px] text-zinc-400 font-medium">Top Products Highly rated</div>
            </div>
          </div>

          <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-4 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00]">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-white">6</div>
              <div className="text-[11px] text-zinc-400 font-medium">Categories To explore</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">Shop by Category</h2>
          <button
            type="button"
            onClick={() => navigate("/main/products")}
            className="text-xs font-extrabold text-zinc-400 hover:text-white flex items-center space-x-1 transition cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 text-[#ccff00]" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoriesList.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.slug)}
              className="bg-[#121214] border border-zinc-800/80 hover:border-[#ccff00]/50 rounded-2xl p-6 cursor-pointer transition flex flex-col justify-between group active:scale-95"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-white group-hover:text-[#ccff00] transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-500 font-medium">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-[#ccff00] fill-[#ccff00]" />
              <h2 className="text-2xl font-black text-white tracking-tight">Top Rated</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/main/products")}
              className="text-xs font-extrabold text-zinc-400 hover:text-white flex items-center space-x-1 transition cursor-pointer"
            >
              <span>See all</span>
              <ChevronRight className="w-4 h-4 text-[#ccff00]" />
            </button>
          </div>

          <div className="space-y-3">
            {topRatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/main/products/${item.id}`)}
                className="bg-[#121214] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-4 flex items-center justify-between group cursor-pointer transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white p-2 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="max-h-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ccff00] transition truncate max-w-[180px] sm:max-w-[240px]">
                      {item.title}
                    </h4>
                    <div className="text-sm font-black text-[#ccff00]">
                      ${Number(item.price).toFixed(2)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#ccff00] hover:text-black text-zinc-300 transition cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#ccff00]" />
              <h2 className="text-2xl font-black text-white tracking-tight">New Arrivals</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/main/products")}
              className="text-xs font-extrabold text-zinc-400 hover:text-white flex items-center space-x-1 transition cursor-pointer"
            >
              <span>See all</span>
              <ChevronRight className="w-4 h-4 text-[#ccff00]" />
            </button>
          </div>

          <div className="space-y-3">
            {newArrivals.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/main/products/${item.id}`)}
                className="bg-[#121214] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-4 flex items-center justify-between group cursor-pointer transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white p-2 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="max-h-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ccff00] transition truncate max-w-[180px] sm:max-w-[240px]">
                      {item.title}
                    </h4>
                    <div className="text-sm font-black text-[#ccff00]">
                      ${Number(item.price).toFixed(2)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-[#ccff00] hover:text-black text-zinc-300 transition cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80">
        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00] flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Fast Delivery</h4>
            <p className="text-xs text-zinc-400">Same day delivery on select items</p>
          </div>
        </div>

        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00] flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Secure Payments</h4>
            <p className="text-xs text-zinc-400">100% encrypted checkout</p>
          </div>
        </div>

        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-5 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00] flex-shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Best Prices</h4>
            <p className="text-xs text-zinc-400">Price match guarantee</p>
          </div>
        </div>
      </div>

      <footer className="pt-8 border-t border-zinc-800/80 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 bg-[#ccff00] rounded-lg flex items-center justify-center text-black font-black text-xs">
            S
          </div>
          <span className="text-lg font-black text-white">SkyMart</span>
        </div>
        <p className="text-xs text-zinc-500">
          © 2026 SkyMart — Built with React + Tailwind CSS
        </p>
      </footer>

    </div>
  );
};

export default Home;