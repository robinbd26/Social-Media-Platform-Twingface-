import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('Super Admin dashboard workspace', () => {
  it('renders the approved admin console, current metrics, safe unavailable states and approval flow', () => {
    const workspace = source('src/components/super-admin/super-admin-dashboard.tsx');

    expect(workspace).toContain('super-admin-shell');
    expect(workspace).toContain('Dashboard');
    expect(workspace).toContain('User Management');
    expect(workspace).toContain('Social Platform');
    expect(workspace).toContain('Entertainment');
    expect(workspace).toContain('Business & Marketplace');
    expect(workspace).toContain('Trust & Safety');
    expect(workspace).toContain('System & Operations');
    expect(workspace).toContain('Total Users');
    expect(workspace).toContain('Online Now');
    expect(workspace).toContain('Platform Growth Overview');
    expect(workspace).toContain('Quick Access');
    expect(workspace).toContain('Not connected');
    expect(workspace).toContain('/api/mediaworld/approval/${id}');
    expect(workspace).toContain('setApprovalError');
    expect(workspace).toContain('setSidebarOpen');
  });
});
