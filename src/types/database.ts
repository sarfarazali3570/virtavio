export type UserRole = 'admin' | 'user';
export type LeadStatus = 'new' | 'contacted' | 'closed';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  status: LeadStatus;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  published: boolean;
  tags?: string[];
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
  created_at: string;
}
