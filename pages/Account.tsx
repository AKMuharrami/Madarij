import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { UserRole } from '../types';
import { User, LogOut, Settings, Shield, Edit3, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Account: React.FC = () => {
  const { currentUser, login, logout } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.ADMIN) {
        navigate('/admin');
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
            <User size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">تسجيل الدخول</h1>
        <p className="text-gray-500 mb-8">قم بتسجيل الدخول للمتابعة إلى المنصة</p>
        
        <div className="space-y-4">
            <button 
                onClick={() => handleLogin(UserRole.STUDENT)}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                دخول كطالب (Google)
            </button>
            
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                <div className="relative flex justify-center"><span className="bg-white px-2 text-sm text-gray-400">أو</span></div>
            </div>

            <button 
                onClick={() => handleLogin(UserRole.ADMIN)}
                className="w-full bg-slate-800 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
            >
                <Shield size={18} />
                دخول كإداري
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-emerald-400"></div>
        <div className="px-8 pb-8 relative">
            <div className="relative -mt-12 mb-6 flex justify-between items-end">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white" />
                <div className="flex gap-2">
                    {isEditing ? (
                        <button 
                            onClick={() => { setIsEditing(false); alert("تم حفظ التغييرات بنجاح"); }}
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-emerald-600"
                        >
                            <Save size={16} />
                            حفظ
                        </button>
                    ) : (
                        <button 
                            onClick={() => { setTempName(currentUser.name); setIsEditing(true); }}
                            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200"
                        >
                            <Edit3 size={16} />
                            تعديل
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">الاسم</label>
                    {isEditing ? (
                        <input 
                            type="text" 
                            value={tempName} 
                            onChange={(e) => setTempName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                        />
                    ) : (
                        <h2 className="text-2xl font-bold text-gray-800">{currentUser.name}</h2>
                    )}
                </div>
                
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">البريد الإلكتروني</label>
                    <p className="text-gray-600 font-medium">{currentUser.email}</p>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">نوع الحساب</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${currentUser.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {currentUser.role === UserRole.ADMIN ? 'مدير النظام' : 'طالب'}
                    </span>
                </div>

                <hr className="border-gray-100" />

                <button 
                    onClick={logout}
                    className="w-full py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <LogOut size={20} />
                    تسجيل الخروج
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Account;