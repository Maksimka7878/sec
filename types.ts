export interface Expert {
  name: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended: boolean;
}

export interface OperationSession {
  id: string;
  time: string;
  name: string;
  lead: string;
  category: 'red-team' | 'blue-team' | 'intel' | 'crypto';
  duration: number; // minutes
}

export interface OperationsLog {
  date: string; // ISO date string or Day name
  sessions: OperationSession[];
}

export enum ChatSender {
  USER = 'user',
  AI = 'ai'
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  stats: { label: string; value: number }[]; // 0-100
  result: string; // e.g. "0 Breaches"
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  power: string; // instead of calories
}

export interface ShopItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  perks: string[]; 
}