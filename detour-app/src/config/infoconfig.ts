import type { InfobarContent } from '@/components/ui/infobar';

export const workspacesInfoContent: InfobarContent = {
  title: 'Depot Workspaces Management',
  sections: [
    {
      title: 'Overview',
      description:
        'The Workspaces page allows you to manage your regional depot workspaces and switch between them. You can view all available depot operational hubs, create new ones, and switch your active hub context.',
      links: [
        {
          title: 'Detour Depot Guide',
          url: '/dashboard/locations'
        }
      ]
    },
    {
      title: 'Creating Workspaces',
      description:
        'To create a new workspace, click the "Add Depot Workspace" button. You will be prompted to enter a workspace name and configure initial regional depot settings.',
      links: []
    },
    {
      title: 'Switching Workspaces',
      description:
        'You can switch between regional hubs by clicking on a workspace in the list. The selected hub becomes your active operating context, and all fleet telemetry will filter accordingly.',
      links: []
    },
    {
      title: 'Workspace Features',
      description:
        'Each depot operates independently with assigned fleet, active reservations, local maintenance staff, and regional rental agreements.',
      links: []
    },
    {
      title: 'Role-Based Access Control',
      description:
        'Secure multi-depot access controls ensure that depot managers and concierge agents can only access vehicles and manifests for their active hub.',
      links: []
    }
  ]
};

export const teamInfoContent: InfobarContent = {
  title: 'Team Management',
  sections: [
    {
      title: 'Overview',
      description:
        'The Team Management page allows you to manage your fleet operations crew, including depot dispatchers, concierge managers, vehicle technicians, and access credentials.',
      links: []
    },
    {
      title: 'Managing Team Members',
      description:
        'You can add, remove, and manage fleet staff from this page. Invite new operations personnel by email, assign depot roles, and control their access levels.',
      links: []
    },
    {
      title: 'Roles and Permissions',
      description:
        'Roles define what actions team members can perform within the depot workspace. Common roles include Fleet Administrator, Depot Dispatcher, and Vehicle Inspector.',
      links: []
    },
    {
      title: 'Security Settings',
      description:
        'Manage security settings for your workspace, including session timeout, two-factor verification, and driver identity validation controls.',
      links: []
    },
    {
      title: 'Organization Settings',
      description:
        'Configure general depot settings such as hub name, operating hours, and local dispatch contacts.',
      links: []
    },
    {
      title: 'Navigation RBAC System',
      description:
        'The application includes a client-side navigation filtering system using the `useNav` hook for instant access control based on user permissions.',
      links: []
    }
  ]
};

export const billingInfoContent: InfobarContent = {
  title: 'Billing & Commercial Fleet Plans',
  sections: [
    {
      title: 'Overview',
      description:
        'The Billing page allows you to manage your commercial depot tier, fleet licensing limits, insurance coverage policies, and merchant payment processing.',
      links: []
    },
    {
      title: 'Available Fleet Plans',
      description:
        'Choose a tier that matches your depot size: Regional Starter (up to 15 vehicles), Commercial Fleet (up to 50 vehicles), or Enterprise Multi-Depot.',
      links: []
    },
    {
      title: 'Plan Features',
      description:
        'Each tier unlocks telemetry monitoring, scenic route publishing, concierge desk ticketing, and real-time fleet damage inspection tools.',
      links: []
    },
    {
      title: 'Access Control',
      description:
        'Fleet tiers define active reservation limits, telemetry reporting frequency, and priority customer roadside assistance dispatch.',
      links: []
    }
  ]
};

export const productInfoContent: InfobarContent = {
  title: 'Product Management',
  sections: [
    {
      title: 'Overview',
      description:
        'The Products page allows you to manage your product catalog. You can view all products in a table format with server-side functionality including sorting, filtering, pagination, and search capabilities. Use the "Add New" button to create new products.',
      links: [
        {
          title: 'Product Management Guide',
          url: '#'
        }
      ]
    },
    {
      title: 'Adding Products',
      description:
        'To add a new product, click the "Add New" button in the page header. You will be taken to a form where you can enter product details including name, description, price, category, and upload product images.',
      links: [
        {
          title: 'Adding Products Documentation',
          url: '#'
        }
      ]
    },
    {
      title: 'Editing Products',
      description:
        'You can edit existing products by clicking on a product row in the table. This will open the product edit form where you can modify any product information. Changes are saved automatically when you submit the form.',
      links: [
        {
          title: 'Editing Products Guide',
          url: '#'
        }
      ]
    },
    {
      title: 'Deleting Products',
      description:
        'Products can be deleted from the product listing table. Click the delete action for the product you want to remove. You will be asked to confirm the deletion before the product is permanently removed from your catalog.',
      links: [
        {
          title: 'Product Deletion Policy',
          url: '#'
        }
      ]
    },
    {
      title: 'Table Features',
      description:
        'The product table includes several powerful features to help you manage large product catalogs efficiently. You can sort columns by clicking on column headers, filter products using the filter controls, navigate through pages using pagination, and quickly find products using the search functionality.',
      links: [
        {
          title: 'Table Features Documentation',
          url: '#'
        },
        {
          title: 'Sorting and Filtering Guide',
          url: '#'
        }
      ]
    },
    {
      title: 'Product Fields',
      description:
        'Each product can have the following fields: Name (required), Description (optional text), Price (numeric value), Category (for organizing products), and Image Upload (for product photos). All fields can be edited when creating or updating a product.',
      links: [
        {
          title: 'Product Fields Specification',
          url: '#'
        }
      ]
    }
  ]
};
