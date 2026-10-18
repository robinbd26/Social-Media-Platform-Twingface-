import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('Games workspace', () => {
  it('provides standard-shell game browsing and an embedded player modal contract', () => {
    const page = source('src/app/(main)/games/page.tsx');
    expect(page).toContain("from '@/components/games/games-workspace'");
    const workspace = source('src/components/games/games-workspace.tsx');
    expect(workspace).toContain('All Games');
    expect(workspace).toContain('Weekly Tournaments');
    expect(workspace).toContain('Search games');
    expect(workspace).toContain('/api/games/${gameId}/play');
    expect(workspace).toContain('GamePlayerModal');
  });
});
