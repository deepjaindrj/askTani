import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface HeroProps {
  onSearchSubmit: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
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
          Never miss another call. Our intelligent Canadian assistant handles your business calls 24/7, 
          schedules appointments, and provides excellent customer service.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-background rounded-2xl shadow-lg border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search your business"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 border-0 bg-transparent text-lg h-14 focus:ring-0"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              className="sm:w-auto w-full"
            >
              Get Started
            </Button>
          </div>
        </form>
        
        <p className="text-sm text-muted-foreground">
          🇨🇦 Proudly Canadian • Start your free trial today
        </p>
      </div>
    </section>
  );
};