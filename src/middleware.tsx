import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the routes that are publicly accessible
const isPublicRoute = createRouteMatcher([
  '/', // The landing page
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)', // Assuming your API routes are public or handle their own auth
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are NOT public
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};