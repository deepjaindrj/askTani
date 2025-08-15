import React from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export const Navbar: React.FC = () => {
  console.log("Navbar component rendered");

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            CallAgent Pro
          </span>
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">Login</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="default">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
