import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';

const Impact = () => {
  const testimonials = [
    {
      name: 'Maria Santos',
      location: 'Philippines',
      quote: 'Through the clean water project, our village now has access to safe drinking water. My children are healthier and can focus on their education instead of walking miles for water.',
      impact: 'Clean Water Project',
    },
    {
      name: 'James Kimathi',
      location: 'Kenya',
      quote: 'The agricultural training program taught me sustainable farming techniques. Now I can feed my family and sell surplus crops to support other families in our community.',
      impact: 'Agricultural Training',
    },
    {
      name: 'Ana Rodriguez',
      location: 'Guatemala',
      quote: 'The medical clinic saved my daughter\'s life. The doctors and nurses showed us love and care we had never experienced before. Our faith has been strengthened.',
      impact: 'Medical Outreach',
    },
  ];

  const stats = [
    { number: '2,500+', label: 'Families Fed This Year' },
    { number: '450', label: 'Churches Planted' },
    { number: '75', label: 'Schools Built' },
    { number: '1M+', label: 'Medical Treatments Provided' },
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Real Stories, Real Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every donation creates ripples of hope. Here are just a few stories of lives transformed 
            through your generous support.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mission-red mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-mission-red mb-4" />
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-sm text-mission-red font-medium mt-1">{testimonial.impact}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-mission-red-muted rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Be Part of the Next Story
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your support helps us reach more communities, transform more lives, and spread hope 
            to the darkest corners of the world.
          </p>
          <Button variant="donate" size="lg" className="text-lg px-8 py-4">
            Make a Difference Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Impact;