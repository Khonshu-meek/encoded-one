import React, { useState, useEffect } from 'react';
import { contentAPI } from '../services/api';
import ContentCard from '../components/ContentCard';
import { LogOut, Search } from 'lucide-react';

export default function HomePage({ user, onLogout }) {
  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await contentAPI.getAll();
      setContent(res.data);
    } catch (error) {
      console.log('Error fetching content:', error);
    }
  };

  const filtered = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-encoded-dark text-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 bg-encoded-dark z-50 border-b border-encoded-gray">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-600">ENCODED_ONE</h1>
          
          <div className="flex-1 mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies, series..."
                className="w-full bg-encoded-gray text-white pl-10 pr-4 py-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">{user.name}</span>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-encoded-gray to-encoded-dark py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-4">Welcome to ENCODED_ONE</h2>
          <p className="text-gray-400 text-xl">Stream unlimited movies and TV shows. No ads, no commitments.</p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">
          {searchTerm ? 'Search Results' : 'Featured Content'}
        </h2>
        
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No content found. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <ContentCard key={item._id} content={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
