export async function checkSupabaseConnectivity(
  supabaseUrl: string,
  serviceRoleKey: string,
  anonKey: string
): Promise<boolean> {
  if (!supabaseUrl || !serviceRoleKey || !anonKey) {
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
    return false;
  }
}
