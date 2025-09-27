export interface User {
  walletAddress: string;
  username: string;
  profilePicUrl?: string;
  creationDate: Date;
  tokenBalance: number;
  stakedAmount: number;
}

export interface Video {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  storageUrl: string;
  creationDate: Date;
  creatorWalletAddress: string;
  views: number;
  likes: number;
  monetizationType: 'free' | 'paid' | 'subscription';
  price?: number;
}

export interface MediaAsset {
  assetId: string;
  name: string;
  description: string;
  url: string;
  type: 'video' | 'image' | 'audio';
  uploaderWalletAddress: string;
  licenseType: 'royalty-free' | 'commercial' | 'personal';
  price: number;
}

export interface Proposal {
  proposalId: string;
  title: string;
  description: string;
  proposerWalletAddress: string;
  creationDate: Date;
  upvotes: number;
  downvotes: number;
  status: 'active' | 'passed' | 'rejected' | 'expired';
}

export interface Vote {
  voteId: string;
  voterWalletAddress: string;
  proposalId: string;
  voteType: 'upvote' | 'downvote';
  voteTimestamp: Date;
}

export interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  category: string;
  duration: number;
  elements: TemplateElement[];
}

export interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio';
  position: { x: number; y: number };
  size: { width: number; height: number };
  properties: Record<string, any>;
}

export interface CreatorStats {
  totalVideos: number;
  totalViews: number;
  totalEarnings: number;
  subscribers: number;
  engagement: number;
}
