import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface AdminSession {
  user: {
    id: string;
    email?: string;
  };
  role: 'admin';
}

export interface AdminSessionResult {
  session: AdminSession | null;
  refreshedTokens?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  status: 'admin' | 'authenticated' | 'unauthenticated';
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.split('=');
    const key = name.trim();
    if (key) {
      cookies[key] = rest.join('=').trim();
    }
  });
  return cookies;
}

function createAuthClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
  const key = process.env.PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function createAdminDataClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function verifyAdminRole(userId: string): Promise<boolean> {
  const adminClient = createAdminDataClient();
  const { data: profile } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  return profile?.role === 'admin';
}

export async function getAdminSession(
  request: Request
): Promise<AdminSessionResult> {
  const cookies = parseCookies(request.headers.get('cookie'));
  const accessToken = cookies['sb-access-token'];
  const refreshToken = cookies['sb-refresh-token'];

  if (!accessToken) {
    return { session: null, status: 'unauthenticated' };
  }

  const authClient = createAuthClient();
  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(accessToken);

  if (error || !user) {
    if (!refreshToken) {
      return { session: null, status: 'unauthenticated' };
    }

    const { data: refreshData, error: refreshError } =
      await authClient.auth.refreshSession({ refresh_token: refreshToken });

    if (refreshError || !refreshData.user || !refreshData.session) {
      return { session: null, status: 'unauthenticated' };
    }

    const isAdmin = await verifyAdminRole(refreshData.user.id);
    if (!isAdmin) {
      return { session: null, status: 'authenticated' };
    }

    return {
      session: {
        user: {
          id: refreshData.user.id,
          email: refreshData.user.email ?? undefined,
        },
        role: 'admin',
      },
      status: 'admin',
      refreshedTokens: {
        accessToken: refreshData.session.access_token,
        refreshToken: refreshData.session.refresh_token,
        expiresIn: refreshData.session.expires_in,
      },
    };
  }

  const isAdmin = await verifyAdminRole(user.id);
  if (!isAdmin) {
    return { session: null, status: 'authenticated' };
  }

  return {
    session: {
      user: { id: user.id, email: user.email ?? undefined },
      role: 'admin',
    },
    status: 'admin',
  };
}
