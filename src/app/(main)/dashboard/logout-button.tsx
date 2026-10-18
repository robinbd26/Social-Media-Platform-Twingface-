'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ variant = 'button' }: { variant?: 'button' | 'menu' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }

  if (variant === 'menu') {
    return (
      <button
        type='button'
        role='menuitem'
        className='profile-menu-item'
        onClick={logout}
        disabled={loading}
        data-testid='menu-item-logout'
      >
        <span className='menu-icon'>
          <svg aria-hidden='true' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' /><path d='m16 17 5-5-5-5M21 12H9' /></svg>
        </span>
        <span>{loading ? 'Signing out…' : 'Log out'}</span>
      </button>
    );
  }

  return <button className='btn' type='button' disabled={loading} onClick={logout}><span>{loading ? 'Signing out…' : 'Log out'}</span><span>→</span></button>;
}
