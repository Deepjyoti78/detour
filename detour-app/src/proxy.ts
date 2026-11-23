import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_bm9ibGUtc3BhcnJvdy01OTI2LmNsZXJrLmFjY291bnRzLmRldiQ';
const secretKey =
  process.env.CLERK_SECRET_KEY ||
  'sk_test_Rz7LKvf1cF6g6Du0ddM63Xdq9Vs8lZFyQinJ7YrGoi';

let handler: any = null;
try {
  handler = clerkMiddleware(
    () => NextResponse.next(),
    {
      publishableKey,
      secretKey,
    }
  );
} catch (e) {
  console.warn('Could not initialize clerkMiddleware with provided keys:', e);
}

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (handler) {
    try {
      return await handler(req, event);
    } catch (err) {
      console.warn('Clerk middleware error, proceeding:', err);
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};

