
import React from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';
import { Playlist } from '@/types/music';

interface PlaylistCardProps {
  playlist: Playlist;
  index?: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, index = 0 }) => {
  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-square relative overflow-hidden">
        {playlist.cover_image_url ? (
          <img
            src={playlist.cover_image_url}
            alt={playlist.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <Music className="h-16 w-16 text-indigo-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
          {playlist.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">Playlist</p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
