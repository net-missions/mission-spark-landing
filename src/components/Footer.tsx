import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import logo from '@/assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Logo and Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="Net Missions Fellowship" className="h-12 w-12" />
              <span className="text-2xl font-bold">Net Missions Fellowship</span>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Building our new church home together. Join us in creating a lasting legacy 
              for our community and future generations through your generous support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#mission" className="text-gray-300 hover:text-white transition-colors">Building Project</a></li>
              <li><a href="#impact" className="text-gray-300 hover:text-white transition-colors">Why We're Building</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Progress Updates</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get Involved</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Donate Now</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Monthly Pledge</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Memorial Gifts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Building Updates</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            © 2024 Net Missions Fellowship. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-primary" />
            <span>for our church family</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;