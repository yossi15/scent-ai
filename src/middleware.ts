import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes that are fully public (no auth needed)
const isPublicRoute = createRouteMatcher([
  '/',
  '/fragrance/(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/recommend(.*)',
  '/api/quiz(.*)',
  '/api/sample-request(.*)',
  // dashboard redirects to sign-in itself if not authenticated
  '/dashboard(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // All other routes (e.g. /api/collection, /api/diary) are protected
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jit|svg|png|gif|webp|ico|ttf|woff2?)).*)',
    '/(api|trpc)(.*)',
  ],
};
