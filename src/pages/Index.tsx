import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Impact from '@/components/Impact';
import Donation from '@/components/Donation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Mission />
        <Impact />
        <Donation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
