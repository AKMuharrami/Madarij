import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Play, CheckCircle2, Circle, Clock } from 'lucide-react';

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playlists } = useData();
  const navigate = useNavigate();

  const playlist = playlists.find(p => p.id === id);

  if (!playlist) {
    return <div className="text-center py-20 text-gray-500">قائمة التشغيل غير موجودة</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3 aspect-video md:aspect-auto md:h-40 rounded-lg overflow-hidden flex-shrink-0">
          <img src={playlist.thumbnail} alt={playlist.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{playlist.title}</h1>
          <p className="text-gray-600 leading-relaxed mb-4">{playlist.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
             <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{playlist.videoCount} دروس</span>
          </div>
        </div>
      </div>

      {/* Video List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-2">محتوى الدورة</h2>
        {playlist.videos.length === 0 ? (
           <div className="text-center py-10 bg-gray-50 rounded-lg text-gray-400">لا توجد فيديوهات مضافة بعد</div>
        ) : (
          playlist.videos.map((video, index) => (
            <div 
              key={video.id}
              onClick={() => navigate(`/player/${playlist.id}/${video.id}`)}
              className="group flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md cursor-pointer transition-all"
            >
              <div className="flex-shrink-0 w-8 text-center font-bold text-gray-300 group-hover:text-primary">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{video.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Clock size={12} />
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="flex-shrink-0 text-gray-300">
                {video.isCompleted ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <Play className="group-hover:text-primary group-hover:fill-primary" size={24} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;