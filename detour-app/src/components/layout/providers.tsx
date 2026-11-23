'use client';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { ActiveThemeProvider } from '../themes/active-theme';
import QueryProvider from './query-provider';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <ClerkProvider
          publishableKey={
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
            'pk_test_bm9ibGUtc3BhcnJvdy01OTI2LmNsZXJrLmFjY291bnRzLmRldiQ'
          }
          appearance={{
            elements: {
              footer: 'hidden',
              footerAction: 'hidden',
              footerActionLink: 'hidden',
              footerPages: 'hidden',
              badge: 'hidden',
              developmentModeBadge: 'hidden'
            },
            variables: {
              colorPrimary: 'var(--primary)',
              colorPrimaryForeground: 'var(--primary-foreground)',
              colorDanger: 'var(--destructive)',
              colorBackground: 'var(--card)',
              colorForeground: 'var(--foreground)',
              colorMuted: 'var(--muted)',
              colorMutedForeground: 'var(--muted-foreground)',
              colorInput: 'var(--input)',
              colorInputForeground: 'var(--foreground)',
              colorBorder: 'var(--border)',
              colorRing: 'var(--ring)',
              fontFamily: 'var(--font-sans)'
            }
          }}
          localization={{
            signIn: {
              start: {
                title: 'Sign in to Detour Fleet',
                subtitle: 'Welcome back! Please sign in to continue'
              }
            },
            signUp: {
              start: {
                title: 'Create Detour Account',
                subtitle: 'Sign up to access Fleet Command'
              }
            },
            organizationList: {
              title: 'Regional Fleet Workspaces',
              subtitle: 'to continue to Detour Fleet Operations',
              action__createOrganization: 'Add Depot Workspace'
            }
          }}
        >
          <QueryProvider>{children}</QueryProvider>
        </ClerkProvider>
      </ActiveThemeProvider>
    </>
  );
}
