import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define matchers for specific routes and their allowed roles
const matchers = [
  {
    matcher: createRouteMatcher("/admin"),
    allowedRoles: ["admin"], // Only admin can access the /admin route
  },
  {
    matcher: createRouteMatcher("/settings"),
    allowedRoles: ["admin", "customer"], // Admin and customer can access /settings
  },
  {
    matcher: createRouteMatcher("/customer"),
    allowedRoles: ["customer"], // Only customer role can access the /customer route
  },
  {
    matcher: createRouteMatcher("/analytics"),
    allowedRoles: ["admin", "analytics"], // Admin and analytics can access /analytics
  },
  {
    matcher: createRouteMatcher("/listing"),
    allowedRoles: ["admin", "customer"], // Admin and customer can access /listing
  },
  {
    matcher: createRouteMatcher("/order"),
    allowedRoles: ["admin", "customer", "order_manager"], // Admin, customer, and order manager can access /order
  },
];

export default clerkMiddleware((auth, req) => {
  const { sessionClaims, sessionId } = auth();

  // If no session (user not logged in), redirect to login
  if (!sessionId) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to the login page
  }

  // Get the user's role from session claims
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Check if the user has access to the requested route
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      // If the route is matched but the user's role is not allowed, redirect them
      if (!allowedRoles.includes(role!)) {
        return NextResponse.redirect(new URL(`/${role}`, req.url)); // Redirect based on their role
      }
    }
  }

  // If the user is authenticated and has access, proceed as normal
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
