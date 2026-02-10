
export type ContentType = 'pdf' | 'story' | 'ugc' | 'campaign' | 'ebook' | 'social' | 'presentation' | 'podcast';

export interface GeneratedContent {
  id: string;
  type: ContentType;
  title: string;
  timestamp: number;
  data: any;
  status: 'draft' | 'completed';
}

export interface UserProfile {
  id: string;
  name: string;
  credits: number;
  tier: 'free' | 'pro' | 'enterprise';
}

export interface ProjectSettings {
  brandVoice: string;
  primaryColor: string;
  targetAudience: string;
}
