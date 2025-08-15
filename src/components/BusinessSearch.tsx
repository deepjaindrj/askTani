import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
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
import "@/types/google-maps";

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

interface BusinessSearchProps {
  onBusinessSelect: (business: BusinessInfo) => void;
  onShowLoginModal: () => void;
}

export const BusinessSearch: React.FC<BusinessSearchProps> = ({
  onBusinessSelect,
  onShowLoginModal,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<BusinessInfo[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessInfo | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState<
    "requesting" | "granted" | "denied"
  >("requesting");
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  const autocompleteService = useRef<any>(null);
  const placesService = useRef<any>(null);
  const geocoder = useRef<any>(null);

  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
        console.log("API Key available:", !!apiKey);
        console.log("Environment variables:", {
          VITE: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        });

        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();
        console.log("Google Maps loaded successfully");
        console.log("Google object available:", !!(window as any).google);

        autocompleteService.current = new (
          window as any
        ).google.maps.places.AutocompleteService();
        geocoder.current = new (window as any).google.maps.Geocoder();

        // Create a dummy div for PlacesService (it requires a map or div)
        const dummyDiv = document.createElement("div");
        placesService.current = new (
          window as any
        ).google.maps.places.PlacesService(dummyDiv);

        // Request user location
        requestUserLocation();
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setLocationStatus("denied");
      }
    };

    initializeGoogleMaps();
  }, []);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      setLocationStatus("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // Get country and city from coordinates
          const locationDetails = await reverseGeocode(lat, lng);
          setUserLocation({
            lat,
            lng,
            country: locationDetails.country,
            city: locationDetails.city,
          });
          setLocationStatus("granted");
        } catch (error) {
          console.error("Error getting location details:", error);
          setUserLocation({ lat, lng });
          setLocationStatus("granted");
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
        setLocationStatus("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const reverseGeocode = async (
    lat: number,
    lng: number
  ): Promise<{ country?: string; city?: string }> => {
    return new Promise((resolve) => {
      if (!geocoder.current) {
        resolve({});
        return;
      }

      geocoder.current.geocode(
        { location: { lat, lng } },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const addressComponents = results[0].address_components;
            let country = "";
            let city = "";

            addressComponents.forEach((component) => {
              if (component.types.includes("country")) {
                country = component.short_name;
              }
              if (
                component.types.includes("locality") ||
                component.types.includes("administrative_area_level_1")
              ) {
                city = component.long_name;
              }
            });

            resolve({ country, city });
          } else {
            resolve({});
          }
        }
      );
    });
  };

  const handleSearch = async (query: string) => {
    console.log("Search called with:", query);
    console.log(
      "AutocompleteService available:",
      !!autocompleteService.current
    );

    if (!autocompleteService.current || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      const request: any = {
        input: query,
        types: ["establishment"],
      };

      // Add location-based restrictions if user location is available
      if (userLocation) {
        request.location = new (window as any).google.maps.LatLng(
          userLocation.lat,
          userLocation.lng
        );
        request.radius = 50000; // 50km radius from user location

        // Add country restriction if available
        if (userLocation.country) {
          request.componentRestrictions = {
            country: userLocation.country.toLowerCase(),
          };
        }
      }

      console.log("Making API request with:", request);
      autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          console.log(
            "API response - status:",
            status,
            "predictions:",
            predictions
          );
          if (
            status ===
              (window as any).google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            // Get detailed info for each prediction
            const businessPromises = predictions
              .slice(0, 5)
              .map((prediction) => {
                return new Promise<BusinessInfo>((resolve) => {
                  if (!placesService.current) {
                    resolve({
                      name: prediction.description,
                      address:
                        prediction.structured_formatting.secondary_text || "",
                      placeId: prediction.place_id,
                    });
                    return;
                  }

                  placesService.current.getDetails(
                    {
                      placeId: prediction.place_id,
                      fields: [
                        "name",
                        "formatted_address",
                        "rating",
                        "formatted_phone_number",
                        "website",
                        "types",
                        "reviews",
                        "editorial_summary",
                        "opening_hours",
                        "price_level",
                        "photos",
                        "vicinity",
                        "user_ratings_total",
                        "utc_offset_minutes",
                      ],
                    },
                    (place, detailStatus) => {
                      if (
                        detailStatus ===
                          (window as any).google.maps.places.PlacesServiceStatus
                            .OK &&
                        place
                      ) {
                        // Check if business is currently open using the modern method
                        let isCurrentlyOpen: boolean | undefined;
                        try {
                          if (
                            place.opening_hours &&
                            typeof (place.opening_hours as any).isOpen ===
                              "function"
                          ) {
                            isCurrentlyOpen = (
                              place.opening_hours as any
                            ).isOpen();
                          }
                        } catch (error) {
                          console.log(
                            "Could not determine if business is open"
                          );
                          isCurrentlyOpen = undefined;
                        }

                        resolve({
                          name: place.name || prediction.description,
                          address: place.formatted_address || "",
                          rating: place.rating,
                          phone: place.formatted_phone_number,
                          website: place.website,
                          placeId: prediction.place_id,
                          types: place.types,
                          reviews: place.reviews
                            ? place.reviews.slice(0, 5)
                            : [],
                          businessDescription:
                            (place as any).editorial_summary?.overview || "",
                          openingHours: place.opening_hours
                            ? {
                                periods: place.opening_hours.periods,
                                weekday_text: place.opening_hours.weekday_text,
                              }
                            : undefined,
                          isOpen: isCurrentlyOpen,
                          priceLevel: place.price_level,
                          photos: place.photos ? place.photos.slice(0, 3) : [],
                          vicinity: place.vicinity,
                          userRatingsTotal: place.user_ratings_total,
                          utcOffsetMinutes: (place as any).utc_offset_minutes,
                        });
                      } else {
                        resolve({
                          name: prediction.description,
                          address:
                            prediction.structured_formatting.secondary_text ||
                            "",
                          placeId: prediction.place_id,
                        });
                      }
                    }
                  );
                });
              });

            Promise.all(businessPromises).then((businesses) => {
              setSuggestions(businesses);
              setIsLoading(false);
            });
          } else {
            setSuggestions([]);
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setIsLoading(false);
    }
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

    // Always pass the selected business to parent
    onBusinessSelect(selectedBusiness);

    if (isSignedIn) {
      // User is logged in, proceed to dashboard
      navigate("/dashboard");
    } else {
      // User is not logged in, show login modal
      onShowLoginModal();
    }
  };

  const getBusinessType = (types?: string[]) => {
    if (!types || types.length === 0) return "";
    const relevantTypes = types.filter(
      (type) => !["establishment", "point_of_interest"].includes(type)
    );
    return relevantTypes[0]?.replace(/_/g, " ").toUpperCase() || "";
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
              onClick={requestUserLocation}
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
    </div>
  );
};
