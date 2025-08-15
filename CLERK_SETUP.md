# Clerk Authentication Setup

This project has been successfully integrated with Clerk for authentication.

## Environment Variables

Create a `.env.local` file in the root directory with:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_ZXRlcm5hbC1zcGlkZXItNDYuY2xlcmsuYWNjb3VudHMuZGV2JA
```

## Authentication Flow

1. **Landing Page** (`/`): Public access - anyone can visit
2. **Dashboard** (`/dashboard`): Protected route - requires authentication
3. **Sign In/Sign Up**: Modal-based authentication using Clerk components

## Key Components

- **ClerkProvider**: Wraps the entire app in `src/main.tsx`
- **Protected Routes**: Dashboard is protected using `<SignedIn>` and `<SignedOut>`
- **Authentication UI**: Uses Clerk's prebuilt components (`<SignInButton>`, `<SignUpButton>`, `<UserButton>`)

## Console Logging

The app includes console.log statements for debugging:

- Clerk publishable key loading
- Component rendering
- User authentication status
- Search submissions and onboarding completion

## Usage

1. Visit the landing page
2. Click "Sign Up" or "Sign In" to authenticate
3. After authentication, you can access the dashboard
4. Use the UserButton to sign out

## Clerk Documentation

For more information, visit: https://clerk.com/docs/quickstarts/react
