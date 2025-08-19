import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className={`${
        isScrolled 
          ? 'bg-white/20 backdrop-blur-xl border-white/30 shadow-2xl shadow-black/20' 
          : 'bg-white/95 backdrop-blur-lg border-gray-200/50 shadow-lg shadow-black/5'
      } transition-all duration-300 rounded-2xl`}>
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Net Missions Fellowship" className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground tracking-tight hidden sm:block">Net Missions Fellowship</span>
              <span className="text-lg font-bold text-foreground tracking-tight sm:hidden">NMF</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#mission" className="text-gray-600 hover:text-primary transition-colors font-medium text-sm">Mission</a>
              <a href="#impact" className="text-gray-600 hover:text-primary transition-colors font-medium text-sm">Impact</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors font-medium text-sm">Contact</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link to="/donate">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                  Donate Now
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100/50">
              <nav className="flex flex-col space-y-4">
                <a href="#mission" className="text-gray-600 hover:text-primary transition-colors font-medium">Mission</a>
                <a href="#impact" className="text-gray-600 hover:text-primary transition-colors font-medium">Impact</a>
                <a href="#contact" className="text-gray-600 hover:text-primary transition-colors font-medium">Contact</a>
                <div className="pt-2 md:hidden">
                  <Link to="/donate" className="w-full">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold w-full">
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;