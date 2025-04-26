import { Github, Twitter, Instagram, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-pastel-blue/40 to-white/90 backdrop-blur-sm py-12 mt-16 border-t border-pastel-gray/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pastel-blue to-pastel-purple"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              InstaFetch
            </motion.h3>
            <p className="text-gray-800 mb-4 font-medium">
              Your Open-Source Gateway to Effortless Social Media Downloads
            </p>
            <p className="flex items-center text-gray-800 font-medium">
              Made with <Heart size={16} className="mx-1 text-social-instagram" /> by Tanbir
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-800 hover:text-pastel-blue transition-colors font-medium">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-800 hover:text-pastel-blue transition-colors font-medium">
                  How It Works
                </a>
              </li>
              <li>
                <a href="https://github.com/tanbiralam/InstaFetch" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-pastel-blue transition-colors font-medium">
                  Contribute
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-800 hover:text-pastel-blue transition-colors font-medium">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-pastel-blue transition-colors font-medium">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-800 hover:text-pastel-blue transition-colors font-medium">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-6">
          <a 
            href="https://github.com/tanbiralam/InstaFetch" 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft hover:shadow-pastel transition-shadow"
          >
            <Github size={20} className="text-gray-800" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft hover:shadow-pastel transition-shadow"
          >
            <Twitter size={20} className="text-social-twitter" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-soft hover:shadow-pastel transition-shadow"
          >
            <Instagram size={20} className="text-social-instagram" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-800 text-sm border-t border-pastel-gray/20 pt-6 font-medium">
          <p>&copy; {new Date().getFullYear()} InstaFetch. All rights reserved.</p>
          <p className="mt-2">
            Designed and developed with modern 2025 UI standards.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
