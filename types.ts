export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Video {
  id: string;
  playlistId: string;
  title: string;
  duration: string; // e.g., "10:00"
  url: string;
  isCompleted: boolean;
  order: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  videos: Video[];
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: number;
  attachment?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  downloadUrl: string;
}

export interface SystemState {
  users: User[];
  playlists: Playlist[];
  messages: Message[];
  books: Book[];
  currentUser: User | null;
}