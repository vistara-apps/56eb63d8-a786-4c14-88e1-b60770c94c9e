'use client';

import { useState } from 'react';
import { Play, Heart, Eye, Clock, User, MoreVertical } from 'lucide-react';
import { Video } from '@/lib/types';
import { formatNumber, formatDuration, getTimeAgo, formatCurrency } from '@/lib/utils';
import Image from 'next/image';

interface VideoCardProps {
  video: Video;
  variant?: 'preview' | 'full';
  onPlay?: (video: Video) => void;
  onLike?: (videoId: string) => void;
}

export function VideoCard({ 
  video, 
  variant = 'preview', 
  onPlay, 
  onLike 
}: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(video.videoId);
  };

  const handlePlay = () => {
    onPlay?.(video);
  };

  if (variant === 'full') {
    return (
      <div className="video-card">
        <div className="relative aspect-video bg-bg/50 rounded-t-lg overflow-hidden group">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="bg-accent text-bg p-4 rounded-full hover:scale-110 transition-transform duration-200"
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {formatDuration(180)} {/* Mock duration */}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1">
              {video.title}
            </h3>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-bg/50 rounded relative"
            >
              <MoreVertical className="h-4 w-4" />
              {showMenu && (
                <div className="absolute right-0 top-8 bg-surface border border-border rounded-lg shadow-lg py-2 min-w-32 z-10">
                  <button className="w-full text-left px-4 py-2 hover:bg-bg/50 text-sm">
                    Share
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-bg/50 text-sm">
                    Save
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-bg/50 text-sm">
                    Report
                  </button>
                </div>
              )}
            </button>
          </div>
          
          <p className="text-muted text-sm mb-3 line-clamp-2">
            {video.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(video.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{formatNumber(video.likes)}</span>
              </div>
            </div>
            <span>{getTimeAgo(video.creationDate)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-medium">
                {video.creatorWalletAddress.slice(0, 8)}...
              </span>
            </div>
            
            {video.monetizationType === 'paid' && video.price && (
              <div className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-medium">
                {formatCurrency(video.price)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="video-card cursor-pointer" onClick={handlePlay}>
      <div className="relative aspect-video bg-bg/50 rounded-t-lg overflow-hidden group">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="bg-accent text-bg p-3 rounded-full">
            <Play className="h-5 w-5 fill-current" />
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
          {formatDuration(180)}
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium line-clamp-2 mb-2">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{formatNumber(video.views)}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <Heart className={`h-3 w-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{formatNumber(video.likes)}</span>
            </button>
          </div>
          <span>{getTimeAgo(video.creationDate)}</span>
        </div>
      </div>
    </div>
  );
}
