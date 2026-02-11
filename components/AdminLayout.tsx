import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { LayoutDashboard, Users, Video, BookOpen, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/admin/users', icon: Users, label: 'المستخدمون' },
    { path: '/admin/content', icon: Video, label: 'المحتوى' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold">لوحة الإدارة</h1>
            <p className="text-xs text-slate-400 mt-1">v1.0.0 Stable</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            {menuItems.map(item => (
                <NavLink 
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                </NavLink>
            ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
            <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-slate-800 p-2 rounded-lg transition-colors"
            >
                <LogOut size={18} />
                <span>خروج</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b border-gray-200 shadow-sm flex items-center px-8 justify-between">
            <h2 className="font-bold text-gray-700">نظرة عامة</h2>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-500">النظام يعمل بكفاءة</span>
            </div>
        </header>
        <div className="p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;