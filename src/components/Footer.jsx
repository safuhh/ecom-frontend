import React from 'react';

const Footer = () => {
  const footerLinks = [
    {
      title: "COLLECTIONS",
      links: ["Heritage Series", "Grand Complications", "Diving & Sport", "New Arrivals"],
    },
    {
      title: "THE MAISON",
      links: ["Our Heritage", "Craftsmanship", "Sustainability", "Careers"],
    },
    {
      title: "CLIENT CARE",
      links: ["Service & Repair", "Boutique Finder", "Contact Us", "Warranty"],
    },
  ];

  return (
    <footer className="bg-white text-zinc-900 font-sans px-6 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">

  
        <div className="h-px bg-zinc-500 w-24 sm:w-32 md:w-48 mx-auto mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
    
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl tracking-[0.3em] font-light uppercase mb-2">Vyntra</h2>
            <p className="text-[10px] tracking-[0.15em] text-zinc-400 uppercase">
              Swiss Haute Horlogerie — Since 1994
            </p>
            
            <div className="mt-6 flex justify-center md:justify-start gap-6">
              <a href="#" className="text-[11px] tracking-widest text-zinc-500 hover:text-black transition-colors duration-300">INSTAGRAM</a>
              <a href="#" className="text-[11px] tracking-widest text-zinc-500 hover:text-black transition-colors duration-300">TWITTER</a>
            </div>
          </div>

          
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left mt-10 md:mt-0">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-[11px] tracking-[0.2em] font-semibold mb-4 sm:mb-6 text-zinc-900">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-[11px] tracking-wider text-zinc-400 hover:text-black transition-colors duration-300 uppercase"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-zinc-200 w-24 sm:w-32 md:w-48 mx-auto mt-16" />


        <div className="pt-6 text-center">
          <p className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase">
            © {new Date().getFullYear()} Vyntra Haute Horlogerie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
