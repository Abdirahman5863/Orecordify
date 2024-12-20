import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'


const isProtectedRoute = createRouteMatcher([ 
  '/admin',
  '/order',
  '/customer',
  '/analytics',
  '/setting',
  '/privacy',
  '/community',
  '/support',
  '/subscription',
  '/inventory' 
  
])

export default clerkMiddleware(async (auth, req) => {
  if (!(await auth()).userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return (await auth()).redirectToSignIn()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}