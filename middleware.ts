import { NextRequest, NextResponse } from 'next/server';
import logger from './lib/logger';

export function middleware(request: NextRequest) {
  const startTime = performance.now();

  const { method, nextUrl, headers } = request;

  const ip =
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown';

  const userAgent = headers.get('user-agent') ?? 'unknown';
  const referer = headers.get('referer') ?? 'direct';

  logger.info({
    message: 'HTTP_REQUEST',
    method,
    path: nextUrl.pathname,
    query: nextUrl.search || '',
    ip,
    userAgent: userAgent.slice(0, 120),
    referer,
  });

  const response = NextResponse.next();

  const duration = performance.now() - startTime;

  response.headers.set('X-Response-Time', `${duration.toFixed(2)}ms`);
  response.headers.set('X-Logger', 'enabled');

  logger.info({
    message: 'HTTP_RESPONSE',
    method,
    path: nextUrl.pathname,
    duration: `${duration.toFixed(2)}ms`,
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};