'use client';

import { useState } from 'react';
import { 
  Video, 
  Home, 
  Search, 
  Plus, 
  User, 
  Settings2,
  Vote,
  Library,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Create', href: '/create', icon: Plus },
  { name: 'Library', href: '/library', icon: Library },
  { name: 'Voting', href: '/voting', icon: Vote },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Profile', href: '/profile', icon: User },
];

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg">
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold gradient-text">VidSynth</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-bg/50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn("nav-link flex items-center space-x-3", {
                    "active": isActive
                  })}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:bg-surface lg:border-r lg:border-border lg:block">
        <div className="flex items-center space-x-2 p-6">
          <Video className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold gradient-text">VidSynth</span>
        </div>
        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn("nav-link flex items-center space-x-3", {
                  "active": isActive
                })}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-bg/50 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden md:flex items-center space-x-2 bg-bg/50 rounded-lg px-3 py-2 min-w-96">
                <Search className="h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search videos, creators, templates..."
                  className="bg-transparent border-none outline-none flex-1 text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-lg border border-accent/20">
                    <Avatar className="h-6 w-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
