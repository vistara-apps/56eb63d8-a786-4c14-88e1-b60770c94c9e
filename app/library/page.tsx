'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { VideoCard } from '../components/VideoCard';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Play, 
  Download,
  Heart,
  Eye,
  Clock
} from 'lucide-react';
import { Video } from '@/lib/types';
import { VIDEO_CATEGORIES } from '@/lib/constants';

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
  {
    videoId: 'vid_4',
    title: 'Corporate Presentation: Quarterly Results Animated',
    description: 'Professional animated presentation showcasing quarterly business results with dynamic charts.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/corporate1.mp4',
    creationDate: new Date('2024-01-12'),
    creatorWalletAddress: '0x1111222233334444555566667777888899990000',
    views: 5200,
    likes: 234,
    monetizationType: 'paid',
    price: 0.08,
  },
  {
    videoId: 'vid_5',
    title: 'Educational: Climate Change Explained Simply',
    description: 'Complex climate science made accessible through AI-generated animations and clear narration.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/education1.mp4',
    creationDate: new Date('2024-01-11'),
    creatorWalletAddress: '0xaaabbbbccccddddeeeeffffgggghhhhiiiijjjj',
    views: 12800,
    likes: 1120,
    monetizationType: 'free',
  },
  {
    videoId: 'vid_6',
    title: 'Marketing: Brand Story in 60 Seconds',
    description: 'Compelling brand narrative created with AI storytelling and professional video production.',
    thumbnailUrl: '/api/placeholder/400/225',
    storageUrl: '/videos/marketing1.mp4',
    creationDate: new Date('2024-01-10'),
    creatorWalletAddress: '0x9999888877776666555544443333222211110000',
    views: 18500,
    likes: 967,
    monetizationType: 'paid',
    price: 0.12,
  },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || true; // Would filter by category in real app
    const matchesType = selectedType === 'all' || video.monetizationType === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.creationDate.getTime() - a.creationDate.getTime();
      case 'popular':
        return b.views - a.views;
      case 'liked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Video Library</h1>
            <p className="text-muted">
              Discover amazing videos created by our community
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-accent text-bg' : 'hover:bg-surface'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-accent text-bg' : 'hover:bg-surface'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Search videos, creators, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-sm min-w-32"
              >
                <option value="all">All Categories</option>
                {VIDEO_CATEGORIES.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-sm min-w-32"
              >
                <option value="all">All Types</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="subscription">Subscription</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-sm min-w-32"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="liked">Most Liked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted">
            Showing {sortedVideos.length} of {mockVideos.length} videos
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-muted">
            <div className="flex items-center space-x-1">
              <Play className="h-4 w-4" />
              <span>
                {mockVideos.reduce((sum, v) => sum + v.views, 0).toLocaleString()} total views
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>
                {mockVideos.reduce((sum, v) => sum + v.likes, 0).toLocaleString()} total likes
              </span>
            </div>
          </div>
        </div>

        {/* Videos Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVideos.map((video) => (
              <VideoCard
                key={video.videoId}
                video={video}
                variant="full"
                onPlay={(video) => console.log('Playing video:', video.title)}
                onLike={(videoId) => console.log('Liked video:', videoId)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedVideos.map((video) => (
              <div key={video.videoId} className="glass-card p-6">
                <div className="flex gap-6">
                  <div className="w-48 h-28 bg-bg/50 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-muted" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-muted text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{video.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{video.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{video.creationDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {video.monetizationType === 'paid' && video.price && (
                          <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-medium">
                            {video.price} ETH
                          </span>
                        )}
                        <button className="btn-secondary text-sm px-4 py-2">
                          <Play className="h-4 w-4 mr-1" />
                          Watch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedVideos.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-muted mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
