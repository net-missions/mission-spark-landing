import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Donation = () => {
  const ways = [
    {
      icon: Heart,
      title: 'One-Time Donation',
      description: 'Make a single contribution to our building fund. Every dollar goes directly toward construction costs.',
      action: 'Donate Now'
    },
    {
      icon: Users,
      title: 'Monthly Pledge',
      description: 'Set up recurring monthly donations to provide steady support throughout the building process.',
      action: 'Set Up Pledge'
    },
    {
      icon: Lightbulb,
      title: 'Memorial Gift',
      description: 'Honor a loved one with a memorial donation. Their name can be included in our dedication.',
      action: 'Learn More'
    }
  ];

  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Support Our Building Fund
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Your generous donation helps us build our new church home. Every contribution, big or small, 
            brings us closer to completing this important project for our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ways.map((way, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <way.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{way.title}</h3>
              <p className="text-white/80 mb-6 leading-relaxed">{way.description}</p>
              <Link to="/donate">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary transition-all">
                  {way.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Help Build?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            We're $450,000 away from our goal. Your donation today helps us stay on track 
            to complete our new sanctuary by Christmas 2024.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg">
                Donate to Building Fund
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg">
              View Building Progress
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;