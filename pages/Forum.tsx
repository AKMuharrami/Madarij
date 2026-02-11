import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../contexts/DataContext';
import { Send, Paperclip, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Forum: React.FC = () => {
  const { messages, currentUser, addMessage } = useData();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
      // S-5 Entry Rule
      if (!currentUser) {
          navigate('/account');
      }
  }, [currentUser, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    addMessage(inputValue);
    setInputValue('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          addMessage("مرفق جديد", e.target.files[0]);
      }
  };

  if (!currentUser) return null; // Or loading spinner

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                المنتدى العلمي العام
            </h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
                const isMe = msg.userId === currentUser.id;
                return (
                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        <img 
                            src={msg.userAvatar} 
                            alt={msg.userName} 
                            className="w-10 h-10 rounded-full border border-gray-200 bg-white"
                        />
                        <div className={`max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <span className="text-xs text-gray-500 mb-1 px-1">{msg.userName}</span>
                            <div className={`p-3 rounded-2xl text-sm ${
                                isMe 
                                ? 'bg-primary text-white rounded-tl-none' 
                                : 'bg-white border border-gray-200 text-gray-800 rounded-tr-none shadow-sm'
                            }`}>
                                {msg.content}
                                {msg.attachment && (
                                    <div className="mt-2 p-2 bg-black/10 rounded flex items-center gap-2">
                                        <Paperclip size={14} />
                                        <a href={msg.attachment.url} download={msg.attachment.name} className="underline truncate max-w-[150px]">
                                            {msg.attachment.name}
                                        </a>
                                    </div>
                                )}
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 px-1">
                                {new Date(msg.timestamp).toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileUpload}
            />
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="إرفاق ملف"
            >
                <Paperclip size={20} />
            </button>
            
            <div className="flex-1 relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full py-3 px-4 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all text-sm"
                />
            </div>
            
            <button 
                onClick={handleSend}
                className="p-3 bg-primary text-white rounded-full hover:bg-emerald-600 shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputValue.trim()}
            >
                <Send size={20} className={inputValue.trim() ? 'ml-1' : ''} /> {/* Optical adjustment for RTL Send icon */}
            </button>
        </div>
    </div>
  );
};

export default Forum;