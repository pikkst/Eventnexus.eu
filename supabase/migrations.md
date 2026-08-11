# Supabase Migrations

This directory contains versioned database migrations for the Eventnexus Supabase project.

## Structure

```
supabase/
  migrations/
    202508120001_create_profiles.sql
    202508120002_create_admin_users.sql
    202508120003_create_project_leads.sql
    202508120004_create_webhook_events.sql
  tests/
    rls_tests.sql
  config.toml
```

## Local Development

### Prerequisites

- Supabase CLI v2.75.0 or later
- Docker (for local Supabase instance)
- Access to the remote Supabase project `yzsoczlghgcqitevamfo`

### Link to Remote Project

```powershell
supabase link --project-ref yzsoczlghgcqitevamfo
```

### Apply Migrations Locally

```powershell
supabase db reset
```

This creates a fresh local database and applies all migrations in order.

### Create a New Migration

```powershell
supabase migration new <description>
```

Edit the generated file in `supabase/migrations/`.

## Deployment

### Deploy to Production

**Never** edit previously applied migrations. Always create a new forward migration.

1. Create a new migration file locally:

   ```powershell
   supabase migration new <description>
   ```

2. Apply the migration to the remote database:

   ```powershell
   supabase db push
   ```

3. Verify the migration applied successfully:

   ```powershell
   supabase migration list
   ```

4. Commit and push the new migration file to the repository.

### CI Verification

Migrations are verified automatically in CI:

1. A fresh Supabase local database is started.
2. All migrations are applied with `supabase db reset`.
3. RLS tests are executed against the fresh database.

If CI fails, fix the migration locally and re-apply before pushing.

## Rollback and Forward Fixes

### When a Migration Contains a Bug

**Do not edit the already-applied migration.**

Instead:

1. Create a new forward migration that fixes the issue.
2. Apply the new migration to all environments (local, staging, production).
3. If the buggy migration has not yet been applied to an environment, you can skip it by:
   - Manually applying only the fixed migration, or
   - Applying the buggy migration first (it should be idempotent) and then the fix.

### Example: Fixing a Trigger

If a trigger was created without a `DROP TRIGGER IF EXISTS` guard:

```powershell
supabase migration new fix_drop_trigger_before_create
```

In the new migration:

```sql
DROP TRIGGER IF EXISTS trg_example ON public.example_table;
CREATE TRIGGER trg_example
  BEFORE UPDATE ON public.example_table
  FOR EACH ROW
  EXECUTE FUNCTION public.example_function();
```

### Emergency Rollback

If a deployed migration must be reversed immediately:

1. Create a new migration that reverses the change.
2. Apply it to production with `supabase db push`.
3. Document the reason in the migration file header and the PR description.

## Migration Rules

- Migrations are immutable once applied to any environment.
- Each migration file has a timestamp prefix that determines order.
- Functions should use `CREATE OR REPLACE FUNCTION` to be safely repeatable.
- Triggers should use `DROP TRIGGER IF EXISTS` before `CREATE TRIGGER`.
- Indexes should use `CREATE INDEX IF NOT EXISTS`.
- Tables should use `CREATE TABLE IF NOT EXISTS`.
- RLS policies use `CREATE POLICY` (no `OR REPLACE`), so avoid duplicate policy names.
- Do not include secrets, API keys, or production data in migrations.

## Supabase CLI Reference

- `supabase init` - Initialize local Supabase project
- `supabase start` - Start local Supabase services
- `supabase stop` - Stop local Supabase services
- `supabase db reset` - Reset local database and apply all migrations
- `supabase db push` - Apply pending migrations to linked remote project
- `supabase migration new <name>` - Create a new migration file
- `supabase migration list` - List applied and pending migrations
- `supabase db query --file <path>` - Execute a SQL file against the local database
