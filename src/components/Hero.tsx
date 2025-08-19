import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Mission work around the world" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Serving Communities Worldwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Transforming Lives Through 
            <span className="block text-white">Faith & Service</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in">
            Join us in our mission to spread hope, love, and practical support to communities in need around the globe.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button variant="outline-white" size="lg" className="text-lg px-8 py-4">
              <Heart className="mr-2 h-5 w-5" />
              Donate Today
            </Button>
            <Button variant="ghost" size="lg" className="text-lg px-8 py-4 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">50+</div>
              <div className="text-white/80">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-2">100K+</div>
              <div className="text-white/80">Lives Impacted</div>
            </div>
            <div className="text-center sm:col-span-1 col-span-2">
              <div className="text-3xl sm:text-4xl font-bold mb-2">25</div>
              <div className="text-white/80">Years of Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;