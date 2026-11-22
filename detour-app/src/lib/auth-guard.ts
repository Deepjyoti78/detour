import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import prisma from './prisma';
import { Role } from '@/generated/prisma/client';

/**
 * Page & Layout Auth Guard for App Router Server Components
 */
export async function protectRoute() {
  if (process.env.DEMO_MODE === 'true' || process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
    return;
  }

  try {
    await auth.protect();
  } catch (error) {
    if (process.env.DEMO_MODE === 'true' || process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
      return;
    }
    throw error;
  }
}

export type AuthResult =
  | { authorized: true; userId: string; role: Role; isDevBypass?: boolean }
  | { authorized: false; status: number; error: string };

/**
 * Server-side route handler authorization for administrative & fleet mutation endpoints.
 * Eliminates anonymous mutation bypasses while preserving a smooth local developer workflow.
 */
export async function verifyOperatorAuth(request: NextRequest): Promise<AuthResult> {
  try {
    let userId: string | null | undefined = null;
    try {
      const authContext = await auth();
      userId = authContext?.userId;
    } catch {
      // Running in test environment or outside active Clerk Next.js request scope
    }

    // 1. Authenticated via Clerk
    if (userId) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ clerkId: userId }, { role: { in: [Role.ADMIN, Role.OPERATOR] } }],
        },
      });

      // If user exists and is a customer, forbid administrative fleet mutations
      if (user && user.role === Role.CUSTOMER) {
        return {
          authorized: false,
          status: 403,
          error: 'Forbidden: Customer accounts cannot mutate fleet inventory',
        };
      }

      // Default authorized operator
      return {
        authorized: true,
        userId,
        role: user ? user.role : Role.OPERATOR,
      };
    }

    // 2. Unauthenticated request in production
    if (process.env.NODE_ENV === 'production') {
      return {
        authorized: false,
        status: 401,
        error: 'Unauthorized: Valid operator session required',
      };
    }

    // 3. Local Development Mode with explicit operator header check
    // In local development, an explicit operator header (or internal client) is required
    // rather than allowing open anonymous access.
    const devOperatorHeader =
      request.headers.get('x-detour-operator') ||
      request.headers.get('x-detour-operator-dev') ||
      request.headers.get('referer')?.includes('/dashboard');

    if (process.env.DEMO_MODE === 'true' || devOperatorHeader) {
      return {
        authorized: true,
        userId: 'dev-operator-local',
        role: Role.OPERATOR,
        isDevBypass: true,
      };
    }

    return {
      authorized: false,
      status: 401,
      error: 'Unauthorized: Operator authentication required',
    };
  } catch (error) {
    console.error('Error verifying operator auth:', error);
    return {
      authorized: false,
      status: 500,
      error: 'Internal authorization error',
    };
  }
}
