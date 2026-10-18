'use client';

import { useState } from 'react';

type Profile = {
  id: string;
  fullName: string;
  profession: string;
  division: string;
  district: string;
  createdAt: string;
};

export default function MediaWorldAdminDashboard({
  stats,
  profiles,
}: {
  stats: { pending: number; approved: number; rejected: number; totalUsers: number };
  profiles: Profile[];
}) {
  const [pending, setPending] = useState(profiles);

  async function approve(id: string) {
    const res = await fetch(`/api/mediaworld/approval/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'approve' }) });
    if (res.ok) setPending((p) => p.filter((x) => x.id !== id));
  }

  async function reject(id: string) {
    const res = await fetch(`/api/mediaworld/approval/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'reject' }) });
    if (res.ok) setPending((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div data-testid="super-admin-dashboard">
      <h1>Super Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        <div className="fb-card surface"><div>Pending Approvals</div><div>{stats.pending}</div></div>
        <div className="fb-card surface"><div>Approved Professionals</div><div>{stats.approved}</div></div>
        <div className="fb-card surface"><div>Rejected</div><div>{stats.rejected}</div></div>
        <div className="fb-card surface"><div>Total Users</div><div>{stats.totalUsers}</div></div>
      </div>

      <h2>Recent Pending Approvals</h2>
      {pending.map((p) => (
        <div key={p.id} className="fb-card surface">
          <div>
            <div>{p.fullName}</div>
            <div>{p.profession}</div>
            <div>{p.district}</div>
            <div>{new Date(p.createdAt).toLocaleDateString()}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" className="fb-btn fb-btn-primary" onClick={() => void approve(p.id)}>Approve</button>
            <button type="button" className="fb-btn fb-btn-secondary" onClick={() => void reject(p.id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

