import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Search, Book as BookIcon, Filter } from 'lucide-react';

const Books: React.FC = () => {
  const { books } = useData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['الكل', ...Array.from(new Set(books.map(b => b.category)))];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'الكل' || book.category === selectedCategory;
    const matchesSearch = book.title.includes(searchQuery) || book.author.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar / Filters */}
      <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-shrink-0 sticky top-24">
        <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold">
            <Filter size={20} />
            <h2>التصنيفات</h2>
        </div>
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-right whitespace-nowrap ${
                        selectedCategory === cat 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Search Bar */}
        <div className="relative mb-8">
            <input
                type="text"
                placeholder="ابحث عن كتاب أو مؤلف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
                <div 
                    key={book.id}
                    onClick={() => navigate(`/books/${book.id}`)}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col overflow-hidden"
                >
                    <div className="aspect-[2/3] overflow-hidden bg-gray-100 relative">
                        <img 
                            src={book.cover} 
                            alt={book.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                        <div className="text-xs text-primary font-bold mb-1">{book.category}</div>
                        <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">{book.title}</h3>
                        <p className="text-gray-500 text-xs mb-3">{book.author}</p>
                    </div>
                </div>
            ))}
        </div>

        {filteredBooks.length === 0 && (
            <div className="text-center py-20 text-gray-400 flex flex-col items-center">
                <BookIcon size={48} className="mb-4 opacity-50" />
                <p>لا توجد نتائج مطابقة</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Books;