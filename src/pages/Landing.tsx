import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { OnboardingModal } from '@/components/OnboardingModal';

interface LandingProps {
  onComplete: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onComplete }) => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignUpClick = () => {
    setIsOnboardingOpen(true);
  };

  const handleLoginClick = () => {
    // In a real app, this would open a login modal or redirect to login page
    console.log('Login clicked');
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setIsOnboardingOpen(true);
  };

  const handleOnboardingComplete = () => {
    setIsOnboardingOpen(false);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSignUpClick={handleSignUpClick} onLoginClick={handleLoginClick} />
      <Hero onSearchSubmit={handleSearchSubmit} />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
      
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
        initialSearchQuery={searchQuery}
      />
    </div>
  );
};