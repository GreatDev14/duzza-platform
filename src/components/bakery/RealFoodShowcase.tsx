"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UtensilsCrossed, Coffee, Sparkles, Clock, Flame, Award } from "lucide-react";
import Tilt3DCard from "@/components/animation/Tilt3DCard";

interface FoodItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  fermentation: string;
  image: string;
  tastingNotes: string[];
  description: string;
}

const REAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: "sourdough",
    name: "48-Hour Wild Yeast Sourdough Boule",
    subtitle: "Naturally Leavened Country Hearth Loaf",
    category: "Artisan Bread",
    fermentation: "48 Hours Cold Proof",
    // Ultra-high definition real photo of crusty golden artisan sourdough loaf
    image: "/images/bakery/sourdough-bread.jpg",
    tastingNotes: ["Caramelized Blistered Crust", "Custardy Open Crumb", "Mild Lactic Tang", "Flour Dusting"],
    description: "Baked daily on refractory stone hearths using stone-ground unbleached wheat flour, water, sea salt, and a 5-year-old living wild sourdough starter."
  },
  {
    id: "croissant",
    name: "Pure Butter French Croissant & Viennoiserie",
    subtitle: "27 Laminated Flaky Layers of Normandy Butter",
    category: "Morning Pastry",
    fermentation: "24 Hours Lamintation",
    // Ultra-high definition real photo of golden flaky French butter croissants
    image: "/images/bakery/butter-croissant.jpg",
    tastingNotes: ["Golden Honeycomb Interior", "Crisp Shatter Crust", "Rich Cultured Butter", "Airy Flakes"],
    description: "Hand-rolled and laminated with 84% fat European butter. Each croissant shatters gently on first bite, yielding a featherlight honeycomb crumb."
  },
  {
    id: "cakes",
    name: "Bespoke Multi-Tier Celebration Gateaux",
    subtitle: "Madagascan Vanilla & Belgian Chocolate Patisserie",
    category: "Confectionery",
    fermentation: "Fresh Artisanal Bake",
    // Ultra-high definition real photo of luxury handcrafted celebration cake
    image: "/images/bakery/celebration-cake.jpg",
    tastingNotes: ["Velvety Swiss Meringue", "Fresh Berry Coulis", "Valrhona Ganache", "Floral Accents"],
    description: "Custom celebratory and wedding confectionery crafted to order. Layered with infused cordials, delicate fruit compotes, and hand-sculpted botanical accents."
  },
  {
    id: "bistro",
    name: "Wood-Fired Gourmet Flatbreads & Eatery",
    subtitle: "Casual All-Day Bistro Dining",
    category: "Eatery Menu",
    fermentation: "Slow Dough Crust",
    // Ultra-high definition real photo of savory wood-fired bistro flatbread with fresh herbs
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85",
    tastingNotes: ["Charred Leopard Spots", "Creamy Buffalo Mozzarella", "Fresh Basil", "Cold-Pressed Olive Oil"],
    description: "Our upcoming bistro counter pairs hearth-baked flatbreads, vibrant seasonal salads, and single-origin roast espresso for all-day dining in Warri."
  }
];

export default function RealFoodShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeFood = REAL_FOOD_ITEMS[selectedIdx];

  return (
    <div className="space-y-6">
      {/* Main Interactive Real Food Stage */}
      <Tilt3DCard maxTilt={6} scale={1.01}>
        <div className="rounded-3xl bg-[#091224] border border-[#1B325C] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full">
          {/* Real High-Resolution Food Photo */}
          <div className="relative w-full lg:w-3/5 h-72 sm:h-96 lg:h-[440px] bg-[#0E1B33] overflow-hidden">
            <Image
              src={activeFood.image}
              alt={activeFood.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/80 via-transparent to-black/30" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#091224]/90 text-[#D4AF37] border border-[#D4AF37]/30 shadow-md backdrop-blur-md">
                {activeFood.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#050B18]/90 text-[#F5D77F] border border-[#1B325C] backdrop-blur-md flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{activeFood.fermentation}</span>
              </span>
            </div>

            {/* Bottom Photo Title */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl drop-shadow-md">
                {activeFood.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium drop-shadow-sm">
                {activeFood.subtitle}
              </p>
            </div>
          </div>

          {/* Food Details & Tasting Notes */}
          <div className="p-6 sm:p-8 w-full lg:w-2/5 flex flex-col justify-between space-y-6 bg-[#091224]">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold block">
                  Artisanal Provenance
                </span>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                  {activeFood.description}
                </p>
              </div>

              {/* Tasting Notes */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-bold block">
                  Flavor & Texture Profile
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeFood.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#0E1B33] border border-[#1B325C] text-[11px] font-medium text-[#CBD5E1]"
                    >
                      ✓ {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Culinary Guarantee */}
            <div className="p-3.5 rounded-2xl bg-[#0E1B33] border border-[#1B325C] flex items-center space-x-3 text-xs text-[#CBD5E1]">
              <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span>Baked fresh daily in Warri. Zero artificial preservatives or industrial additives.</span>
            </div>
          </div>
        </div>
      </Tilt3DCard>

      {/* 4 Interactive Food Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {REAL_FOOD_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setSelectedIdx(idx)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
              selectedIdx === idx
                ? "bg-[#D4AF37] text-[#050B18] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold"
                : "bg-[#091224] text-[#CBD5E1] border-[#1B325C] hover:bg-[#0E1B33] hover:border-[#D4AF37]/40"
            }`}
          >
            <span className={`text-[10px] font-mono uppercase font-bold ${selectedIdx === idx ? "text-[#050B18]" : "text-[#D4AF37]"}`}>
              0{idx + 1} • {item.category}
            </span>
            <span className="font-bold text-xs truncate block">
              {item.name.split(" ")[0]} {item.name.split(" ")[1]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

