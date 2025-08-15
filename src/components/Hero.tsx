import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BusinessSearch } from "@/components/BusinessSearch"; // Real version (requires Google Maps API key)
// import { BusinessSearchDemo } from "@/components/BusinessSearchDemo"; // Demo version (works without API key)
import heroImage from "@/assets/hero-image.jpg";
import "@/types/google-maps";

interface BusinessInfo {
  name: string;
  address: string;
  rating?: number;
  phone?: string;
  website?: string;
  placeId: string;
  types?: string[];
  reviews?: unknown[];
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
  photos?: unknown[];
  vicinity?: string;
  userRatingsTotal?: number;
  utcOffsetMinutes?: number;
}

interface HeroProps {
  onSearchSubmit: (business: BusinessInfo) => void;
  onShowLoginModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchSubmit,
  onShowLoginModal,
}) => {
  const handleBusinessSelect = (business: BusinessInfo) => {
    console.log("Business selected:", business);
    onSearchSubmit(business);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Professional Canadian business calling service"
          className="w-full h-full object-cover opacity-5"
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Your AI-Powered
          <br />
          <span className="text-primary">Canadian Call Agent</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Never miss another call. Our intelligent Canadian assistant handles
          your business calls 24/7, schedules appointments, and provides
          excellent customer service.
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-background rounded-2xl shadow-lg border border-border">
            <div className="flex-1">
              <BusinessSearch
                onBusinessSelect={handleBusinessSelect}
                onShowLoginModal={onShowLoginModal}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          🇨🇦 Proudly Canadian • Start your free trial today
        </p>
      </div>
    </section>
  );
};
