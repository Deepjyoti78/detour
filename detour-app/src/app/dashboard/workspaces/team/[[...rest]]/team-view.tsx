'use client';

import PageContainer from '@/components/layout/page-container';
import { OrganizationProfile } from '@clerk/nextjs';
import { teamInfoContent } from '@/config/infoconfig';

export default function TeamView() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
      infoContent={teamInfoContent}
    >
      <OrganizationProfile
        appearance={{
          elements: {
            footer: 'hidden',
            footerAction: 'hidden',
            badge: 'hidden',
            developmentModeBadge: 'hidden'
          }
        }}
      />
    </PageContainer>
  );
}
