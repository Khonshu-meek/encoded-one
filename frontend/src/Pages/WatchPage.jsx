import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentAPI } from '../services/api';
import { ArrowLeft, Heart } from 'lucide-react';

export default function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [id]);

  const fetchContent = async () => {
    try {
      const res = await contentAPI.getById(id);
      setContent(res.data);
    } catch (error) {
      console.log('Error fetching content:', error);
    }
  };

  if (!content) {
    return <div className="bg-encoded-dark text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-encoded-dark text-white min-h-screen">
      {/* Player */}
      <div className="relative bg-black aspect-video">
        <video
          src={content.videoUrl || '#'}
          controls
          className="w-full h-full"
        />
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Details */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-red-600 px-3 py-1 rounded text-sm font-semibold">{content.type}</span>
          <span>⭐ {content.rating}/10</span>
          <span className="text-gray-400">{content.duration} min</span>
          <span className="text-gray-400">{new Date(content.releaseDate).getFullYear()}</span>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold flex items-center gap-2">
            ▶️ Play
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`border px-6 py-2 rounded font-semibold flex items-center gap-2 ${
              isWishlisted ? 'bg-red-600 border-red-600' : 'border-gray-600 hover:border-gray-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            Add to Watchlist
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-gray-300 mb-4">{content.description}</p>
          
          <h3 className="text-lg font-bold mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {content.genre?.map((g) => (
              <span key={g} className="bg-encoded-gray px-3 py-1 rounded text-sm">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
