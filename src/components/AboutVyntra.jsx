import React from 'react';
import ima from "../img/image.png"
/**
 * VYNTRA Premium About Component
 * Vibe: Minimalist Luxury, High Contrast, Architectural Layout
 */
const AboutSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 font-serif text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 block text-gray-500 font-sans">
            Est. 2026 — The Legacy
          </span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight mb-8">
            DEFINING THE <br /> 
            <span className="italic">Art of Time.</span>
          </h2>
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed font-sans">
            VYNTRA represents the intersection of horological heritage and avant-garde 
            engineering. We don’t just track hours; we curate the moments that define a lifetime.
          </p>
        </div>

        {/* Main Content & Imagery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Editorial Image */}
          <div className="md:col-span-7 relative group overflow-hidden bg-gray-50">
            <img 
              src={ima}
              alt="VYNTRA Heritage Chronograph" 
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
            />
            <div className="absolute bottom-8 left-8 bg-white p-6 shadow-sm hidden lg:block">
              <p className="text-sm tracking-widest uppercase font-bold">The Obsidian Series</p>
              <p className="text-xs text-gray-500 mt-1">Limited Edition — 001/500</p>
            </div>
          </div>

          {/* Right Side: Philosophy & Values */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-12">
            <div>
              <h3 className="text-2xl mb-4 tracking-wide uppercase font-medium">Craftsmanship</h3>
              <p className="text-gray-600 leading-loose font-sans">
                Every VYNTRA timepiece undergoes 400 hours of rigorous hand-assembly 
                in our atelier. Our master watchmakers harmonize centuries-old 
                Swiss movements with modern carbon-fiber composites to ensure 
                unrivaled precision.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-2 font-bold">Precision</h4>
                <p className="text-sm text-gray-500 font-sans leading-snug">Certified Chronometer accuracy in every heartbeat.</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-2 font-bold">Durability</h4>
                <p className="text-sm text-gray-500 font-sans leading-snug">Saphire glass housing with 20ATM water resistance.</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-2 font-bold">Elegance</h4>
                <p className="text-sm text-gray-500 font-sans leading-snug">Sleek, ergonomic profiles designed for the modern wrist.</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest uppercase mb-2 font-bold">Innovation</h4>
                <p className="text-sm text-gray-500 font-sans leading-snug">Patented tourbillon mechanics for the digital age.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Visual: Minimalism Focus */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-96 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600" 
                    alt="Detail view" 
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
            </div>
            <div className="h-96 flex flex-col items-center justify-center text-center p-10 border border-gray-100">
                <blockquote className="text-xl italic text-gray-800">
                    "Simplicity is the ultimate sophistication."
                </blockquote>
                <div className="w-12 h-[1px] bg-black my-6"></div>
                <span className="text-xs tracking-[0.4em] uppercase">The Vyntra Creed</span>
            </div>
            <div className="h-96 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" 
                    alt="Movement view" 
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;