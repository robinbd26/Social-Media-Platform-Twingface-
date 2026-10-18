import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = (file: string) => readFileSync(resolve(process.cwd(), file), 'utf8');

describe('Twingface AI workspace', () => {
  it('renders the Claude-style navigation and prompt workspace contract', () => {
    const page = source('src/app/(main)/ai/page.tsx');

    expect(page).toContain("from '@/components/ai/twingface-ai-workspace'");
    expect(page).toContain('<TwingfaceAiWorkspace');

    const workspace = source('src/components/ai/twingface-ai-workspace.tsx');
    expect(workspace).toContain('New Chat');
    expect(workspace).toContain('Projects');
    expect(workspace).toContain('Welcome,');
    expect(workspace).toContain('How can I help you today?');
    expect(workspace).toContain('Twingface 3.5 Medium');
  });
});
