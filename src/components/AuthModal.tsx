import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Phone,
  Globe,
  Clock,
  LogIn,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBusiness: BusinessInfo | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  selectedBusiness,
}) => {
  const [authMode, setAuthMode] = useState<"choice" | "signin" | "signup">(
    "choice"
  );
  const navigate = useNavigate();

  const handleAuthComplete = () => {
    navigate("/dashboard");
    onClose();
  };

  const getPriceLevelText = (priceLevel?: number) => {
    const levels = [
      "Free",
      "Inexpensive",
      "Moderate",
      "Expensive",
      "Very Expensive",
    ];
    return priceLevel !== undefined ? levels[priceLevel] : "Not specified";
  };

  const getCurrentStatus = (isOpen?: boolean) => {
    if (isOpen === undefined) return "Hours not available";
    return isOpen ? "Open now" : "Closed now";
  };

  const renderAuthChoice = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Welcome to AskTani</h3>
        <p className="text-muted-foreground">
          Sign in to your account or create a new one to get started
        </p>
      </div>

      {selectedBusiness && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="text-center mb-3">
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Selected Business
              </h4>
              <p className="text-lg font-medium">{selectedBusiness.name}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-3 w-3 mr-2" />
                {selectedBusiness.address}
              </div>

              {selectedBusiness.rating && (
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-2 text-yellow-500 fill-current" />
                  <span className="font-medium">
                    {selectedBusiness.rating.toFixed(1)}
                  </span>
                  {selectedBusiness.userRatingsTotal && (
                    <span className="text-muted-foreground ml-1">
                      ({selectedBusiness.userRatingsTotal} reviews)
                    </span>
                  )}
                </div>
              )}

              {selectedBusiness.isOpen !== undefined && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-2" />
                  <Badge
                    variant={selectedBusiness.isOpen ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {getCurrentStatus(selectedBusiness.isOpen)}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        <SignInButton mode="modal" afterSignInUrl="/dashboard">
          <Button className="w-full h-12 text-base" variant="outline">
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>
        </SignInButton>

        <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
          <Button className="w-full h-12 text-base">
            <UserPlus className="h-5 w-5 mr-2" />
            Create Account
          </Button>
        </SignUpButton>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );

  const renderSignIn = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAuthMode("choice")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h3 className="text-xl font-semibold mb-2">Sign In to Your Account</h3>
        <p className="text-muted-foreground">
          Welcome back! Sign in to continue to your dashboard
        </p>
      </div>

      <div className="space-y-4">
        <SignInButton mode="modal" afterSignInUrl="/dashboard">
          <Button className="w-full h-12 text-base" variant="outline">
            <LogIn className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
        </SignInButton>
      </div>
    </div>
  );

  const renderSignUp = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setAuthMode("choice")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
        <p className="text-muted-foreground">
          Join AskTani and start managing your business calls with AI
        </p>
      </div>

      <div className="space-y-4">
        <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
          <Button className="w-full h-12 text-base">
            <UserPlus className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>
        </SignUpButton>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (authMode) {
      case "signin":
        return renderSignIn();
      case "signup":
        return renderSignUp();
      default:
        return renderAuthChoice();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {authMode === "signin"
              ? "Sign In"
              : authMode === "signup"
              ? "Create Account"
              : "Welcome to AskTani"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
};
