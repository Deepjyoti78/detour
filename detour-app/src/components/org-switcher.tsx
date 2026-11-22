'use client';

import { useAuth, useOrganizationList } from '@clerk/nextjs';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useEffect } from 'react';

export function DetourLogoMark({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox='0 0 46 35' fill='none' className={className} aria-hidden='true'>
      <path
        d='M4 32V17C4 12.6 7.6 9 12 9H40M32 2L41 9L32 16M13 32V21C13 18.8 14.8 17 17 17H26'
        stroke='currentColor'
        strokeWidth='4'
        strokeLinejoin='miter'
      />
    </svg>
  );
}

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const railMenu = state === 'collapsed' && !isMobile;
  const router = useRouter();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
      keepPreviousData: false
    }
  });

  const { orgId } = useAuth();

  useEffect(() => {
    if (userMemberships?.revalidate) {
      void userMemberships.revalidate();
    }
  }, [orgId]);

  // If no user organizations or still loading, show Detour Brand
  if (!isLoaded || !userMemberships?.data || userMemberships.data.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size='lg'
                  className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
                />
              }
            >
              <div className='bg-primary text-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm'>
                <DetourLogoMark className='size-5' />
              </div>
              <div
                className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 overflow-hidden opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              >
                <span className='truncate font-bold tracking-tight text-base font-sans'>DETOUR</span>
                <span className='text-muted-foreground truncate text-[11px]'>Car Rental & Fleet Ops</span>
              </div>
              <Icons.chevronsUpDown
                className={`text-muted-foreground ml-auto transition-all duration-200 ease-in-out ${
                  state === 'collapsed'
                    ? 'invisible max-w-0 opacity-0'
                    : 'visible max-w-full opacity-100'
                }`}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-72 max-w-[calc(100vw-2rem)]'
              align='start'
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={isMobile ? 4 : railMenu ? 16 : 8}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className='text-xs font-semibold text-muted-foreground'>
                  Active Detour Depots
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push('/dashboard/locations')} className='gap-2 p-2'>
                  <div className='flex size-7 items-center justify-center rounded-md border bg-primary/10 text-primary'>
                    <Icons.depot className='size-4' />
                  </div>
                  <div className='grid min-w-0 flex-1 leading-tight'>
                    <span className='font-medium text-xs'>Mumbai Flagship Depot</span>
                    <span className='text-muted-foreground text-[10px]'>10/12 Active • 83% Utilization</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/locations')} className='gap-2 p-2'>
                  <div className='flex size-7 items-center justify-center rounded-md border bg-emerald-500/10 text-emerald-600'>
                    <Icons.depot className='size-4' />
                  </div>
                  <div className='grid min-w-0 flex-1 leading-tight'>
                    <span className='font-medium text-xs'>Goa Coastal Hub</span>
                    <span className='text-muted-foreground text-[10px]'>8/8 Active • 100% Sold Out</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/locations')} className='gap-2 p-2'>
                  <div className='flex size-7 items-center justify-center rounded-md border bg-blue-500/10 text-blue-600'>
                    <Icons.depot className='size-4' />
                  </div>
                  <div className='grid min-w-0 flex-1 leading-tight'>
                    <span className='font-medium text-xs'>Portland Pacific Hub</span>
                    <span className='text-muted-foreground text-[10px]'>7/8 Active • 88% Utilization</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className='gap-2 p-2'
                  onClick={() => router.push('/dashboard/locations')}
                >
                  <div className='flex size-7 items-center justify-center rounded-md border bg-transparent'>
                    <Icons.add className='size-4' />
                  </div>
                  <div className='text-muted-foreground text-xs font-medium'>Manage all 7 Depots</div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const activeOrganization = userMemberships?.data?.find(
    (membership) => membership.organization.id === orgId
  )?.organization;

  const displayOrganization = activeOrganization || userMemberships.data[0]?.organization;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
              />
            }
          >
            <div className='bg-primary text-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
              {displayOrganization?.hasImage && displayOrganization?.imageUrl ? (
                <Image
                  src={displayOrganization.imageUrl}
                  alt={displayOrganization.name}
                  width={32}
                  height={32}
                  className='size-full object-cover'
                />
              ) : (
                <DetourLogoMark className='size-5' />
              )}
            </div>
            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 overflow-hidden opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            >
              <span className='truncate font-medium' title={displayOrganization?.name}>
                {displayOrganization?.name && displayOrganization.name !== 'My Organization'
                  ? displayOrganization.name
                  : 'Detour Fleet Hub'}
              </span>
              <span className='text-muted-foreground truncate text-xs'>
                Detour Operations
              </span>
            </div>
            <Icons.chevronsUpDown
              className={`text-muted-foreground ml-auto transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-72 max-w-[calc(100vw-2rem)]'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={isMobile ? 4 : railMenu ? 16 : 8}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Organizations & Depots</DropdownMenuLabel>
              {userMemberships.data.map((membership) => {
                const isActive = membership.organization.id === orgId;
                return (
                  <DropdownMenuItem
                    key={membership.id}
                    onClick={async () => {
                      if (setActive) {
                        await setActive({ organization: membership.organization.id });
                      }
                    }}
                    className='items-start gap-2 p-1.5'
                  >
                    <div className='flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border'>
                      <DetourLogoMark className='size-4' />
                    </div>
                    <div className='grid min-w-0 flex-1 leading-tight'>
                      <span className='text-pretty wrap-break-word font-medium'>
                        {membership.organization.name === 'My Organization'
                          ? 'Detour Fleet Hub'
                          : membership.organization.name}
                      </span>
                      <span className='text-muted-foreground text-xs'>{membership.role}</span>
                    </div>
                    {isActive && <Icons.check className='mt-1.5 ml-auto size-4' />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='gap-2 p-1.5'
                onClick={() => router.push('/dashboard/workspaces')}
              >
                <div className='flex size-7 items-center justify-center rounded-md border bg-transparent'>
                  <Icons.add className='size-4' />
                </div>
                <div className='text-muted-foreground font-medium'>Add depot workspace</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
