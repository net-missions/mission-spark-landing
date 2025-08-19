import React from 'react';
import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Impact = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Church Member',
      quote: 'Our current space is so cramped that we often have to turn people away. A new sanctuary means we can welcome everyone who wants to worship with us.',
      impact: 'Growing Congregation',
    },
    {
      name: 'Pastor Michael',
      role: 'Lead Pastor',
      quote: 'This building represents our commitment to the community. We\'ll finally have proper space for youth programs, senior ministries, and community outreach.',
      impact: 'Community Ministry',
    },
    {
      name: 'David Chen',
      role: 'Youth Leader',
      quote: 'The new facility will allow us to expand our youth programs and provide a safe, inspiring space where young people can grow in faith.',
      impact: 'Youth Development',
    },
  ];

  const stats = [
    { number: '300', label: 'Sanctuary Seats' },
    { number: '8', label: 'Classrooms' },
    { number: '2', label: 'Fellowship Halls' },
    { number: '150', label: 'Parking Spaces' },
  ];

  return (
    <section id="impact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why We're Building
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our congregation has grown tremendously, and we need a permanent home that can accommodate our community. 
            Here's what this new building means to our members and the impact it will have.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <Quote className="h-8 w-8 text-primary mb-6" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-gray-100 pt-6">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-500 text-sm">{testimonial.role}</div>
                <div className="text-primary font-medium text-sm mt-1">{testimonial.impact}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-3xl p-12 shadow-sm">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Help Us Build Our Future
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Every donation brings us closer to our goal. Join us in building a permanent home 
            where our church family can worship, grow, and serve together for generations.
          </p>
          <Link to="/donate">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
              Donate to Building Fund
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Impact;