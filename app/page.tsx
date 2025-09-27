'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { VideoCard } from './components/VideoCard';
import { VotingPanel } from './components/VotingPanel';
import { 
  TrendingUp, 
  Clock, 
  Star, 
  Play, 
  Users, 
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Video, Proposal } from '@/lib/types';
import { formatNumber, formatCurrency } from '@/lib/utils';
import Link from 'next/link';

// Mock data
const mockVideos: Video[] = [
  {
    videoId: 'vid_1',
    title: 'AI-Generated Product Demo: Revolutionary Tech Showcase',
    description: 'Discover how AI transforms product demonstrations with stunning visuals and engaging narratives.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/demo1.mp4',
    creationDate: new Date('2024-01-15'),
    creatorWalletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    views: 15420,
    likes: 892,
    monetizationType: 'free',
  },
  {
    videoId: 'vid_2',
    title: 'Tutorial: Creating Viral Social Media Content with AI',
    description: 'Learn the secrets of viral content creation using our AI-powered video generation tools.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/tutorial1.mp4',
    creationDate: new Date('2024-01-14'),
    creatorWalletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    views: 8750,
    likes: 654,
    monetizationType: 'paid',
    price: 0.05,
  },
  {
    videoId: 'vid_3',
    title: 'Music Video: AI-Composed Symphony with Visual Effects',
    description: 'Experience the future of music creation with AI-generated compositions and stunning visuals.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/music1.mp4',
    creationDate: new Date('2024-01-13'),
    creatorWalletAddress: '0x9876543210fedcba9876543210fedcba98765432',
    views: 23100,
    likes: 1340,
    monetizationType: 'subscription',
  },
];

const mockProposals: Proposal[] = [
  {
    proposalId: 'prop_1',
    title: 'Implement Advanced AI Voice Cloning Feature',
    description: 'Add the ability for creators to clone their own voices for consistent narration across videos.',
    proposerWalletAddress: '0x1111222233334444555566667777888899990000',
    creationDate: new Date('2024-01-10'),
    upvotes: 1250,
    downvotes: 180,
    status: 'active',
  },
  {
    proposalId: 'prop_2',
    title: 'Reduce Marketplace Transaction Fees',
    description: 'Lower the platform fee from 5% to 3% to encourage more creator participation in the marketplace.',
    proposerWalletAddress: '0xaaabbbbccccddddeeeeffffgggghhhhiiiijjjj',
    creationDate: new Date('2024-01-08'),
    upvotes: 890,
    downvotes: 320,
    status: 'active',
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [stats, setStats] = useState({
    totalVideos: 12450,
    totalCreators: 3200,
    totalRewards: 45.8,
    activeProposals: 8,
  });

  const categories = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 p-8 lg:p-12">
          <div className="relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Create Stunning Videos with{' '}
                <span className="gradient-text">AI Power</span>
              </h1>
              <p className="text-xl text-muted mb-8 leading-relaxed">
                Transform your ideas into professional videos using AI-assisted creation tools, 
                community-driven templates, and blockchain-powered rewards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create" className="btn-primary inline-flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2" />
                  Start Creating
                </Link>
                <Link href="/library" className="btn-secondary inline-flex items-center justify-center">
                  Explore Templates
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="w-full h-full bg-gradient-to-l from-accent to-transparent" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-3">
              <Play className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatNumber(stats.totalVideos)}</div>
            <div className="text-sm text-muted">Videos Created</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatNumber(stats.totalCreators)}</div>
            <div className="text-sm text-muted">Active Creators</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-lg mx-auto mb-3">
              <Award className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold mb-1">{formatCurrency(stats.totalRewards)}</div>
            <div className="text-sm text-muted">Rewards Distributed</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.activeProposals}</div>
            <div className="text-sm text-muted">Active Proposals</div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Videos Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Discover Videos</h2>
              <div className="flex space-x-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-accent text-bg'
                          : 'bg-surface hover:bg-surface/80'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockVideos.map((video) => (
                <VideoCard
                  key={video.videoId}
                  video={video}
                  variant="full"
                  onPlay={(video) => console.log('Playing video:', video.title)}
                  onLike={(videoId) => console.log('Liked video:', videoId)}
                />
              ))}
            </div>

            <div className="text-center">
              <Link href="/library" className="btn-secondary">
                View All Videos
              </Link>
            </div>
          </div>

          {/* Voting Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Community Voting</h2>
              <Link href="/voting" className="text-accent hover:text-accent/80 text-sm font-medium">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {mockProposals.map((proposal) => (
                <VotingPanel
                  key={proposal.proposalId}
                  proposal={proposal}
                  onVote={(proposalId, voteType) => 
                    console.log('Voted:', proposalId, voteType)
                  }
                />
              ))}
            </div>

            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted mb-4">
                Participate in community voting and earn tokens for your engagement.
              </p>
              <Link href="/voting" className="btn-primary w-full">
                Start Voting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
