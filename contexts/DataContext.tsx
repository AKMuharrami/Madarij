import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Playlist, User, Book, Message, UserRole, Video } from '../types';
import { INITIAL_PLAYLISTS, INITIAL_BOOKS, INITIAL_MESSAGES, MOCK_USER, MOCK_ADMIN } from '../constants';

interface DataContextType {
  currentUser: User | null;
  playlists: Playlist[];
  books: Book[];
  messages: Message[];
  login: (role: UserRole) => void;
  logout: () => void;
  markVideoCompleted: (playlistId: string, videoId: string) => void;
  addMessage: (text: string, attachment?: File) => void;
  addPlaylist: (playlist: Playlist) => void;
  deleteMessage: (id: string) => void;
  banUser: (userId: string) => void; // Mock function
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [books] = useState<Book[]>(INITIAL_BOOKS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const login = (role: UserRole) => {
    // Simulate API delay
    setTimeout(() => {
      if (role === UserRole.ADMIN) {
        setCurrentUser(MOCK_ADMIN);
      } else {
        setCurrentUser(MOCK_USER);
      }
    }, 500);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const markVideoCompleted = (playlistId: string, videoId: string) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id !== playlistId) return p;
      return {
        ...p,
        videos: p.videos.map(v => v.id === videoId ? { ...v, isCompleted: true } : v)
      };
    }));
  };

  const addMessage = (text: string, attachment?: File) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: text,
      timestamp: Date.now(),
      attachment: attachment ? {
        type: attachment.type.startsWith('image/') ? 'image' : 'file',
        name: attachment.name,
        url: URL.createObjectURL(attachment)
      } : undefined
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists(prev => [...prev, playlist]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const banUser = (userId: string) => {
    console.log(`User ${userId} banned`);
  };

  return (
    <DataContext.Provider value={{
      currentUser,
      playlists,
      books,
      messages,
      login,
      logout,
      markVideoCompleted,
      addMessage,
      addPlaylist,
      deleteMessage,
      banUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};