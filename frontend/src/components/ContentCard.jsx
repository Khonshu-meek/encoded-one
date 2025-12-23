import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function ContentCard({ content }) {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer transform hover:scale-105 transition-transform"
      onClick={() => navigate(`/watch/${content._id}`)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={content.thumbnail || 'https://via.placeholder.com/300x400'}
          alt={content.title}
          className="w-full h-64 object-cover group-hover:brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full">
            <Play className="w-6 h-6 fill-white" />
          </button>
        </div>
      </div>
      <h3 className="mt-3 font-semibold line-clamp-2">{content.title}</h3>
      <p className="text-sm text-gray-400">{content.genre?.join(', ')}</p>
      <div className="flex justify-between text-sm mt-2">
        <span className="text-yellow-500">⭐ {content.rating}/10</span>
        <span className="text-gray-400">{content.type}</span>
      </div>
    </div>
  );
}
