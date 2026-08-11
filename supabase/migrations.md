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
    test_01_anon_cannot_read_profiles.sql
    test_02_auth_can_read_own_profile.sql
    test_03_auth_cannot_read_other_profiles.sql
    test_04_auth_cannot_promote_to_admin.sql
    test_05_admin_can_read_all_profiles.sql
    test_06_admin_can_set_role.sql
    test_07_non_admin_cannot_set_role.sql
    test_08_anon_cannot_read_leads.sql
    test_09_anon_cannot_insert_leads.sql
    test_10_auth_cannot_read_leads.sql
    test_11_auth_cannot_update_leads.sql
    test_12_auth_cannot_delete_leads.sql
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

2. Commit and push the migration to the repository.
3. After review and merge, apply pending migrations to the remote database:

   ```powershell
   supabase db push
   ```

4. Verify the migration applied successfully:

   ```powershell
   supabase migration list
   ```

### Baseline Reconciliation for Existing Environments

These baseline migrations represent schemas that previously existed as manual SQL scripts. On an environment where those scripts have already been applied, `supabase db push` will consider the baseline migrations pending and attempt to replay them. Unguarded objects such as `CREATE POLICY` can then fail because they already exist.

**Before running `supabase db push` on an existing environment:**

1. Verify that the remote schema matches the baseline migration definitions.
2. Mark the baseline migration versions as applied without replaying them:

   ```powershell
   # List applied and pending migrations
   supabase migration list

   # For each baseline version that is already present in the remote schema,
   # insert it into the migration history so future db push operations skip it.
   # Example for version 202508120001:
   supabase db execute --file supabase/migrations/202508120001_create_profiles.sql
   ```

   Alternatively, if the remote `schema_migrations` table is accessible, insert the version rows directly so the migration history matches a clean database.

3. After history is reconciled, continue with normal `supabase db push` for new migrations.

**Important:** Production should only be updated from reviewed and merged migrations. Do not apply uncommitted local migrations directly to production.

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
3. Forward fixes remain part of the same ordered sequence everywhere.

If a pre-existing environment needs history reconciliation because it skipped the buggy migration, perform a controlled baseline repair operation so its migration history matches the canonical ordered chain. Do not manually apply selected SQL out of order.

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
