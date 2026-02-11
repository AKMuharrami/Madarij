import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { ArrowRight, SkipBack, CheckCircle } from 'lucide-react';

const VideoPlayerPage: React.FC = () => {
  const { playlistId, videoId } = useParams<{ playlistId: string; videoId: string }>();
  const { playlists, markVideoCompleted } = useData();
  const navigate = useNavigate();
  const progressTimerRef = useRef<number | null>(null);

  const playlist = playlists.find(p => p.id === playlistId);
  const video = playlist?.videos.find(v => v.id === videoId);
  const nextVideo = playlist?.videos.find(v => v.order === (video?.order || 0) + 1);

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!video) return;

    // Reset state on video change
    setCompleted(video.isCompleted);

    // Simulate video playing logic
    // In a real app, this would be tied to the video element's timeupdate or ended events.
    // Here we act as if the user is watching.
    
    // Simulate "Video Completion" after 5 seconds for demo purposes
    const completionTimer = setTimeout(() => {
        markVideoCompleted(playlistId!, videoId!);
        setCompleted(true);
    }, 5000); 

    // Simulate progress saving every 10s (S-4 Requirement)
    progressTimerRef.current = window.setInterval(() => {
       console.log("Saving playback position...");
    }, 10000);

    return () => {
        clearTimeout(completionTimer);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [videoId, playlistId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!playlist || !video) return <div>Video not found</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Navigation */}
      <button 
        onClick={() => navigate(`/playlists/${playlistId}`)}
        className="self-start flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors"
      >
        <ArrowRight size={20} />
        العودة إلى القائمة
      </button>

      {/* Player Container */}
      <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group">
        <video 
            src={video.url} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
            onEnded={() => {
                markVideoCompleted(playlistId!, videoId!);
                setCompleted(true);
            }}
        />
      </div>

      {/* Info & Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{video.title}</h1>
                <p className="text-gray-500 text-sm">من دورة: {playlist.title}</p>
            </div>
            {completed && (
                <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-bold">
                    <CheckCircle size={16} />
                    تم المشاهدة
                </span>
            )}
        </div>
        
        <hr className="my-4 border-gray-100" />

        <div className="flex justify-end">
            <button
                onClick={() => {
                    if (nextVideo) navigate(`/player/${playlistId}/${nextVideo.id}`);
                }}
                disabled={!completed || !nextVideo}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                    completed && nextVideo 
                    ? 'bg-primary text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
                <SkipBack size={20} className="transform rotate-180" /> {/* Icon mirrored for RTL logic if needed, but 'SkipBack' usually points left. RTL Next implies pointing Left? Actually, in media controls, Right is usually forward. Let's assume standard Next icon. */}
                التالي
            </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;