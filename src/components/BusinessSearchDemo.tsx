import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Star,
  Phone,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
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

interface UserLocation {
  lat: number;
  lng: number;
  country?: string;
  city?: string;
}

interface BusinessSearchDemoProps {
  onBusinessSelect: (business: BusinessInfo) => void;
  onShowLoginModal: () => void;
}

// Mock data for demonstration
const mockBusinesses: BusinessInfo[] = [
  {
    name: "Maple Dental Clinic",
    address: "123 Main Street, Toronto, ON M5V 2H1",
    rating: 4.5,
    phone: "(416) 555-0123",
    website: "https://mapledentalclinic.ca",
    placeId: "demo_1",
    types: ["dentist", "health"],
    isOpen: true,
    priceLevel: 2,
    userRatingsTotal: 127,
    vicinity: "Downtown Toronto",
  },
  {
    name: "Canadian Auto Repair",
    address: "456 Queen Street West, Toronto, ON M5V 2A9",
    rating: 4.2,
    phone: "(416) 555-0456",
    website: "https://canadianautorepair.ca",
    placeId: "demo_2",
    types: ["car_repair", "automotive"],
    isOpen: false,
    priceLevel: 1,
    userRatingsTotal: 89,
    vicinity: "Queen West",
  },
  {
    name: "Tim Hortons",
    address: "789 Yonge Street, Toronto, ON M4W 2G8",
    rating: 3.8,
    phone: "(416) 555-0789",
    website: "https://timhortons.ca",
    placeId: "demo_3",
    types: ["restaurant", "coffee_shop"],
    isOpen: true,
    priceLevel: 0,
    userRatingsTotal: 234,
    vicinity: "Yonge & Bloor",
  },
];

export const BusinessSearchDemo: React.FC<BusinessSearchDemoProps> = ({
  onBusinessSelect,
  onShowLoginModal,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<BusinessInfo[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessInfo | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    "requesting" | "granted" | "denied"
  >("requesting");
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Simulate location request
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLocationStatus("granted");
      setUserLocation({
        lat: 43.6532,
        lng: -79.3832,
        country: "CA",
        city: "Toronto",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const filtered = mockBusinesses.filter(
        (business) =>
          business.name.toLowerCase().includes(query.toLowerCase()) ||
          business.address.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    // Request location when user starts typing
    if (locationStatus === "denied" && !showLocationPrompt) {
      setShowLocationPrompt(true);
    }

    handleSearch(value);
  };

  const handleInputFocus = () => {
    // Request location when input is focused
    if (locationStatus === "denied" && !showLocationPrompt) {
      setShowLocationPrompt(true);
    }
  };

  const selectBusiness = (business: BusinessInfo) => {
    setSelectedBusiness(business);
    setSearchValue(business.name);
    setSuggestions([]);
    setIsSubmitted(false);
  };

  const handleBusinessSelect = async () => {
    if (!selectedBusiness) return;

    if (isSignedIn) {
      // User is logged in, proceed to dashboard
      onBusinessSelect(selectedBusiness);
      navigate("/dashboard");
    } else {
      // User is not logged in, show login modal
      onBusinessSelect(selectedBusiness);
      onShowLoginModal();
    }
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Location Status */}
      {locationStatus === "requesting" && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="text-blue-700">Requesting your location...</span>
          </div>
        </div>
      )}

      {locationStatus === "denied" && showLocationPrompt && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-yellow-700">
              Location access needed for better search results
            </span>
            <Button
              onClick={() => setLocationStatus("granted")}
              variant="outline"
              size="sm"
              className="ml-2"
            >
              Allow Location
            </Button>
          </div>
        </div>
      )}

      {locationStatus === "granted" && userLocation && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-green-700 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Searching near {userLocation.city || "your location"}
            {userLocation.country && `, ${userLocation.country}`}
          </span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={
              locationStatus === "granted"
                ? `Search for businesses near ${userLocation?.city || "you"}...`
                : "Search your business to get started"
            }
            className="pl-12 border-0 bg-transparent text-lg h-14 focus:ring-0"
            disabled={locationStatus === "requesting"}
          />
        </div>

        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg mt-1 shadow-lg z-10 max-h-96 overflow-y-auto">
            {suggestions.map((business) => (
              <div
                key={business.placeId}
                onClick={() => selectBusiness(business)}
                className="px-4 py-3 hover:bg-muted cursor-pointer border-b last:border-b-0 transition-colors"
              >
                <div className="font-medium text-foreground">
                  {business.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {business.address}
                </div>
                {business.rating && (
                  <div className="text-sm text-yellow-600 mt-1 flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {business.rating.toFixed(1)}
                    {business.userRatingsTotal && (
                      <span className="text-muted-foreground ml-1">
                        ({business.userRatingsTotal} reviews)
                      </span>
                    )}
                  </div>
                )}
                {business.isOpen !== undefined && (
                  <div className="text-sm mt-1">
                    <Badge variant={business.isOpen ? "default" : "secondary"}>
                      {business.isOpen ? "Open now" : "Closed"}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Business Details */}
      {selectedBusiness && !isSubmitted && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selected Business
                </h3>
                <p className="text-xl font-medium text-foreground">
                  {selectedBusiness.name}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedBusiness.address}
                </div>

                {selectedBusiness.rating && (
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
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

                {selectedBusiness.phone && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {selectedBusiness.phone}
                  </div>
                )}

                {selectedBusiness.website && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                )}

                {selectedBusiness.isOpen !== undefined && (
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <Badge
                      variant={
                        selectedBusiness.isOpen ? "default" : "secondary"
                      }
                    >
                      {getCurrentStatus(selectedBusiness.isOpen)}
                    </Badge>
                  </div>
                )}

                {selectedBusiness.priceLevel !== undefined && (
                  <div className="text-sm text-muted-foreground">
                    Price level:{" "}
                    {getPriceLevelText(selectedBusiness.priceLevel)}
                  </div>
                )}
              </div>

              <Button
                onClick={handleBusinessSelect}
                className="w-full"
                size="lg"
              >
                {isSignedIn ? "Continue to Dashboard" : "Sign Up to Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {selectedBusiness && isSubmitted && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Business Selected
              </h3>
              <p className="text-xl text-foreground font-medium">
                {selectedBusiness.name}
              </p>
              <p className="text-success font-medium mt-2">
                ✓ Ready to proceed!
              </p>

              <Button
                onClick={() => {
                  setSelectedBusiness(null);
                  setSearchValue("");
                  setIsSubmitted(false);
                }}
                variant="outline"
                className="mt-4"
              >
                Search another business
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Notice */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          <strong>Demo Mode:</strong> This is a demonstration with mock data.
          For full functionality, set up the Google Maps API key as described in
          GOOGLE_MAPS_SETUP.md
        </p>
      </div>
    </div>
  );
};
