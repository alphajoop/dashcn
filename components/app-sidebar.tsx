'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarRail,
} from '@/components/ui/sidebar';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

import { menuItems } from '@/data/navigation';
import { UserMenu } from '@/components/user-menu';
import { signOut, useSession } from 'next-auth/react';
import { useSidebar } from '@/components/ui/sidebar';

export function AppSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const { isMobile } = useSidebar();
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Dashcn Dashboard</span>
                <span className="text-xs capitalize">{user?.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Général</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user ? (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserMenu
                user={user}
                signOut={handleSignOut}
                isMobile={isMobile}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      ) : null}
      <SidebarRail />
    </Sidebar>
  );
}
