import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, Ban, CheckCircle } from 'lucide-react';
import { Playlist, Video } from '../../types';

const Dashboard: React.FC = () => {
  const { playlists, addPlaylist, messages, deleteMessage, banUser } = useData();
  const [activeTab, setActiveTab] = useState<'stats' | 'playlists' | 'forum'>('stats');

  // Stats Data
  const statsData = [
    { name: 'الطلاب', count: 120 },
    { name: 'الفيديوهات', count: playlists.reduce((acc, p) => acc + p.videoCount, 0) },
    { name: 'الرسائل', count: messages.length },
    { name: 'الكتب', count: 3 },
  ];

  // Form State for new Playlist
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');

  const handleCreatePlaylist = () => {
      if (!newPlaylistTitle) return;
      const newPl: Playlist = {
          id: `p${Date.now()}`,
          title: newPlaylistTitle,
          description: 'تمت إضافتها بواسطة المشرف',
          thumbnail: 'https://picsum.photos/400/250',
          videoCount: 0,
          videos: []
      };
      addPlaylist(newPl);
      setNewPlaylistTitle('');
      alert('تم إضافة القائمة بنجاح');
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 w-fit">
        <button 
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
        >
            الإحصائيات
        </button>
        <button 
            onClick={() => setActiveTab('playlists')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'playlists' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
        >
            إدارة المحتوى
        </button>
        <button 
            onClick={() => setActiveTab('forum')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'forum' ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
        >
            المنتدى
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        
        {activeTab === 'stats' && (
            <div className="h-80">
                <h3 className="text-lg font-bold text-gray-800 mb-4">نظرة عامة على البيانات</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )}

        {activeTab === 'playlists' && (
            <div>
                <div className="flex gap-4 mb-8 items-end bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">عنوان القائمة الجديدة</label>
                        <input 
                            type="text" 
                            value={newPlaylistTitle}
                            onChange={(e) => setNewPlaylistTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button 
                        onClick={handleCreatePlaylist}
                        className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-600 flex items-center gap-2 h-[42px]"
                    >
                        <Plus size={20} />
                        إضافة
                    </button>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-gray-700">القوائم الحالية</h3>
                    {playlists.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-4">
                                <img src={p.thumbnail} alt="" className="w-16 h-10 object-cover rounded" />
                                <div>
                                    <div className="font-bold text-gray-800">{p.title}</div>
                                    <div className="text-xs text-gray-500">{p.videoCount} فيديو</div>
                                </div>
                            </div>
                            <button className="text-blue-500 text-sm font-bold hover:underline">تعديل</button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'forum' && (
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">أحدث الرسائل</h3>
                <div className="space-y-2">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-colors">
                            <div className="flex gap-3">
                                <img src={msg.userAvatar} className="w-10 h-10 rounded-full" />
                                <div>
                                    <span className="font-bold text-gray-800 text-sm">{msg.userName}</span>
                                    <p className="text-gray-600 text-sm">{msg.content}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => deleteMessage(msg.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full" 
                                    title="حذف الرسالة"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <button 
                                    onClick={() => banUser(msg.userId)}
                                    className="p-2 text-orange-500 hover:bg-orange-50 rounded-full" 
                                    title="حظر المستخدم"
                                >
                                    <Ban size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {messages.length === 0 && <p className="text-gray-400 text-center">لا توجد رسائل</p>}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;