import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../json/Animation - 1714403621425.json';
import { Button } from './ui/button';
import { Github, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 bg-gradient-to-r from-pastel-blue/40 to-pastel-purple/40 backdrop-blur-sm sticky top-0 z-50 border-b border-pastel-gray/20">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pastel-blue to-pastel-purple rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                }}
                style={{ width: 50, height: 50 }}
              />
            </div>
          </div>
          <a
            href="/"
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pastel-blue to-pastel-purple ml-2 hover:scale-105 transition-transform"
          >
            InstaFetch
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-gray-800 hover:text-pastel-blue transition-colors font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-800 hover:text-pastel-blue transition-colors font-medium"
          >
            How It Works
          </a>
          <a
            href="https://github.com/tanbiralam/InstaFetch"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-800 hover:text-pastel-blue transition-colors font-medium"
          >
            <Github size={18} />
            <span>Contribute</span>
          </a>
          <Button className="bg-gradient-to-r from-pastel-blue to-pastel-purple hover:opacity-90 transition-opacity text-gray-800 font-semibold shadow-pastel">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/90 backdrop-blur-sm border-b border-pastel-gray/20 py-4 shadow-soft z-40">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <a
              href="#features"
              className="text-gray-800 hover:text-pastel-blue transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-800 hover:text-pastel-blue transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="https://github.com/tanbiralam/InstaFetch"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-800 hover:text-pastel-blue transition-colors py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Github size={18} />
              <span>Contribute</span>
            </a>
            <Button className="bg-gradient-to-r from-pastel-blue to-pastel-purple hover:opacity-90 transition-opacity text-gray-800 font-semibold shadow-pastel w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
