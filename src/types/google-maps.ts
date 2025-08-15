declare global {
  var google: typeof google;
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    class Geocoder {
      geocode(
        request: GeocoderRequest,
        callback: (
          results: GeocoderResult[] | null,
          status: GeocoderStatus
        ) => void
      ): void;
    }

    interface GeocoderRequest {
      location?: LatLng;
      address?: string;
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    type GeocoderStatus =
      | "OK"
      | "ZERO_RESULTS"
      | "OVER_QUERY_LIMIT"
      | "REQUEST_DENIED"
      | "INVALID_REQUEST"
      | "UNKNOWN_ERROR";

    namespace places {
      class AutocompleteService {
        getPlacePredictions(
          request: AutocompletionRequest,
          callback: (
            predictions: AutocompletePrediction[] | null,
            status: PlacesServiceStatus
          ) => void
        ): void;
      }

      class PlacesService {
        constructor(attrContainer: HTMLDivElement | google.maps.Map);
        getDetails(
          request: PlaceDetailsRequest,
          callback: (
            place: PlaceResult | null,
            status: PlacesServiceStatus
          ) => void
        ): void;
      }

      interface AutocompletionRequest {
        input: string;
        types?: string[];
        location?: LatLng;
        radius?: number;
        componentRestrictions?: ComponentRestrictions;
      }

      interface ComponentRestrictions {
        country: string | string[];
      }

      interface AutocompletePrediction {
        description: string;
        place_id: string;
        structured_formatting: {
          main_text: string;
          secondary_text: string;
        };
      }

      interface PlaceDetailsRequest {
        placeId: string;
        fields: string[];
      }

      interface PlaceResult {
        name?: string;
        formatted_address?: string;
        rating?: number;
        formatted_phone_number?: string;
        website?: string;
        types?: string[];
        reviews?: PlaceReview[];
        editorial_summary?: {
          overview: string;
        };
        opening_hours?: PlaceOpeningHours;
        price_level?: number;
        photos?: PlacePhoto[];
        vicinity?: string;
        user_ratings_total?: number;
        utc_offset_minutes?: number;
      }

      interface PlaceReview {
        author_name: string;
        rating?: number;
        text: string;
        time: number;
        relative_time_description: string;
      }

      interface PlaceOpeningHours {
        periods?: Array<{
          open: { day: number; time: string };
          close?: { day: number; time: string };
        }>;
        weekday_text?: string[];
        isOpen?: () => boolean;
      }

      interface PlacePhoto {
        photo_reference?: string;
        height: number;
        width: number;
        html_attributions: string[];
      }

      type PlacesServiceStatus =
        | "OK"
        | "ZERO_RESULTS"
        | "OVER_QUERY_LIMIT"
        | "REQUEST_DENIED"
        | "INVALID_REQUEST"
        | "NOT_FOUND"
        | "UNKNOWN_ERROR";
    }
  }
}

export {};
