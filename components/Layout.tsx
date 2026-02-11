import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Home, BookOpen, MessageCircle, User, LogOut } from 'lucide-react';

const Layout: React.FC = () => {
  const { currentUser, logout } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-06%20at%2010.23.04%20AM.jpeg" 
              alt="Logo" 
              className="h-10 w-auto rounded-lg" 
            />
            <span className="text-xl font-bold text-gray-800">المنصة التعليمية</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/playlists" 
              className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              <Home size={18} />
              قوائم التشغيل
            </NavLink>
            <NavLink 
              to="/forum" 
              className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              <MessageCircle size={18} />
              المنتدى العلمي
            </NavLink>
            <NavLink 
              to="/books" 
              className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              <BookOpen size={18} />
              الكتب
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
               <div className="flex items-center gap-4">
                <NavLink 
                  to="/account" 
                  className={({ isActive }) => `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                >
                  <img src={currentUser.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
                  <span className="hidden md:inline">{currentUser.name}</span>
                </NavLink>
               </div>
            ) : (
              <NavLink to="/account" className="text-sm font-medium text-gray-600 hover:text-primary">
                تسجيل الدخول
              </NavLink>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation (Bottom Bar Style could be alt, but sticking to top for now simpler) */}
        <div className="md:hidden flex justify-around py-3 border-t bg-white">
            <NavLink to="/playlists" className={({isActive}) => isActive ? "text-primary" : "text-gray-500"}><Home size={24}/></NavLink>
            <NavLink to="/forum" className={({isActive}) => isActive ? "text-primary" : "text-gray-500"}><MessageCircle size={24}/></NavLink>
            <NavLink to="/books" className={({isActive}) => isActive ? "text-primary" : "text-gray-500"}><BookOpen size={24}/></NavLink>
            <NavLink to="/account" className={({isActive}) => isActive ? "text-primary" : "text-gray-500"}><User size={24}/></NavLink>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;