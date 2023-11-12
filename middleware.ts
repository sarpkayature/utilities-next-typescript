import type { NextRequest } from 'next/server';

let locales = ['en', 'tr'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const localeFromHeader = request.headers.get('Accept-Language');
  if (localeFromHeader) {
    const locale = localeFromHeader.split(',')[0];
    if (locales.includes(locale)) return locale;
  }
  return 'en';
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
