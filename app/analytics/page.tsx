'use client';

import { AppShell } from '../components/AppShell';
import { 
  TrendingUp, 
  Users, 
  Video, 
  Award,
  Eye,
  Heart,
  Share2,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';
import { formatNumber, formatCurrency } from '@/lib/utils';

export default function AnalyticsPage() {
  const stats = {
    totalViews: 125400,
    totalVideos: 45,
    totalCreators: 1200,
    totalEarnings: 23.5,
    monthlyGrowth: 15.2,
    engagementRate: 8.7,
  };

  const topVideos = [
    { title: 'AI Tutorial: Getting Started', views: 15420, likes: 892, creator: '0x1234...5678' },
    { title: 'Music Video: AI Symphony', views: 12800, likes: 756, creator: '0xabcd...ef12' },
    { title: 'Product Demo: SaaS Platform', views: 9650, likes: 543, creator: '0x9876...5432' },
  ];

  const topCreators = [
    { address: '0x1234567890abcdef', videos: 12, views: 45600, earnings: 5.67 },
    { address: '0xabcdef1234567890', videos: 8, views: 32100, earnings: 4.23 },
    { address: '0x9876543210fedcba', videos: 15, views: 28900, earnings: 3.89 },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
          <p className="text-muted">
            Comprehensive insights into VidSynth platform performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-3">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatNumber(stats.totalViews)}</div>
            <div className="text-sm text-muted">Total Views</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-3">
              <Video className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.totalVideos}</div>
            <div className="text-sm text-muted">Total Videos</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mx-auto mb-3">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatNumber(stats.totalCreators)}</div>
            <div className="text-sm text-muted">Active Creators</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
              <Award className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatCurrency(stats.totalEarnings)}</div>
            <div className="text-sm text-muted">Total Earnings</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.monthlyGrowth}%</div>
            <div className="text-sm text-muted">Monthly Growth</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-3">
              <Heart className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.engagementRate}%</div>
            <div className="text-sm text-muted">Engagement</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Views Over Time</h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-muted" />
                <select className="bg-surface border border-border rounded px-3 py-1 text-sm">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>
            <div className="h-64 bg-bg/50 rounded-lg flex items-center justify-center">
              <p className="text-muted">Views chart would appear here</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Creator Growth</h3>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted" />
                <select className="bg-surface border border-border rounded px-3 py-1 text-sm">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>
            <div className="h-64 bg-bg/50 rounded-lg flex items-center justify-center">
              <p className="text-muted">Creator growth chart would appear here</p>
            </div>
          </div>
        </div>

        {/* Top Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Top Performing Videos</h3>
            <div className="space-y-4">
              {topVideos.map((video, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-bg/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <div>
                      <h4 className="font-medium line-clamp-1">{video.title}</h4>
                      <p className="text-sm text-muted">by {video.creator}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(video.views)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{formatNumber(video.likes)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Top Creators</h3>
            <div className="space-y-4">
              {topCreators.map((creator, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-bg/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">{creator.address.slice(0, 10)}...</h4>
                      <p className="text-sm text-muted">{creator.videos} videos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatNumber(creator.views)} views</div>
                    <div className="text-sm text-green-400">{formatCurrency(creator.earnings)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-6">Recent Platform Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'video', action: 'New video created', user: '0x1234...5678', time: '2 minutes ago' },
              { type: 'vote', action: 'Voted on proposal', user: '0xabcd...ef12', time: '5 minutes ago' },
              { type: 'earning', action: 'Earned from video sale', user: '0x9876...5432', time: '10 minutes ago' },
              { type: 'video', action: 'Video liked', user: '0x1111...2222', time: '15 minutes ago' },
              { type: 'vote', action: 'New proposal created', user: '0x3333...4444', time: '20 minutes ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-bg/50 rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'video' ? 'bg-primary/20' :
                  activity.type === 'vote' ? 'bg-accent/20' :
                  'bg-green-500/20'
                }`}>
                  {activity.type === 'video' && <Video className="h-4 w-4 text-primary" />}
                  {activity.type === 'vote' && <Award className="h-4 w-4 text-accent" />}
                  {activity.type === 'earning' && <TrendingUp className="h-4 w-4 text-green-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted">by {activity.user}</p>
                </div>
                <div className="text-xs text-muted">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
