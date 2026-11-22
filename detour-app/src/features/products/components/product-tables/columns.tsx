'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { Product } from '../../api/types';
import type { ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/lib/data-table-features';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<DataTableFeatures, Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'VEHICLE',
    cell: ({ row }) => {
      return (
        <div className='relative size-12 rounded-md overflow-hidden border bg-muted'>
          <Image
            src={row.getValue('photo_url')}
            alt={row.getValue('name')}
            fill
            sizes='48px'
            className='object-cover'
          />
        </div>
      );
    }
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} label='Vehicle Model' />,
    cell: ({ cell }) => <div className='font-semibold text-foreground'>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Vehicle Model',
      placeholder: 'Search fleet...',
      variant: 'text',
      icon: Icons.car
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} label='Class' />,
    cell: ({ cell }) => {
      const category = cell.getValue<Product['category']>();

      return (
        <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-xs capitalize'>
          <Icons.car className='size-3 text-zinc-400' />
          {category}
        </span>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'categories',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} label='Daily Rate' />,
    cell: ({ cell }) => (
      <div className='font-semibold tabular-nums text-foreground'>
        ${cell.getValue<number>()}
        <span className='text-xs text-muted-foreground font-normal'> / day</span>
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: 'SPECS & DESCRIPTION',
    cell: ({ cell }) => (
      <div className='text-xs text-muted-foreground line-clamp-1 max-w-[320px]'>
        {cell.getValue<string>()}
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
