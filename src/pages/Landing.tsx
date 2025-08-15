import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { OnboardingModal } from "@/components/OnboardingModal";

export const Landing: React.FC = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (query: string) => {
    console.log("Search submitted:", query);
    setSearchQuery(query);
    setIsOnboardingOpen(true);
  };

  const handleOnboardingComplete = () => {
    console.log("Onboarding completed");
    setIsOnboardingOpen(false);
    // Redirect to dashboard after onboarding
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
