'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { VotingPanel } from '../components/VotingPanel';
import { 
  Plus, 
  Filter, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Users,
  Award
} from 'lucide-react';
import { Proposal } from '@/lib/types';
import { PROPOSAL_CATEGORIES } from '@/lib/constants';

const mockProposals: Proposal[] = [
  {
    proposalId: 'prop_1',
    title: 'Implement Advanced AI Voice Cloning Feature',
    description: 'Add the ability for creators to clone their own voices for consistent narration across videos. This would include voice training, quality controls, and ethical guidelines.',
    proposerWalletAddress: '0x1111222233334444555566667777888899990000',
    creationDate: new Date('2024-01-10'),
    upvotes: 1250,
    downvotes: 180,
    status: 'active',
  },
  {
    proposalId: 'prop_2',
    title: 'Reduce Marketplace Transaction Fees',
    description: 'Lower the platform fee from 5% to 3% to encourage more creator participation in the marketplace and increase overall transaction volume.',
    proposerWalletAddress: '0xaaabbbbccccddddeeeeffffgggghhhhiiiijjjj',
    creationDate: new Date('2024-01-08'),
    upvotes: 890,
    downvotes: 320,
    status: 'active',
  },
  {
    proposalId: 'prop_3',
    title: 'Add Multi-Language Support for AI Generation',
    description: 'Expand AI video generation to support 15+ languages including Spanish, French, German, Japanese, and Chinese for global creator accessibility.',
    proposerWalletAddress: '0x9999888877776666555544443333222211110000',
    creationDate: new Date('2024-01-05'),
    upvotes: 2100,
    downvotes: 150,
    status: 'passed',
  },
  {
    proposalId: 'prop_4',
    title: 'Implement Creator Verification System',
    description: 'Create a verification badge system for established creators to build trust and help users identify authentic content creators.',
    proposerWalletAddress: '0xbbbbccccddddeeeeffffgggghhhhiiiijjjjkkkk',
    creationDate: new Date('2024-01-03'),
    upvotes: 450,
    downvotes: 890,
    status: 'rejected',
  },
];

export default function VotingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProposals = mockProposals.filter(proposal => {
    const categoryMatch = selectedCategory === 'all' || true; // Would filter by category in real app
    const statusMatch = selectedStatus === 'all' || proposal.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const stats = {
    totalProposals: mockProposals.length,
    activeProposals: mockProposals.filter(p => p.status === 'active').length,
    passedProposals: mockProposals.filter(p => p.status === 'passed').length,
    totalVotes: mockProposals.reduce((sum, p) => sum + p.upvotes + p.downvotes, 0),
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Governance</h1>
            <p className="text-muted">
              Shape the future of VidSynth through decentralized voting
            </p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Proposal
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.totalProposals}</div>
            <div className="text-sm text-muted">Total Proposals</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-3">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.activeProposals}</div>
            <div className="text-sm text-muted">Active Voting</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.passedProposals}</div>
            <div className="text-sm text-muted">Passed</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-3">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold mb-1">{stats.totalVotes.toLocaleString()}</div>
            <div className="text-sm text-muted">Total Votes</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-muted" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              {PROPOSAL_CATEGORIES.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="passed">Passed</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal) => (
            <VotingPanel
              key={proposal.proposalId}
              proposal={proposal}
              variant={proposal.status === 'active' ? 'proposal' : 'voteResult'}
              onVote={(proposalId, voteType) => 
                console.log('Voted:', proposalId, voteType)
              }
            />
          ))}
        </div>

        {/* Create Proposal Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Create New Proposal</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-muted hover:text-fg"
                  >
                    ×
                  </button>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Enter proposal title..."
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent">
                      {PROPOSAL_CATEGORIES.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      rows={6}
                      placeholder="Provide a detailed description of your proposal..."
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>
                  
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-accent font-medium mb-2">Proposal Requirements</p>
                    <ul className="text-sm text-muted space-y-1">
                      <li>• Minimum 100 tokens required to create a proposal</li>
                      <li>• Proposals are active for 7 days</li>
                      <li>• 60% approval rate required to pass</li>
                    </ul>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      Create Proposal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
