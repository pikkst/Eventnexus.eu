export interface WebhookEvent {
  id: string;
  type: string;
}

export interface IdempotencyStore {
  claim(event: WebhookEvent): Promise<'new' | 'duplicate'>;
}

export class SupabaseIdempotencyStore implements IdempotencyStore {
  constructor(private supabase: ReturnType<typeof import('@supabase/supabase-js').createClient>) {}

  async claim(event: WebhookEvent): Promise<'new' | 'duplicate'> {
    const { error } = await this.supabase
      .from('webhook_events')
      .insert({ id: event.id, type: event.type } as any)
      .select();

    if (error) {
      if (error.code === '23505') {
        return 'duplicate';
      }
      throw error;
    }

    return 'new';
  }
}

export class InMemoryIdempotencyStore implements IdempotencyStore {
  private readonly events = new Map<string, WebhookEvent>();

  async claim(event: WebhookEvent): Promise<'new' | 'duplicate'> {
    if (this.events.has(event.id)) {
      return 'duplicate';
    }

    this.events.set(event.id, event);
    return 'new';
  }
}
