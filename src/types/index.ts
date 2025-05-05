
export enum PersonStatus {
  MISSING = 'missing',
  FOUND = 'found'
}

export interface Person {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  lastSeenDate?: string;
  lastSeenLocation?: string;
  description?: string;
  contactInfo?: string;
  imageUrl?: string;
  status: PersonStatus;
  reportedBy?: string;
  reportedDate: string;
  matchScore?: number; // Added matchScore as an optional property
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>; // Added Google login function
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Brand colors for consistent use throughout the app
export const BRAND_COLORS = {
  blue: '#4c6ef5',
  purple: '#9b87f5',
  red: '#e53e3e',
  green: '#38a169'
};
