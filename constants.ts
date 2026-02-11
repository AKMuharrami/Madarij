import { Book, Playlist, User, UserRole, Message } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'أحمد الطالب',
  email: 'ahmed@student.com',
  role: UserRole.STUDENT,
  avatar: 'https://picsum.photos/seed/user1/100/100',
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'المدير العام',
  email: 'admin@school.com',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/admin1/100/100',
};

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    title: 'قواعد النحو 1',
    description: 'مقدمة في علم النحو - شرح متكامل لكتاب الشيخ المربي حمود الصوافي.',
    thumbnail: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-11%20at%205.14.28%20PM.jpeg',
    videoCount: 3,
    videos: [
      { id: 'v1', playlistId: 'p1', title: 'مقدمة الكتاب', duration: '13:08', url: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/%2301%20%D9%85%D9%82%D8%AF%D9%85%D8%A9%20%D8%A7%D9%84%D9%83%D8%AA%D8%A7%D8%A8%20%D9%88%D9%85%D8%A4%D9%84%D9%81%D9%87%20%20%20%20%D8%A7%D9%84%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%86%D8%AD%D9%88%20%D9%88%D8%A7%D9%84%D8%A5%D8%B9%D8%B1%D8%A7%D8%A8%20%20%20%D9%85%D8%B1%D9%88%D8%A7%D9%86%20%D8%A8%D9%86%20%D9%85%D8%AD%D9%85%D8%AF%20%D8%A7%D9%84%D8%AD%D8%A8%D8%B3%D9%8A.mp4', isCompleted: false, order: 1 },
      { id: 'v2', playlistId: 'p1', title: 'قريبا', duration: '12:00', url: '', isCompleted: false, order: 2 },
      { id: 'v3', playlistId: 'p1', title: 'قريبا', duration: '08:45', url: '', isCompleted: false, order: 3 },
    ]
  },
  {
    id: 'p2',
    title: 'شرح الآجرومية',
    description: 'شرح مفصل للآجرومية.',
    thumbnail: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-11%20at%206.36.36%20PM.jpeg',
    videoCount: 2,
    videos: [
      { id: 'v4', playlistId: 'p2', title: 'قريبا', duration: '10:15', url: '', isCompleted: false, order: 1 },
      { id: 'v5', playlistId: 'p2', title: 'قريبا', duration: '14:20', url: '', isCompleted: false, order: 2 },
    ]
  },
  {
    id: 'p3',
    title: 'قريبا...',
    description: 'قريبا إن شاء الله',
    thumbnail: '',
    videoCount: 0,
    videos: []
  }
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'b1',
    title: 'عقيدة المسلم',
    author: 'أسد بن خالد المحرمي',
    category: 'علوم',
    cover: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/Screenshot%202026-02-11%20200122.png',
    description: 'كتاب شامل يغطي أساسيات العلوم الطبيعية.',
    downloadUrl: 'https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/%D8%B9%D9%82%D9%8A%D8%AF%D8%A9%20%D8%A3%D9%87%D9%84%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%82%D8%A7%D9%85%D8%A9-WD8E23NJ8SoZC7y0XLkHQ3ZpWBo3M7.pdf'
  },
  {
    id: 'b2',
    title: 'قريبا',
    author: '...',
    category: 'تاريخ',
    cover: '',
    description: 'قريبا',
    downloadUrl: '#'
  },
  {
    id: 'b3',
    title: 'قريبا',
    author: '...',
    category: '...',
    cover: '...',
    description: 'قريبا',
    downloadUrl: '#'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    userId: 'u2',
    userName: ' خالد',
    userAvatar: 'https://picsum.photos/seed/user2/100/100',
    content: 'مرحباً، هل يمكن لأحد مساعدتي في درس الفيزياء؟',
    timestamp: Date.now() - 100000,
  }
];
