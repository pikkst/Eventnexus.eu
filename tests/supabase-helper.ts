export async function checkSupabaseConnectivity(
  supabaseUrl: string,
  serviceRoleKey: string,
  anonKey: string,
  failOnUnavailable = false
): Promise<boolean> {
  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
    if (failOnUnavailable) {
      throw new Error(
        'Supabase is not reachable and tests require a live database'
      );
    }
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/project_leads?limit=0`,
      {
        method: 'GET',
        signal: controller.signal,
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          Prefer: 'return=minimal',
        },
      }
    );

    clearTimeout(timeout);
    return response.ok || response.status === 401 || response.status === 403;
  } catch {
    if (failOnUnavailable) {
      throw new Error(
        'Supabase is not reachable and tests require a live database'
      );
    }
    return false;
  }
}
