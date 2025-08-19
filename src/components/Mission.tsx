import React from 'react';
import { Heart, Users, Lightbulb } from 'lucide-react';

const Mission = () => {
  const features = [
    {
      icon: Heart,
      title: 'Worship Sanctuary',
      description: 'A beautiful 300-seat sanctuary designed for inspiring worship and meaningful community gatherings.',
    },
    {
      icon: Users,
      title: 'Community Spaces',
      description: 'Fellowship halls, classrooms, and meeting rooms to support our growing ministries and programs.',
    },
    {
      icon: Lightbulb,
      title: 'Modern Facilities',
      description: 'State-of-the-art audio/visual systems, accessibility features, and energy-efficient design.',
    },
  ];

  return (
    <section id="mission" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Building Project
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            After years of faithful ministry, our congregation has outgrown our current space. We're building a new sanctuary 
            that will serve our community for generations to come, providing a permanent home for worship, fellowship, and ministry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Project Timeline */}
        <div className="bg-gray-50 rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Project Timeline
          </h3>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            We're currently in Phase 2 of our building project. Ground breaking began in January 2024, 
            with an anticipated completion date of December 2024. Your support helps us stay on track 
            to open our doors for Christmas worship in our new sanctuary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white rounded-xl p-6">
              <div className="text-green-600 font-bold mb-2">✓ Phase 1 Complete</div>
              <div className="text-gray-600">Site preparation & foundation</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-primary">
              <div className="text-primary font-bold mb-2">→ Phase 2 Current</div>
              <div className="text-gray-600">Structure & roofing</div>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-gray-400 font-bold mb-2">Phase 3 Upcoming</div>
              <div className="text-gray-600">Interior & finishing work</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;