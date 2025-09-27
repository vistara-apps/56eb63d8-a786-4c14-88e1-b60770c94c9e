'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { VideoCard } from '../components/VideoCard';
import { VotingPanel } from '../components/VotingPanel';
import { Video, Proposal } from '@/lib/types';

const mockVideo: Video = {
  videoId: 'preview_vid',
  title: 'Theme Preview Video',
  description: 'This is a sample video to showcase the current theme styling.',
  thumbnailUrl: '/api/placeholder/400/225',
  storageUrl: '/videos/preview.mp4',
  creationDate: new Date(),
  creatorWalletAddress: '0x1234567890abcdef1234567890abcdef12345678',
  views: 1234,
  likes: 89,
  monetizationType: 'free',
};

const mockProposal: Proposal = {
  proposalId: 'preview_prop',
  title: 'Theme Preview Proposal',
  description: 'This is a sample proposal to showcase the current theme styling for voting components.',
  proposerWalletAddress: '0x1234567890abcdef1234567890abcdef12345678',
  creationDate: new Date(),
  upvotes: 150,
  downvotes: 25,
  status: 'active',
};

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'VidSynth Pro', description: 'Professional video creation theme' },
    { id: 'celo', name: 'Celo', description: 'Black & gold Celo theme' },
    { id: 'solana', name: 'Solana', description: 'Purple Solana theme' },
    { id: 'base', name: 'Base', description: 'Blue Base theme' },
    { id: 'coinbase', name: 'Coinbase', description: 'Navy Coinbase theme' },
  ] as const;

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Theme Preview</h1>
          <p className="text-muted mb-8">
            Switch between different themes to see how VidSynth adapts to different blockchain ecosystems.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`px-6 py-3 rounded-lg border transition-all duration-200 ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <div className="font-medium">{themeOption.name}</div>
                <div className="text-xs text-muted">{themeOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Video Card Component</h2>
            <VideoCard video={mockVideo} variant="full" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-accent mb-1">12.4K</div>
                <div className="text-sm text-muted">Total Videos</div>
              </div>
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-primary mb-1">3.2K</div>
                <div className="text-sm text-muted">Creators</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold">Voting Component</h2>
            <VotingPanel proposal={mockProposal} />
            
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">UI Elements</h3>
              <div className="space-y-4">
                <button className="btn-primary w-full">Primary Button</button>
                <button className="btn-secondary w-full">Secondary Button</button>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-accent font-medium">Accent colored notification</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-bg border border-border rounded-lg mx-auto mb-2"></div>
              <div className="text-xs">Background</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-surface border border-border rounded-lg mx-auto mb-2"></div>
              <div className="text-xs">Surface</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
              <div className="text-xs">Accent</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
              <div className="text-xs">Primary</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-border rounded-lg mx-auto mb-2"></div>
              <div className="text-xs">Border</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-2"></div>
              <div className="text-xs">Muted</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
