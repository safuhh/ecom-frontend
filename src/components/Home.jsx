import React from "react";
import AboutSection from "./AboutVyntra";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import ima from "../img/rono.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-slate-900 font-sans selection:bg-slate-200">
      <Navbar />

      <main className="relative max-w-[1600px] mx-auto px-6 md:px-16 py-12 lg:py-24">
        {/* Background Watermark - Static */}
        <div className="absolute top-20 right-0 select-none pointer-events-none opacity-40">
          <span className="text-[20vw] font-bold text-slate-100 leading-none tracking-tighter">
            2026
          </span>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Section 1: Text */}
          <div className="col-span-1 lg:col-span-5 z-10 order-2 lg:order-1 lg:pr-12">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-slate-400"></span>
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium text-slate-500">
                  Est. MANNARKKAD
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.85] text-slate-900">
                <span className="italic block mb-2">The Art of</span>
                <span className="font-semibold">Quiet Luxury.</span>
              </h1>

              <div className="max-w-sm space-y-8">
                <p className="text-slate-500 text-lg leading-relaxed font-light border-l border-slate-200 pl-6">
                  Sourced from the finest watchmakers in Switzerland. A
                  testament to precision and understated class.
                </p>

                <button className="group flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-bold">
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                      Explore Collection
                    </span>
                    <span className="absolute top-full block transition-transform duration-500 group-hover:-translate-y-full">
                      Explore Collection
                    </span>
                  </span>
                  <span className="w-12 h-[1px] bg-slate-900 group-hover:w-20 transition-all duration-700"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-7 order-1 lg:order-2">
            <div className="relative group overflow-hidden flex justify-center items-center rounded-lg">
              <div className="relative w-full lg:max-w-[770px]">
                <img
                  src={ima}
                  alt="Luxury Watch"
                  className="
          w-full h-auto object-contain
          grayscale-[20%] group-hover:grayscale-0
          transition-all duration-1000
          rounded-lg
        "
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Other Sections */}
      <div>
        <AboutSection />
        <ProductList />
        <Footer />
      </div>

      <style jsx global>{`
        body {
          background-color: #fcfcfc;
        }
      `}</style>
    </div>
  );
}
