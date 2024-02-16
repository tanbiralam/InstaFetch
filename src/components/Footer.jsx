import React from "react";

const Footer = () => {
  return (
    <footer className="text-white py-6 bg-[#3E3232]">
      <div className="container mx-auto px-4">
        
        {/* Logo and Description */}
        <div className="text-center md:text-left mb-6">
          <h3 className="text-2xl font-semibold mb-2">InstaFetch</h3>
          <p className="text-sm">Your Open-Source Gateway to Effortless Instagram Media Downloads.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-between items-center mb-6">
          <ul className="flex space-x-4 font-semibold">
            <li className="text-white hover:text-white transition">Home</li>
            <li className="text-white hover:text-white transition">Contribute</li>
            <li className="text-white hover:text-white transition">Support</li>
          </ul>

          {/* Copyright Section */}
          <div className="text-xs text-gray-300">&copy; {new Date().getFullYear()} InstaFetch. All rights reserved</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
