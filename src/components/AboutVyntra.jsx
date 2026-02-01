import React from 'react';
import { motion } from 'framer-motion';
import ima from "../img/image.png";

const AboutSection = () => {
  // Animation variants for the text lines
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 font-serif text-[#1a1a1a] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with Scroll Reveal */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center md:text-left"
        >
          <motion.span variants={fadeUp} className="text-xs tracking-[0.3em] uppercase mb-4 block text-gray-400 font-sans">
            Est. 2026 — The Legacy
          </motion.span>
          
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-light tracking-tight leading-tight mb-8">
            DEFINING THE <br /> 
            <span className="italic">Art of Time.</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed font-sans">
            VYNTRA represents the intersection of horological heritage and avant-garde 
            engineering. We don’t just track hours; we curate the moments that define a lifetime.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Main Image with Mask Effect */}
          <motion.div 
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
            className="md:col-span-7 relative group overflow-hidden bg-gray-50"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src={ima}
              alt="VYNTRA Heritage Chronograph" 
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-8 left-8 bg-white p-6 shadow-sm hidden lg:block">
              <p className="text-sm tracking-widest uppercase font-bold">The Obsidian Series</p>
              <p className="text-xs text-gray-500 mt-1">Limited Edition — 001/500</p>
            </div>
          </motion.div>

          {/* Right Column Staggered Entrance */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
            className="md:col-span-5 flex flex-col justify-center space-y-12"
          >
            <motion.div variants={fadeUp}>
              <h3 className="text-2xl mb-4 tracking-wide uppercase font-medium">Craftsmanship</h3>
              <p className="text-gray-600 leading-loose font-sans">
                Every VYNTRA timepiece undergoes 400 hours of rigorous hand-assembly 
                in our atelier. Our master watchmakers harmonize centuries-old 
                Swiss movements with modern carbon-fiber composites.
              </p>
            </motion.div>

            {/* Feature List Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              {[
                { title: "Precision", desc: "Certified Chronometer accuracy." },
                { title: "Durability", desc: "20ATM water resistance." },
                { title: "Elegance", desc: "Ergonomic profiles." },
                { title: "Innovation", desc: "Patented tourbillon mechanics." }
              ].map((item, idx) => (
                <div key={idx}>
                  <h4 className="text-xs tracking-widest uppercase mb-2 font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-sans leading-snug">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Grid with Sequential Fade In */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="h-96 overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=600" 
              alt="Detail view" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
          
          <div className="h-96 flex flex-col items-center justify-center text-center p-10 border border-gray-100 bg-slate-50/30">
            <motion.blockquote 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl italic text-gray-800"
            >
              "Simplicity is the ultimate sophistication."
            </motion.blockquote>
            <div className="w-12 h-[1px] bg-black my-6"></div>
            <span className="text-xs tracking-[0.4em] uppercase">The Vyntra Creed</span>
          </div>

          <div className="h-96 overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600" 
              alt="Movement view" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;