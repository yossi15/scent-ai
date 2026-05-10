'use client';

import { useState } from 'react';
import { Sparkles, Users as UsersIcon, CreditCard, Package, ShieldCheck } from 'lucide-react';
import FragrancesTab from './tabs/FragrancesTab';
import UsersTab from './tabs/UsersTab';
import SubscriptionsTab from './tabs/SubscriptionsTab';
import SampleRequestsTab from './tabs/SampleRequestsTab';

type TabId = 'fragrances' | 'users' | 'subscriptions' | 'samples';

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'fragrances',    label: 'בשמים',         icon: Sparkles },
  { id: 'users',         label: 'משתמשים',       icon: UsersIcon },
  { id: 'subscriptions', label: 'מנויים',        icon: CreditCard },
  { id: 'samples',       label: 'בקשות דגימה',   icon: Package },
];

export default function AdminClient() {
  const [tab, setTab] = useState<TabId>('fragrances');

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 bg-bg-primary" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gold-faint flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="font-serif text-3xl text-ink font-bold">לוח בקרה</h1>
            <p className="text-ink-faint text-xs font-hebrew">ניהול SCENTORY</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-hebrew font-medium border-b-2 transition-colors ${
                tab === id
                  ? 'border-gold text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Active tab */}
        <div>
          {tab === 'fragrances'    && <FragrancesTab />}
          {tab === 'users'         && <UsersTab />}
          {tab === 'subscriptions' && <SubscriptionsTab />}
          {tab === 'samples'       && <SampleRequestsTab />}
        </div>
      </div>
    </main>
  );
}
