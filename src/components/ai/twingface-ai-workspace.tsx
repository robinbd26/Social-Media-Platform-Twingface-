'use client';

import { useState } from 'react';

type WorkspaceUser = { name: string; username: string; profileImage?: string | null };

const recentChats = [
  'Plan a campaign for my page',
  'Improve this product description',
  'Ideas for a weekend in Dhaka',
  'Help me write a video script',
  'Explain React Server Components',
];

const quickPrompts = [
  ['📝', 'Write'],
  ['🎓', 'Learn'],
  ['💻', 'Code'],
  ['☕', 'Life stuff'],
];

export default function TwingfaceAiWorkspace({ user }: { user: WorkspaceUser }) {
  const [mode, setMode] = useState<'Chat' | 'Cowork'>('Chat');
  const [prompt, setPrompt] = useState('');
  const displayName = user.name?.trim() || user.username || 'there';
  const initial = displayName.charAt(0).toUpperCase() || 'T';

  return (
    <main className='tf-ai-page' aria-label='Twingface AI workspace'>
      <aside className='tf-ai-sidebar'>
        <button className='tf-ai-new-chat' type='button'><span>+</span> New Chat</button>

        <nav className='tf-ai-navigation' aria-label='Twingface AI navigation'>
          <button type='button'>▦ <span>Projects</span></button>
          <button type='button'>✦ <span>Artifacts</span></button>
          <button type='button'>⌘ <span>Code</span><em>Pro</em></button>
          <button type='button'>◌ <span>Customize</span></button>
        </nav>

        <section className='tf-ai-recent' aria-labelledby='recent-chats-title'>
          <div><p id='recent-chats-title'>Recent chats</p><button type='button' aria-label='Search chats'>⌕</button></div>
          <div className='tf-ai-recent-list'>
            {recentChats.map((chat) => <button key={chat} type='button'>{chat}</button>)}
          </div>
        </section>

        <div className='tf-ai-profile-card'>
          <span className='tf-ai-avatar'>{user.profileImage ? <img src={user.profileImage} alt='' /> : initial}</span>
          <span><strong>{displayName}</strong><small>Free plan</small></span>
          <button type='button' aria-label='Search Twingface AI'>⌕</button>
        </div>
      </aside>

      <section className='tf-ai-main'>
        <header className='tf-ai-plan-bar'><span>Free plan</span><button type='button'>Upgrade</button></header>
        <div className='tf-ai-welcome'>
          <span className='tf-ai-spark' aria-hidden='true'>✦</span>
          <h1>Welcome, {displayName}</h1>
          <p>What would you like to create today?</p>
        </div>

        <div className='tf-ai-composer-wrap'>
          <div className='tf-ai-composer'>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder='How can I help you today?' aria-label='Ask Twingface AI' rows={3} />
            <div className='tf-ai-composer-actions'>
              <button className='tf-ai-attach' type='button' aria-label='Attach a file'>+</button>
              <div className='tf-ai-mode-toggle' aria-label='Work mode'>
                {(['Chat', 'Cowork'] as const).map((item) => <button className={mode === item ? 'selected' : ''} key={item} onClick={() => setMode(item)} type='button'>{item}</button>)}
              </div>
              <button className='tf-ai-model' type='button'>Twingface 3.5 Medium <span>⌄</span></button>
              <span className='tf-ai-action-spacer' />
              <button type='button' aria-label='Voice input'>◉</button>
              <button type='button' aria-label='Read aloud'>◌</button>
              <button className='tf-ai-send' type='button' aria-label='Send prompt'>↑</button>
            </div>
          </div>
          <div className='tf-ai-suggestions' aria-label='Prompt suggestions'>
            {quickPrompts.map(([icon, label]) => <button key={label} type='button' onClick={() => setPrompt(`${label}: `)}><span>{icon}</span>{label}</button>)}
          </div>
        </div>
      </section>
    </main>
  );
}
