import { NavGroup } from '@/types';

/**
 * Detour Car Rental Navigation Configuration
 *
 * Configured for Fleet Command, Vehicle Inventory, Reservations,
 * Regional Depots, Scenic Itineraries, and Dispatch Operations.
 */
export const navGroups: NavGroup[] = [
  {
    label: 'Fleet & Operations',
    items: [
      {
        title: 'Fleet Command',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Fleet Inventory',
        url: '/dashboard/product',
        icon: 'car',
        shortcut: ['f', 'v'],
        isActive: false,
        items: []
      },
      {
        title: 'Reservations',
        url: '/dashboard/bookings',
        icon: 'calendarCheck',
        shortcut: ['b', 'k'],
        isActive: false,
        items: []
      },
      {
        title: 'Depots & Hubs',
        url: '/dashboard/locations',
        icon: 'depot',
        shortcut: ['d', 'p'],
        isActive: false,
        items: []
      },
      {
        title: 'Scenic Drives',
        url: '/dashboard/routes',
        icon: 'route',
        shortcut: ['s', 'r'],
        isActive: false,
        items: []
      },
      {
        title: 'Rental Dispatch',
        url: '/dashboard/kanban',
        icon: 'kanban',
        shortcut: ['k', 'b'],
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Operator Account',
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'profile',
        shortcut: ['m', 'm'],
        items: []
      },
      {
        title: 'Fleet Alerts',
        url: '/dashboard/notifications',
        icon: 'notification',
        shortcut: ['n', 'n'],
        items: []
      }
    ]
  },
  {
    label: 'Guest & Concierge',
    items: [
      {
        title: 'Drivers & Customers',
        url: '/dashboard/users',
        icon: 'teams',
        shortcut: ['u', 'u'],
        isActive: false,
        items: []
      },
      {
        title: 'Concierge Desk',
        url: '/dashboard/chat',
        icon: 'chat',
        shortcut: ['c', 'c'],
        isActive: false,
        items: []
      },
      {
        title: 'Trip Planning AI',
        url: '/dashboard/ai-chat',
        icon: 'sparkles',
        shortcut: ['a', 'i'],
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Contracts & Finance',
    items: [
      {
        title: 'Rental Agreements',
        url: '#',
        icon: 'forms',
        isActive: false,
        items: [
          {
            title: 'Standard Agreement',
            url: '/dashboard/forms/basic',
            icon: 'forms',
            shortcut: ['f', 'f']
          },
          {
            title: 'Multi-Step Checkout',
            url: '/dashboard/forms/multi-step',
            icon: 'forms'
          },
          {
            title: 'Vehicle Inspection Form',
            url: '/dashboard/forms/sheet-form',
            icon: 'forms'
          },
          {
            title: 'Insurance & Terms',
            url: '/dashboard/forms/advanced',
            icon: 'forms'
          }
        ]
      },
      {
        title: 'Depot Workspaces',
        url: '/dashboard/workspaces',
        icon: 'workspace',
        isActive: false,
        items: []
      },
      {
        title: 'Security Deposits',
        url: '/dashboard/billing',
        icon: 'billing',
        shortcut: ['b', 'b'],
        items: []
      }
    ]
  }
];
