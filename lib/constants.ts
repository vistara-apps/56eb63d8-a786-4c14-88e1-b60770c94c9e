export const VIDEO_CATEGORIES = [
  'Educational',
  'Entertainment',
  'Marketing',
  'Social Media',
  'Tutorial',
  'Presentation',
  'Music Video',
  'Documentary',
] as const;

export const MONETIZATION_TYPES = [
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'One-time Purchase' },
  { value: 'subscription', label: 'Subscription Only' },
] as const;

export const LICENSE_TYPES = [
  { value: 'royalty-free', label: 'Royalty Free' },
  { value: 'commercial', label: 'Commercial License' },
  { value: 'personal', label: 'Personal Use Only' },
] as const;

export const PROPOSAL_CATEGORIES = [
  'Platform Features',
  'Content Moderation',
  'Token Economics',
  'Community Guidelines',
  'Technical Improvements',
] as const;

export const TTS_VOICES = [
  { id: 'sarah', name: 'Sarah', gender: 'female', accent: 'american' },
  { id: 'john', name: 'John', gender: 'male', accent: 'american' },
  { id: 'emma', name: 'Emma', gender: 'female', accent: 'british' },
  { id: 'david', name: 'David', gender: 'male', accent: 'british' },
] as const;

export const VIDEO_TEMPLATES = [
  {
    id: 'social-promo',
    name: 'Social Media Promo',
    description: 'Perfect for promoting products or services on social platforms',
    category: 'Marketing',
    duration: 30,
    thumbnailUrl: '/templates/social-promo.jpg',
  },
  {
    id: 'tutorial-basic',
    name: 'Tutorial Template',
    description: 'Clean layout for educational and how-to content',
    category: 'Educational',
    duration: 120,
    thumbnailUrl: '/templates/tutorial.jpg',
  },
  {
    id: 'music-visualizer',
    name: 'Music Visualizer',
    description: 'Dynamic audio visualization for music content',
    category: 'Music Video',
    duration: 180,
    thumbnailUrl: '/templates/music-viz.jpg',
  },
] as const;
