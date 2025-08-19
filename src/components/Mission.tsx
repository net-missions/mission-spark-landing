import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, HandHeart, Globe, Users } from 'lucide-react';

const Mission = () => {
  const missions = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Providing medical aid, food, and shelter to those in desperate need around the world.',
    },
    {
      icon: HandHeart,
      title: 'Community Building',
      description: 'Empowering local communities through education, skills training, and sustainable development.',
    },
    {
      icon: Globe,
      title: 'Global Outreach',
      description: 'Spreading hope and faith across continents, bridging cultures with love and understanding.',
    },
    {
      icon: Users,
      title: 'Local Partnerships',
      description: 'Working hand-in-hand with local organizations to create lasting, meaningful change.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are called to serve those in need, spread the Gospel, and build lasting relationships 
            that transform communities from the inside out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-mission-red-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <mission.icon className="h-8 w-8 text-mission-red" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{mission.title}</h3>
                <p className="text-muted-foreground">{mission.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vision Statement */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Our Vision
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "To see a world where every person experiences the transformative love of Christ through 
              practical service, spiritual growth, and community development. We envision communities 
              thriving with hope, equipped with the tools and knowledge they need to break the cycle 
              of poverty and despair."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;