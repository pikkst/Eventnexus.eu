import { test, expect } from '@playwright/test';
import { SupabaseIdempotencyStore, InMemoryIdempotencyStore } from '../../src/lib/webhooks/idempotency';

function createMockSupabase(insertResult: { error: { code?: string; message?: string } | null }) {
  return {
    from: () => ({
      insert: () => ({
        select: () => Promise.resolve(insertResult),
      }),
    }),
  } as any;
}

test.describe('SupabaseIdempotencyStore', () => {
  test('claim returns "new" on successful insert', async () => {
    const mockSupabase = createMockSupabase({ error: null });
    const store = new SupabaseIdempotencyStore(mockSupabase);

    const result = await store.claim({ id: 'msg_123', type: 'email.delivered' });

    expect(result).toBe('new');
  });

  test('claim returns "duplicate" on PostgreSQL 23505', async () => {
    const mockSupabase = createMockSupabase({
      error: { code: '23505', message: 'duplicate key value violates unique constraint "webhook_events_pkey"' },
    });
    const store = new SupabaseIdempotencyStore(mockSupabase);

    const result = await store.claim({ id: 'msg_456', type: 'email.delivered' });

    expect(result).toBe('duplicate');
  });

  test('claim throws on non-unique database error', async () => {
    const mockSupabase = createMockSupabase({
      error: { code: '23503', message: 'foreign key violation' },
    });
    const store = new SupabaseIdempotencyStore(mockSupabase);

    await expect(() => store.claim({ id: 'msg_789', type: 'email.delivered' })).rejects.toMatchObject({
      code: '23503',
    });
  });
});

test.describe('InMemoryIdempotencyStore', () => {
  test('claim returns "new" for first event', async () => {
    const store = new InMemoryIdempotencyStore();

    const result = await store.claim({ id: 'msg_111', type: 'email.delivered' });

    expect(result).toBe('new');
  });

  test('claim returns "duplicate" for same event id', async () => {
    const store = new InMemoryIdempotencyStore();

    await store.claim({ id: 'msg_222', type: 'email.delivered' });
    const result = await store.claim({ id: 'msg_222', type: 'email.delivered' });

    expect(result).toBe('duplicate');
  });
});
