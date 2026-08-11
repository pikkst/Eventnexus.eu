import { createClient } from '@supabase/supabase-js';

function createMockSupabaseClient() {
  let useSingle = false;

  const queryBuilder = {
    select: (_columns: string) => queryBuilder,
    insert: (_data: unknown) => queryBuilder,
    eq: () => queryBuilder,
    neq: () => queryBuilder,
    gt: () => queryBuilder,
    gte: () => queryBuilder,
    lt: () => queryBuilder,
    lte: () => queryBuilder,
    like: () => queryBuilder,
    ilike: () => queryBuilder,
    is: () => queryBuilder,
    in: () => queryBuilder,
    contains: () => queryBuilder,
    containedBy: () => queryBuilder,
    rangeGt: () => queryBuilder,
    rangeGte: () => queryBuilder,
    rangeLt: () => queryBuilder,
    rangeLte: () => queryBuilder,
    range: () => queryBuilder,
    not: () => queryBuilder,
    or: () => queryBuilder,
    and: () => queryBuilder,
    order: () => queryBuilder,
    limit: () => queryBuilder,
    offset: () => queryBuilder,
    single: async () => {
      useSingle = true;
      return {
        data: { id: 'mock-id' },
        error: null,
      };
    },
    then: async (
      resolve: (value: { data: unknown; error: null }) => Promise<void>
    ) => {
      const result = useSingle
        ? { data: { id: 'mock-id' }, error: null }
        : { data: [], error: null };
      await resolve(result);
    },
    data: undefined as unknown,
    error: null,
  };

  return {
    from: (_table: string) => queryBuilder,
  };
}

export function getSupabaseServerClient() {
  if (process.env.SUPABASE_MOCK_MODE === 'true') {
    return createMockSupabaseClient();
  }

  const url = process.env.SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required'
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
