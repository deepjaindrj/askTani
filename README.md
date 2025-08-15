# AskTani - AI-Powered Canadian Call Agent

An intelligent Canadian assistant that handles your business calls 24/7, schedules appointments, and provides excellent customer service.

## Features

- 🤖 **AI-Powered Call Handling**: Intelligent voice agent for business calls
- 📍 **Location-Based Business Search**: Google Maps integration for finding local businesses
- 🔐 **Secure Authentication**: Clerk-powered user management
- 📱 **Responsive Design**: Works seamlessly across all devices
- 🎯 **Canadian Focus**: Tailored for Canadian businesses

## Quick Start

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables (see setup guides below)

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Setup Requirements

### Google Maps API

This project uses Google Maps for business search functionality. See [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md) for detailed setup instructions.

### Authentication

The project uses Clerk for authentication. See [CLERK_SETUP.md](./CLERK_SETUP.md) for setup instructions.

## Environment Variables

Create a `.env` file in the root directory:

```env
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

## User Flow

1. **Landing Page**: User visits the site and sees the hero section with business search
2. **Location Access**: Browser requests location permission for better search results
3. **Business Search**: User enters business name and gets real-time suggestions
4. **Business Selection**: User selects their business from the list
5. **Authentication**: If not logged in, user is prompted to sign up/login
6. **Dashboard**: Logged-in users are taken to their dashboard

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Authentication**: Clerk
- **Maps**: Google Maps JavaScript API
- **Routing**: React Router DOM
- **State Management**: React Query

## Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
