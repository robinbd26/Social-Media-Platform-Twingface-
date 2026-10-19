import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(join(process.cwd(), 'src', 'app', '(auth)', 'auth-form.tsx'), 'utf8');

describe('AuthForm identity controls', () => {
  it('uses one email, phone, or User ID field for login', () => {
    expect(source).toContain("const [identifier, setIdentifier] = useState('');");
    expect(source).toContain("body: JSON.stringify({ identifier, password })");
    expect(source).toContain("idl: 'Email, phone, or User ID'");
  });

  it('sends a super admin to its protected dashboard after login', () => {
    expect(source).toContain("data.user?.role === 'SUPER_ADMIN' ? '/super_admin' : '/dashboard'");
  });

  it('shows a generated, read-only User ID and offers a one-click password suggestion', () => {
    expect(source).toContain("const [rUsername, setRUsername] = useState(() => createSuggestedUserId(''));");
    expect(source).toContain("htmlFor='ra-username'");
    expect(source).toContain('username: rUsername');
    expect(source).toContain('readOnly');
    expect(source).toContain('Suggest strong password');
    expect(source).toContain('setRPw(suggestedPassword)');
    expect(source).toContain('setRCpw(suggestedPassword)');
  });
});
