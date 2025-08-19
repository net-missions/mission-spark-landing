import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import FundingProgress from '@/components/FundingProgress';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-50 via-transparent to-transparent opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Building Our Future Together</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in text-gray-900 leading-tight">
            Help Us Build Our
            <span className="block text-primary">New Church Home</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Join us in building a new sanctuary where our community can gather, worship, and grow together in faith. Your donation helps create a lasting legacy for generations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in mb-20">
            <Link to="/donate">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all group">
                Donate Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-10 py-4 rounded-full font-semibold text-lg border-2 hover:bg-gray-50">
              View Progress
            </Button>
          </div>

          {/* Funding Progress */}
          <div className="max-w-2xl mx-auto">
            <FundingProgress size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;