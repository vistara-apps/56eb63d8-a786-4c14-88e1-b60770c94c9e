'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { VideoCard } from '../components/VideoCard';
import { 
  User, 
  Settings2, 
  Video, 
  Heart, 
  Eye, 
  Award,
  TrendingUp,
  Calendar,
  Wallet,
  Edit3
} from 'lucide-react';
import { Video as VideoType, CreatorStats } from '@/lib/types';
import { formatNumber, formatCurrency, formatDate } from '@/lib/utils';
import { ConnectWallet, Wallet as OnchainWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Address } from '@coinbase/onchainkit/identity';

const mockUserVideos: VideoType[] = [
  {
    videoId: 'user_vid_1',
    title: 'My First AI-Generated Tutorial',
    description: 'Learning to use VidSynth for educational content creation.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/user1.mp4',
    creationDate: new Date('2024-01-15'),
    creatorWalletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    views: 2340,
    likes: 156,
    monetizationType: 'free',
  },
  {
    videoId: 'user_vid_2',
    title: 'Product Demo: My SaaS Platform',
    description: 'Showcasing my software product using AI-generated visuals.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/user2.mp4',
    creationDate: new Date('2024-01-12'),
    creatorWalletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    views: 1890,
    likes: 98,
    monetizationType: 'paid',
    price: 0.03,
  },
];

const mockStats: CreatorStats = {
  totalVideos: 12,
  totalViews: 45600,
  totalEarnings: 2.34,
  subscribers: 234,
  engagement: 8.5,
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    bio: 'Content creator passionate about AI-powered video generation and blockchain technology.',
    website: 'https://mywebsite.com',
    twitter: '@myhandle',
  });

  const tabs = [
    { id: 'videos', label: 'My Videos', icon: Video },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings2 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">My Videos ({mockUserVideos.length})</h3>
              <button className="btn-primary">
                Create New Video
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUserVideos.map((video) => (
                <VideoCard
                  key={video.videoId}
                  video={video}
                  variant="full"
                  onPlay={(video) => console.log('Playing video:', video.title)}
                  onLike={(videoId) => console.log('Liked video:', videoId)}
                />
              ))}
            </div>
            
            {mockUserVideos.length === 0 && (
              <div className="text-center py-12">
                <Video className="h-16 w-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No videos yet</h3>
                <p className="text-muted mb-6">
                  Start creating amazing videos with AI assistance
                </p>
                <button className="btn-primary">
                  Create Your First Video
                </button>
              </div>
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Analytics Overview</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-3">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{mockStats.totalVideos}</div>
                <div className="text-sm text-muted">Total Videos</div>
              </div>
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{formatNumber(mockStats.totalViews)}</div>
                <div className="text-sm text-muted">Total Views</div>
              </div>
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                  <User className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{mockStats.subscribers}</div>
                <div className="text-sm text-muted">Subscribers</div>
              </div>
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold mb-1">{mockStats.engagement}%</div>
                <div className="text-sm text-muted">Engagement</div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h4 className="font-semibold mb-4">Performance Trends</h4>
              <div className="h-64 bg-bg/50 rounded-lg flex items-center justify-center">
                <p className="text-muted">Analytics chart would appear here</p>
              </div>
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Earnings Dashboard</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-3">
                  <Wallet className="h-6 w-6 text-accent" />
                </div>
                <div className="text-2xl font-bold mb-1">{formatCurrency(mockStats.totalEarnings)}</div>
                <div className="text-sm text-muted">Total Earnings</div>
              </div>
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{formatCurrency(0.45)}</div>
                <div className="text-sm text-muted">This Month</div>
              </div>
              <div className="metric-card text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
                  <Award className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{formatCurrency(0.12)}</div>
                <div className="text-sm text-muted">Rewards</div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Recent Transactions</h4>
                <button className="btn-secondary text-sm">
                  View All
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { type: 'Video Sale', amount: 0.05, date: '2024-01-15' },
                  { type: 'Voting Reward', amount: 0.02, date: '2024-01-14' },
                  { type: 'Video Sale', amount: 0.03, date: '2024-01-12' },
                ].map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{transaction.type}</p>
                      <p className="text-sm text-muted">{formatDate(new Date(transaction.date))}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-400">+{formatCurrency(transaction.amount)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Profile Settings</h3>
            
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold">Profile Information</h4>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-secondary flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  ) : (
                    <p className="text-muted">{profile.bio}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="text-muted">{profile.website}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.twitter}
                      onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  ) : (
                    <p className="text-muted">{profile.twitter}</p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        // Save profile changes
                      }}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h4 className="font-semibold mb-4">Notification Preferences</h4>
              <div className="space-y-4">
                {[
                  'New video likes and comments',
                  'Voting reminders',
                  'Earnings notifications',
                  'Platform updates',
                ].map((setting) => (
                  <div key={setting} className="flex items-center justify-between">
                    <span className="text-sm">{setting}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="glass-card p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col items-center lg:items-start">
              <OnchainWallet>
                <ConnectWallet>
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24" />
                    <div className="text-center">
                      <Name className="text-xl font-bold" />
                      <Address className="text-sm text-muted" />
                    </div>
                  </div>
                </ConnectWallet>
              </OnchainWallet>
            </div>
            
            <div className="flex-1">
              <div className="mb-6">
                <p className="text-muted mb-4">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-muted" />
                    <span className="text-muted">Joined January 2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="h-4 w-4 text-muted" />
                    <span className="text-muted">{mockStats.totalVideos} videos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-muted" />
                    <span className="text-muted">{mockStats.subscribers} subscribers</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatNumber(mockStats.totalViews)}
                  </div>
                  <div className="text-sm text-muted">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {mockStats.totalVideos}
                  </div>
                  <div className="text-sm text-muted">Videos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {formatCurrency(mockStats.totalEarnings)}
                  </div>
                  <div className="text-sm text-muted">Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {mockStats.engagement}%
                  </div>
                  <div className="text-sm text-muted">Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted hover:text-fg'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </AppShell>
  );
}
