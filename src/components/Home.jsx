import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutSection from "./AboutVyntra";
import Footer from "./Footer";

import ProductList from "./ProductList";
import ima from "../img/rono.png";
import Navbar from "./Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-slate-900 font-sans selection:bg-slate-200 overflow-x-hidden">
      <Navbar/>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center text-black"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase font-light">Luxury Takes Time</span>
              <div className="h-[1px] w-24 bg-slate-200 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-black"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

   

      <main className="relative max-w-[1600px] mx-auto px-6 md:px-16 py-12 lg:py-24">
        {/* Background "2026" */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="absolute top-20 right-0 select-none pointer-events-none"
        >
          <span className="text-[20vw] font-bold text-slate-100 leading-none tracking-tighter">
            2026
          </span>
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* TEXT CONTENT BLOCK */}
          {/* Changed order-2 to order-1 so text appears first on mobile */}
          <div className="col-span-1 lg:col-span-5 z-10 order-1 lg:order-1 lg:pr-12">
            <div className="space-y-10">
              
              {/* Line and Est. */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <span className="h-[1px] w-12 bg-slate-400"></span>
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium text-slate-500">
                  Est. MANNARKKAD
                </span>
              </motion.div>

              {/* Main Heading: "The Art of Quiet Luxury" */}
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.8 }}
                className="text-6xl md:text-8xl font-light tracking-tight leading-[0.85] text-slate-900"
              >
                <span className="italic block mb-2">The Art of</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="font-semibold"
                >
                  Quiet Luxury.
                </motion.span>
              </motion.h1>

              {/* Sub-line / Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.8 }}
                className="max-w-sm space-y-8"
              >
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
              </motion.div>
            </div>
          </div>

          {/* IMAGE BLOCK */}
          {/* Changed order-1 to order-2 so image appears after text on mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 1.5, ease: "easeOut" }}
            className="col-span-1 lg:col-span-7 order-2 lg:order-2 -mx-6 md:mx-0 mt-8 lg:mt-0" 
          >
            <div className="relative group overflow-hidden flex justify-center items-center">
              <div className="relative w-full lg:max-w-[770px]">
                <img
                  src={ima}
                  alt="Luxury Watch"
                  className="w-full h-[50vh] md:h-auto object-cover md:object-contain grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 md:rounded-lg"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <AboutSection />
        <ProductList />
        <Footer />
      </motion.div>
    </div>
  );
}