import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Phone className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">CallAgent Pro</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md leading-relaxed">
              The leading AI-powered call management solution for Canadian businesses. 
              Professional, reliable, and always available.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>1-800-CALL-PRO</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>hello@callagentpro.ca</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Toronto, Ontario, Canada</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Product</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-background/80">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 CallAgent Pro. All rights reserved. Made in Canada 🇨🇦
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-background/60 hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-background/60 hover:text-primary transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-background/60 hover:text-primary transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};