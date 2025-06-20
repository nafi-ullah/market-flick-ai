# Config file for frontend OAuth applications

# Obtain Google OAuth credentials from https://console.cloud.google.com/
# Configure the OAuth consent screen and create OAuth 2.0 Client IDs
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Obtain GitHub OAuth credentials from https://github.com/settings/developers
# Register a new OAuth application and get the client ID and secret
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# CORS Settings
NEXT_PUBLIC_ALLOW_ORIGINS=http://localhost:3000,http://localhost:8000

---

# Logout Implementation Plan for Market Flick AI

## 1. Backend/API
- Create `/api/auth/logout` endpoint that clears the `token` cookie (httpOnly, path=/, expires immediately).
- Update `AuthContext.tsx` to call this endpoint and clear user state on logout.

## 2. UI Placement
- Add a "Logout" button in the header (top navigation bar or user dropdown).
- No confirmation dialog before logging out.

## 3. UX Behavior
- After logout, redirect the user to the homepage.
- Show a toast/notification: "You have been logged out."
- Ensure all user data is cleared from context and localStorage.
- If using SSR, ensure the cookie is cleared server-side.

## 4. Accessibility
- Logout button should be keyboard accessible and screen-reader friendly.

## 5. Exclusions
- No sidebar/logout in sidebar.
- No profile/account page logout.
- No mobile menu-specific logout.
- No confirmation dialog.
- No custom branding/behavior beyond above.

---

**User Preferences:**
1. Logout button location: Header
2. Confirmation dialog: No
3. Redirect after logout: Homepage
4. Show toast/notification: Yes
5. Other custom behavior: No

---

*This plan is based on your answers and ready for implementation.*
