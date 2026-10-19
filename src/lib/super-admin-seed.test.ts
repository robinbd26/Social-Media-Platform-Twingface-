import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(join(process.cwd(), 'scripts', 'seed-super-admin.ts'), 'utf8');

describe('seed-super-admin', () => {
  it('reads the admin password from the environment and creates only a SUPER_ADMIN account', () => {
    expect(source).toContain('process.env.SUPER_ADMIN_PASSWORD');
    expect(source).toContain("email: 'superadmin@gmail.com'");
    expect(source).toContain("username: 'superadmin'");
    expect(source).toContain("role: 'SUPER_ADMIN'");
    expect(source).not.toContain('admin123456##');
  });
});
