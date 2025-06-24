
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Play } from 'lucide-react';
import { Playlist } from '@/types/music';

interface PlaylistCardProps {
  playlist: Playlist;
  index?: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, index = 0 }) => {
  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className="group block relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-white/20">
        <div className="aspect-square relative overflow-hidden">
          {playlist.cover_image_url ? (
            <img
              src={playlist.cover_image_url}
              alt={playlist.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center relative">
              <Music className="h-20 w-20 text-white/90 drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          
          {/* Overlay with play button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-8 w-8 text-white ml-1" fill="white" />
            </div>
          </div>
          
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-b-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 truncate mb-2">
              {playlist.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 bg-gray-100/80 px-3 py-1 rounded-full">
                Playlist
              </span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:scale-150 transition-transform duration-300" />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-2 left-2 w-8 h-8 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-110" />
    </Link>
  );
};

export default PlaylistCard;
