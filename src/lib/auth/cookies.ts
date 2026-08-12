const isProduction = process.env.NODE_ENV === 'production';

export const cookieOptions = {
  path: '/',
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
} as const;
