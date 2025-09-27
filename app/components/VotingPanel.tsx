'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, User, TrendingUp } from 'lucide-react';
import { Proposal } from '@/lib/types';
import { formatNumber, getTimeAgo } from '@/lib/utils';

interface VotingPanelProps {
  proposal: Proposal;
  variant?: 'proposal' | 'voteResult';
  onVote?: (proposalId: string, voteType: 'upvote' | 'downvote') => void;
}

export function VotingPanel({ 
  proposal, 
  variant = 'proposal', 
  onVote 
}: VotingPanelProps) {
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null);

  const totalVotes = proposal.upvotes + proposal.downvotes;
  const upvotePercentage = totalVotes > 0 ? (proposal.upvotes / totalVotes) * 100 : 0;
  const downvotePercentage = totalVotes > 0 ? (proposal.downvotes / totalVotes) * 100 : 0;

  const handleVote = (voteType: 'upvote' | 'downvote') => {
    if (hasVoted) return;
    
    setHasVoted(true);
    setUserVote(voteType);
    onVote?.(proposal.proposalId, voteType);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400 bg-blue-400/10';
      case 'passed': return 'text-green-400 bg-green-400/10';
      case 'rejected': return 'text-red-400 bg-red-400/10';
      case 'expired': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (variant === 'voteResult') {
    return (
      <div className="glass-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
            <p className="text-muted text-sm mb-3">{proposal.description}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
            {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
          </div>
        </div>

        <div className="space-y-4">
          {/* Vote Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <ThumbsUp className="h-4 w-4 text-green-400" />
                <span>Support</span>
              </div>
              <span className="font-medium">{formatNumber(proposal.upvotes)} ({upvotePercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-bg/50 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${upvotePercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <ThumbsDown className="h-4 w-4 text-red-400" />
                <span>Against</span>
              </div>
              <span className="font-medium">{formatNumber(proposal.downvotes)} ({downvotePercentage.toFixed(1)}%)</span>
            </div>
            <div className="w-full bg-bg/50 rounded-full h-2">
              <div 
                className="bg-red-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${downvotePercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{proposal.proposerWalletAddress.slice(0, 8)}...</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{getTimeAgo(proposal.creationDate)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>{formatNumber(totalVotes)} votes</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
          <p className="text-muted text-sm mb-3">{proposal.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 text-sm text-muted">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{proposal.proposerWalletAddress.slice(0, 8)}...</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{getTimeAgo(proposal.creationDate)}</span>
          </div>
        </div>
        <div className="text-sm text-muted">
          {formatNumber(totalVotes)} votes
        </div>
      </div>

      {proposal.status === 'active' && !hasVoted && (
        <div className="flex space-x-4">
          <button
            onClick={() => handleVote('upvote')}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 py-3 rounded-lg transition-all duration-200 border border-green-500/20"
          >
            <ThumbsUp className="h-5 w-5" />
            <span>Support</span>
          </button>
          <button
            onClick={() => handleVote('downvote')}
            className="flex-1 flex items-center justify-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-lg transition-all duration-200 border border-red-500/20"
          >
            <ThumbsDown className="h-5 w-5" />
            <span>Against</span>
          </button>
        </div>
      )}

      {hasVoted && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
          <p className="text-accent font-medium">
            Thank you for voting! You voted {userVote === 'upvote' ? 'in support' : 'against'} this proposal.
          </p>
          <p className="text-sm text-muted mt-1">
            You'll receive token rewards for participating in governance.
          </p>
        </div>
      )}

      {proposal.status !== 'active' && (
        <div className="bg-muted/10 border border-muted/20 rounded-lg p-4 text-center">
          <p className="text-muted">
            This proposal is no longer active for voting.
          </p>
        </div>
      )}
    </div>
  );
}
