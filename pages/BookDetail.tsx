
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { BookOpen, Download, X } from 'lucide-react';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useData();
  const [readingMode, setReadingMode] = useState(false);

  const book = books.find(b => b.id === id);

  if (!book) return <div className="text-center py-20 text-gray-500 font-bold">عذراً، الكتاب غير موجود</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {!readingMode ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-fade-in">
            <div className="w-full md:w-1/3 aspect-[2/3] md:aspect-auto relative bg-gray-100">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
                <span className="text-primary font-bold text-sm mb-2">{book.category}</span>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                <p className="text-gray-500 text-lg mb-6">تأليف: {book.author}</p>
                
                <div className="prose prose-sm text-gray-600 mb-8 max-w-none leading-relaxed">
                    <p>{book.description}</p>
                    <p>هذا الكتاب يوفر مادة تعليمية ثرية ومنسقة لمساعدة الطلاب على فهم المادة العلمية بعمق وتفصيل.</p>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => setReadingMode(true)}
                        className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                        <BookOpen size={20} />
                        قراءة الكتاب
                    </button>
                    <a 
                        href={book.downloadUrl}
                        download
                        className="flex-1 bg-white text-gray-800 border-2 border-gray-200 py-3 px-6 rounded-xl font-bold hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={20} />
                        تحميل PDF
                    </a>
                </div>
            </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col p-4 md:p-8">
            <div className="max-w-6xl w-full mx-auto flex-1 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <BookOpen size={18} className="text-primary" />
                        {book.title}
                    </h3>
                    <button 
                        onClick={() => setReadingMode(false)} 
                        className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                        title="إغلاق"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="flex-1 bg-gray-200">
                    <iframe 
                        src={`${book.downloadUrl}#toolbar=0`} 
                        className="w-full h-full border-none"
                        title={book.title}
                    >
                        <p className="p-10 text-center">عذراً، متصفحك لا يدعم عرض ملفات PDF مباشرة. <a href={book.downloadUrl} className="text-primary underline">اضغط هنا لتحميل الملف</a>.</p>
                    </iframe>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
