import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";

interface BusinessInfo {
  name: string;
  address: string;
  rating?: number;
  phone?: string;
  website?: string;
  placeId: string;
  types?: string[];
  reviews?: any[];
  businessDescription?: string;
  openingHours?: {
    periods?: Array<{
      open: { day: number; time: string };
      close?: { day: number; time: string };
    }>;
    weekday_text?: string[];
  };
  isOpen?: boolean;
  priceLevel?: number;
  photos?: any[];
  vicinity?: string;
  userRatingsTotal?: number;
  utcOffsetMinutes?: number;
}

export const Landing: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessInfo | null>(
    null
  );

  const handleSearchSubmit = (business: BusinessInfo) => {
    console.log("Business selected:", business);
    setSelectedBusiness(business);
    setIsAuthModalOpen(true);
  };

  const handleShowLoginModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setSelectedBusiness(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero
        onSearchSubmit={handleSearchSubmit}
        onShowLoginModal={handleShowLoginModal}
      />
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        selectedBusiness={selectedBusiness}
      />
    </div>
  );
};
