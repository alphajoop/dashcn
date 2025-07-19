'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import DynamicBreadcrumb from '@/components/breadcrumb';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="bg-foreground text-foreground mr-2 h-4"
          />
          <DynamicBreadcrumb />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {session?.user && (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={`https://placehold.co/100x100.png?text=${session.user.name?.charAt(0)}`}
                  alt="User Avatar"
                />
                <AvatarFallback className="rounded-lg">
                  {session.user.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium capitalize">
                  {session.user.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {session.user.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
