import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Information logs
  console.log('Session data:', JSON.stringify(session, null, 2));

  const publicRoutes = ['/signin'];

  if (session && publicRoutes.some((route) => pathname === route)) {
    console.log(
      'Authenticated user trying to access public route, redirecting to home',
    );
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!session && !publicRoutes.some((route) => pathname === route)) {
    console.log(
      'Unauthenticated user trying to access protected route:',
      pathname,
    );
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }

  console.log('Access granted to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Auth.js API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images (static images)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
};
