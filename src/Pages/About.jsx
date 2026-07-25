import React from "react";
import { useNavigate } from "react-router";
import { 
  Zap, 
  ShoppingBag, 
  Smile, 
  Star, 
  Truck, 
  ShieldCheck, 
  Zap as SpeedIcon, 
  Users, 
  Award, 
  ArrowRight 
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  
  const stats = [
    { label: "Products", value: "20K+", icon: ShoppingBag },
    { label: "Happy Customers", value: "50K+", icon: Smile },
    { label: "Avg. Rating", value: "4.9", icon: Star },
    { label: "On-Time Delivery", value: "99%", icon: Truck },
  ];

  
  const values = [
    {
      title: "Trust",
      description: "Every product is verified for quality and authenticity before listing.",
      icon: ShieldCheck,
    },
    {
      title: "Speed",
      description: "We obsess over delivery times so your orders arrive when promised.",
      icon: SpeedIcon,
    },
    {
      title: "Community",
      description: "Built around real customer feedback, not just business metrics.",
      icon: Users,
    },
    {
      title: "Quality",
      description: "We curate the best — no filler, no junk, just great products.",
      icon: Award,
    },
  ];

 
  const team = [
    { name: "Aryan Shah", role: "Founder & CEO", letter: "A" },
    { name: "Priya Mehta", role: "Head of Product", letter: "P" },
    { name: "Rohan Verma", role: "Lead Engineer", letter: "R" },
    { name: "Sneha Kapoor", role: "Design Director", letter: "S" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white p-4 sm:p-8 lg:p-12 space-y-12 font-sans selection:bg-[#ccff00] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-12">
        
        
        <div className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#ccff00] rounded-2xl shadow-[0_0_20px_rgba(204,255,0,0.3)] mb-2">
            <Zap className="w-7 h-7 text-black fill-black" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            About <span className="text-[#ccff00]">SkyMart</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            SkyMart is a next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 text-center flex flex-col items-center justify-center backdrop-blur-md hover:border-zinc-700 transition"
              >
                <Icon className="w-5 h-5 text-zinc-400 mb-2" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#ccff00] tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

      
        <div className="bg-[#09090a] border border-zinc-800 rounded-3xl p-8 sm:p-10 space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Story</h2>
          <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            <p>
              SkyMart started in 2022 as a small side project — two engineers tired of bloated, slow e-commerce experiences. We asked ourselves: <span className="text-zinc-200 font-medium">what if shopping online was actually enjoyable?</span>
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across the country. We stock electronics, fashion, jewelry, and everyday essentials — all at prices that don't require a second mortgage.
            </p>
            <p>
              We're still the same team at heart: obsessed with speed, transparency, and making you feel good about every purchase you make here.
            </p>
          </div>
        </div>

        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight text-center">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex items-start space-x-4 hover:border-zinc-700 transition"
                >
                  <div className="p-2.5 bg-zinc-800/80 rounded-xl text-[#ccff00] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{val.title}</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight text-center">
            Meet the Team
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-center flex flex-col items-center hover:border-zinc-700 transition"
              >
                <div className="w-12 h-12 bg-[#ccff00] text-black font-extrabold text-lg rounded-xl flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                  {member.letter}
                </div>
                <h3 className="font-bold text-sm text-white">{member.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

       
        <div className="bg-[#09090a] border border-zinc-800 rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to shop?
          </h2>
          <p className="text-zinc-400 text-sm">
            Explore thousands of products at unbeatable prices.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/main/products")}
              className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold py-3.5 px-8 rounded-xl transition duration-200 inline-flex items-center space-x-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)] cursor-pointer"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

       
        <footer className="pt-8 border-t border-zinc-900 text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-[#ccff00] rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-black fill-black" />
            </div>
            <span className="font-extrabold text-sm text-white">SkyMart</span>
          </div>
          <p className="text-xs text-zinc-600">
            © 2025 SkyMart • Built with React • Redux • Tailwind Query
          </p>
        </footer>

      </div>
    </div>
  );
};

export default About;