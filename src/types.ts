export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'panes' | 'sopas' | 'porciones' | 'bebidas' | 'postres';
  image: string;
  popular?: boolean;
  badge?: string;
  ingredients?: string[];
  spicyLevel?: number;
}

export interface PostComment {
  id: string;
  author: string;
  text: string;
  timeAgo: string;
  avatar?: string;
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram';
  author: string;
  avatar: string;
  handle: string;
  timeAgo: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  tags?: string[];
  commentsList?: PostComment[];
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  highlight?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  selectedExtras?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  date: string;
  dishRecommended?: string;
  avatar?: string;
  verified?: boolean;
}

export interface ContactInfo {
  phone?: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  hoursWeekdays: string;
  hoursWeekends?: string;
  email?: string;
  facebookUrl: string;
  instagramUrl: string;
}
