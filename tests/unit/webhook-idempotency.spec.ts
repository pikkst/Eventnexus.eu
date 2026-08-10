import { test, expect } from 'node:test';
import assert from 'node:assert';
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

test('SupabaseIdempotencyStore.claim returns "new" on successful insert', async () => {
  const mockSupabase = createMockSupabase({ error: null });
  const store = new SupabaseIdempotencyStore(mockSupabase);

  const result = await store.claim({ id: 'msg_123', type: 'email.delivered' });

  assert.strictEqual(result, 'new');
});

test('SupabaseIdempotencyStore.claim returns "duplicate" on PostgreSQL 23505', async () => {
  const mockSupabase = createMockSupabase({
    error: { code: '23505', message: 'duplicate key value violates unique constraint "webhook_events_pkey"' },
  });
  const store = new SupabaseIdempotencyStore(mockSupabase);

  const result = await store.claim({ id: 'msg_456', type: 'email.delivered' });

  assert.strictEqual(result, 'duplicate');
});

test('SupabaseIdempotencyStore.claim throws on non-unique database error', async () => {
  const mockSupabase = createMockSupabase({
    error: { code: '23503', message: 'foreign key violation' },
  });
  const store = new SupabaseIdempotencyStore(mockSupabase);

  await assert.rejects(
    async () => store.claim({ id: 'msg_789', type: 'email.delivered' }),
    { code: '23503' }
  );
});

test('InMemoryIdempotencyStore.claim returns "new" for first event', async () => {
  const store = new InMemoryIdempotencyStore();

  const result = await store.claim({ id: 'msg_111', type: 'email.delivered' });

  assert.strictEqual(result, 'new');
});

test('InMemoryIdempotencyStore.claim returns "duplicate" for same event id', async () => {
  const store = new InMemoryIdempotencyStore();

  await store.claim({ id: 'msg_222', type: 'email.delivered' });
  const result = await store.claim({ id: 'msg_222', type: 'email.delivered' });

  assert.strictEqual(result, 'duplicate');
});
