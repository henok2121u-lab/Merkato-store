import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0A192F] text-gray-300 overflow-hidden pt-16 pb-8 font-sans w-full">
      
      {/* Background Section/Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180">
        <svg className="relative block w-full h-[60px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#112240]"></path>
        </svg>
      </div>

      {/* Decorative Blur Orbs - Safe Standard Positioning */}
      <div className="absolute top-1/4 left-4 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12 border-b border-gray-700/50">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold tracking-wider text-white">
                NEXUS<span className="text-yellow-400 font-black">.</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Crafting digital experiences with precision. Connect with us to take your digital presence to the next evolutionary step.
            </p>
            
            {/* Social Icons (Standard Inline SVGs) */}
            <div className="flex space-x-4 pt-2">
              {[
                { 
                  name: 'FB', 
                  svg: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.72-1 1-1h2V2h-3c-2.9 0-5 1.5-5 4v2z"/></svg>, 
                  link: '#' 
                },
                { 
                  name: 'TW', 
                  svg: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.95 4.57a10 10 0 01-2.82.78 4.92 4.92 0 002.16-2.72c-.95.55-2 1-3.13 1.2a4.92 4.92 0 00-8.38 4.48A14 14 0 011.64 3.16a4.92 4.92 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06a4.92 4.92 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.9 9.9 0 010 19.54a13.94 13.94 0 007.55 2.21c9.14 0 14.3-7.72 14.3-14.3v-.65a10.21 10.21 0 002.1-2.23z"/></svg>, 
                  link: '#' 
                },
                { 
                  name: 'IG', 
                  svg: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.63 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.63 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-11.84a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>, 
                  link: '#' 
                }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 rounded-xl bg-[#112240] text-gray-400 flex items-center justify-center hover:bg-yellow-400 hover:text-[#0A192F] hover:-translate-y-1 transition-all duration-300 shadow-lg"
                  aria-label={social.name}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div>
              <h3 className="text-white font-semibold text-lg tracking-wider mb-4 relative pb-2">
                Explore
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-yellow-400"></span>
              </h3>
              <ul className="space-y-2.5">
                {['Home', 'About Us', 'Services', 'Our Portfolio'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[2px] bg-yellow-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg tracking-wider mb-4 relative pb-2">
                Support
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-yellow-400"></span>
              </h3>
              <ul className="space-y-2.5">
                {['Help Center', 'Privacy Policy', 'Terms of Use', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-[2px] bg-yellow-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg tracking-wider mb-2">
                Stay Ahead Matrix
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to receive cutting-edge insights and updates.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="relative group flex items-center">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full px-4 py-3 rounded-xl bg-[#112240] border border-gray-700 text-white focus:outline-none focus:border-yellow-400 transition-all duration-300 placeholder-gray-500 pr-12 text-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 p-2 rounded-lg bg-yellow-400 text-[#0A192F] hover:bg-yellow-300 transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Scroll to top */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 space-y-4 md:space-y-0 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} NEXUS Digital Ecosystem. All rights reserved.</p>
          
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Local Node: Addis Ababa</span>
            
            {/* Scroll To Top Button */}
            <button 
              onClick={scrollToTop}
              className="group flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-700 hover:border-yellow-400 text-gray-400 hover:text-yellow-400 transition-all duration-300 relative overflow-hidden"
              aria-label="Scroll to top"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:-translate-y-6 transition-transform duration-300 absolute" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <svg className="w-4 h-4 fill-none stroke-current stroke-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-300 absolute text-yellow-400" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;