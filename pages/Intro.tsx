import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Intro: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/playlists');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
        <div className="relative z-10 flex flex-col items-center animate-pulse">
            <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
                <img 
                    src="https://hjrm8lbtnby37npy.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-06%20at%2010.23.04%20AM.jpeg" 
                    alt="المنصة التعليمية" 
                    className="h-40 w-auto rounded-3xl shadow-2xl border-4 border-white/10"
                />
            </div>
            <h1 className="text-3xl font-bold tracking-wider">المنصة التعليمية</h1>
            <p className="mt-2 text-slate-300">بوابتك نحو المستقبل</p>
        </div>
    </div>
  );
};

export default Intro;