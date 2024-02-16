import React from "react";

const Footer = () => {
  return (
    <footer className="text-white py-6 bg-[#3E3232]">
      <div className="container mx-auto px-4">
        
        {/* Logo and Description */}
        <div className="text-center md:text-left mb-6">
          <h3 className="text-2xl font-semibold mb-2">InstaFetch</h3>
          <p className="text-sm">Your Open-Source Gateway to Effortless Instagram Media Downloads.</p>
          <p className="text-sm">Made with ❤️ by Tanbir</p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between items-center mb-6">

          {/* Copyright Section */}
          <div className="text-xs text-gray-300">&copy; {new Date().getFullYear()} Tanbir Alam. All rights reserved</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
