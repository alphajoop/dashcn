'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LayoutDashboard } from 'lucide-react';
import { routeNameMapping } from '@/data/navigation';

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              <div className="flex items-center">
                <LayoutDashboard className="mr-1 h-3.5 w-3.5" />
                Tableau de bord
              </div>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex flex-nowrap items-center">
              <LayoutDashboard className="mr-1 h-3.5 w-3.5" />
              Tableau de bord
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const isId = segment.startsWith('[') && segment.endsWith(']');

          const href = `/${segments.slice(0, index + 1).join('/')}`;

          let segmentName = routeNameMapping[segment] || segment;

          if (isId) {
            segmentName = 'Détails';
          } else if (/^\d+$/.test(segment)) {
            segmentName = 'ID: ' + segment;
          }

          const isLastSegment = index === segments.length - 1;

          return (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLastSegment ? (
                  <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{segmentName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
