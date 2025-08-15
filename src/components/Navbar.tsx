import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface NavbarProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSignUpClick, onLoginClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">CallAgent Pro</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onLoginClick}>
            Login
          </Button>
          <Button variant="default" onClick={onSignUpClick}>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};