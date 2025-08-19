import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Net Missions Fellowship" className="h-12 w-12" />
            <span className="text-2xl font-bold text-foreground tracking-tight">Net Missions Fellowship</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <a href="#mission" className="text-gray-600 hover:text-primary transition-colors font-medium">Mission</a>
            <a href="#impact" className="text-gray-600 hover:text-primary transition-colors font-medium">Impact</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors font-medium">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link to="/donate">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100/50">
            <nav className="flex flex-col space-y-6">
              <a href="#mission" className="text-gray-600 hover:text-primary transition-colors font-medium text-lg">Mission</a>
              <a href="#impact" className="text-gray-600 hover:text-primary transition-colors font-medium text-lg">Impact</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors font-medium text-lg">Contact</a>
              <Link to="/donate" className="w-full">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold mt-4 w-full">
                  Donate Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;