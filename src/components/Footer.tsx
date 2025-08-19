import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Net Missions Fellowship" className="h-10 w-10" />
              <span className="text-xl font-bold">Net Missions Fellowship</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transforming lives through faith and service. Join us in spreading hope, love, 
              and practical support to communities in need around the globe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-mission-red transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-mission-red transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-mission-red transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-mission-red transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-mission-red transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#impact" className="text-gray-300 hover:text-white transition-colors">Our Impact</a></li>
              <li><a href="#missions" className="text-gray-300 hover:text-white transition-colors">Mission Work</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">News</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Donate</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sponsor a Child</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Prayer Partners</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mission Trips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Corporate Partners</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
            <p className="text-gray-300">Get updates on our mission work and impact stories</p>
          </div>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-md sm:rounded-r-none rounded-r-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-mission-red"
            />
            <button className="bg-mission-red hover:bg-mission-red-dark px-6 py-2 rounded-r-md sm:rounded-l-none rounded-l-md transition-colors mt-2 sm:mt-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 sm:mb-0">
            © 2024 Net Missions Fellowship. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-mission-red" />
            <span>for those in need</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;