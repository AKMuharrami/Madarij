import React from 'react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Video } from 'lucide-react';

const Playlists: React.FC = () => {
  const { playlists } = useData();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-primary pr-3">قوائم التشغيل</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div 
            key={playlist.id} 
            onClick={() => navigate(`/playlists/${playlist.id}`)}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 flex flex-col"
          >
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <img 
                src={playlist.thumbnail} 
                alt={playlist.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <PlayCircle className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" size={48} />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Video size={12} />
                <span>{playlist.videoCount} فيديو</span>
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-primary transition-colors">
                {playlist.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {playlist.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;