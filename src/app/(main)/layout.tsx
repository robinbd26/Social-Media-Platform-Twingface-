import { MessengerProvider } from '@/components/messages/messenger-context';
import MessengerDock from '@/components/messages/messenger-dock';
import { CallProvider } from '@/components/messages/call-context';
import CallOverlay from '@/components/messages/call-overlay';
import PresenceHeartbeat from '@/components/presence/presence-heartbeat';

// Shared shell for every signed-in page. Hosting the messenger + call
// providers here (instead of per-page) guarantees exactly one signalling SSE
// listener and one incoming-call overlay no matter which route the callee is
// on — previously only /dashboard and /[username] could receive calls.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MessengerProvider>
      <CallProvider>
        <PresenceHeartbeat />
        {children}
        <MessengerDock />
        <CallOverlay />
      </CallProvider>
    </MessengerProvider>
  );
}
