# Google Maps API Setup

This project now includes Google Maps integration for business search functionality. Follow these steps to set up the API:

## 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Places API
   - Geocoding API
   - Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

## 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Clerk Authentication (if not already set)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

## 3. Features

The Google Maps integration provides:

- **Location-based search**: Automatically requests user location for better search results
- **Business autocomplete**: Real-time suggestions as you type
- **Detailed business information**: Ratings, reviews, contact info, hours, etc.
- **Location-aware results**: Prioritizes businesses near the user's location

## 4. User Flow

1. User visits the landing page
2. Browser requests location access
3. User enters business name in search box
4. System shows location-based business suggestions
5. User selects a business
6. If logged in: redirects to dashboard
7. If not logged in: shows signup/login modal

## 5. Security Notes

- The API key is exposed to the client (required for Google Maps)
- Use domain restrictions in Google Cloud Console
- Monitor API usage to avoid unexpected charges
- Consider implementing rate limiting if needed

## 6. Troubleshooting

- If location access is denied, the search will work globally
- Ensure all required APIs are enabled in Google Cloud Console
- Check browser console for any API-related errors
- Verify the API key has the correct permissions
