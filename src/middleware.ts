import { defineMiddleware } from 'astro:middleware';
import { getAdminSession } from './lib/auth/session';
import { cookieOptions } from './lib/auth/cookies';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  if (!path.startsWith('/admin')) {
    return next();
  }

  const isLoginPage = path === '/admin/login';
  const result = await getAdminSession(context.request);

  if (result.refreshedTokens) {
    const maxAge = Math.max(0, result.refreshedTokens.expiresIn);
    context.cookies.set('sb-access-token', result.refreshedTokens.accessToken, {
      ...cookieOptions,
      maxAge,
    });
    context.cookies.set(
      'sb-refresh-token',
      result.refreshedTokens.refreshToken,
      {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 30,
      }
    );
  }

  if (!result.session) {
    if (isLoginPage) {
      return next();
    }
    return context.redirect('/admin/login', 302);
  }

  if (isLoginPage) {
    return context.redirect('/admin', 302);
  }

  (context.locals as Record<string, unknown>).admin = result.session;
  return next();
});
