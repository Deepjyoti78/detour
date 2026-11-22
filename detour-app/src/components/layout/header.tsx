import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { ThemeSelector } from '../themes/theme-selector';
import { ThemeModeToggle } from '../themes/theme-mode-toggle';
import { SidebarToggle } from './sidebar-toggle';
import { NotificationCenter } from '@/features/notifications/components/notification-center';
import { Icons } from '../icons';

export default function Header() {
  return (
    <header className='flex h-14 shrink-0 items-center gap-3 border-b px-3 md:px-4'>
      <div className='flex min-w-0 flex-1 items-center'>
        <SidebarToggle />
        <Separator
          orientation='vertical'
          className='mr-3 ml-1.5 data-vertical:h-4 data-vertical:self-center'
        />
        <Breadcrumbs />
      </div>

      <div className='flex shrink-0 items-center gap-1.5'>
        <Link
          href='/'
          className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground border border-border/70 transition-colors mr-1'
          title='Back to Detour Car Rental Website'
        >
          <Icons.car className='size-3.5' />
          <span className='hidden sm:inline'>Detour Site</span>
          <span className='text-[10px] text-muted-foreground'>↗</span>
        </Link>
        <SearchInput />
        <ThemeModeToggle />
        <div className='hidden sm:block'>
          <ThemeSelector />
        </div>
        <NotificationCenter />
      </div>
    </header>
  );
}
