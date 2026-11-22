import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user?: {
    imageUrl?: string;
    fullName?: string | null;
    emailAddresses?: Array<{ emailAddress: string }>;
  } | null;
}

export function sanitizeOperatorName(name?: string | null): string {
  if (!name) return 'Fleet Operations';
  const lower = name.toLowerCase();
  if (
    lower.includes('dikshant') ||
    lower.includes('kiran') ||
    lower.includes('john') ||
    lower.includes('user') ||
    lower.includes('admin')
  ) {
    return 'Fleet Operations';
  }
  return name;
}

export function sanitizeOperatorEmail(email?: string | null): string {
  if (!email) return 'operations@detour.com';
  const lower = email.toLowerCase();
  if (
    lower.includes('dikshant') ||
    lower.includes('kiran') ||
    lower.includes('example') ||
    lower.includes('test')
  ) {
    return 'operations@detour.com';
  }
  return email;
}

export function UserAvatarProfile({ className, showInfo = false, user }: UserAvatarProfileProps) {
  const displayName = sanitizeOperatorName(user?.fullName);
  const displayEmail = sanitizeOperatorEmail(user?.emailAddresses?.[0]?.emailAddress);
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'FO';

  return (
    <div className='flex items-center gap-2.5 flex-1 min-w-0'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={displayName} />
        <AvatarFallback className='bg-primary/10 text-primary font-bold rounded-lg text-xs'>
          {initials}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight min-w-0'>
          <span className='truncate font-semibold text-foreground'>
            {displayName}
          </span>
          <span className='truncate text-xs text-muted-foreground font-mono'>
            {displayEmail}
          </span>
        </div>
      )}
    </div>
  );
}
