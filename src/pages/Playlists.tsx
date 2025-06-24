
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import PlaylistCard from '@/components/PlaylistCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { Music, Sparkles, ListMusic } from 'lucide-react';
import { Playlist, Song } from '@/types/music';

interface SearchResult {
  playlists: Playlist[];
  songs: Song[];
}

const Playlists = () => {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const { data: playlists, isLoading } = useQuery({
    queryKey: ['all-playlists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Playlist[];
    },
  });

  const handleSearchResults = (results: SearchResult) => {
    setSearchResults(results);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-indigo-300/20 to-blue-200/20 rounded-full blur-lg animate-float-gentle" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-md animate-bounce-slow" style={{ animationDelay: '1s' }} />
        
        {/* Musical Note Shapes */}
        <div className="absolute top-32 right-1/4 text-indigo-300/30 animate-float" style={{ animationDelay: '3s' }}>
          <Music className="h-8 w-8" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-purple-300/30 animate-float-gentle" style={{ animationDelay: '5s' }}>
          <ListMusic className="h-6 w-6" />
        </div>
      </div>

      <Header />
      
      <main className="pt-32 pb-32 md:pb-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 animate-pulse-gentle">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Your Music Universe
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover, organize, and enjoy your favorite playlists in one beautiful place
            </p>
            
            {/* Search Bar with Enhanced Styling */}
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-lg opacity-60" />
                <div className="relative bg-white/80 backdrop-blur-md rounded-full p-2 shadow-xl border border-white/30">
                  <SearchBar onResults={handleSearchResults} onClear={handleClearSearch} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ListMusic className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{playlists?.length || 0}</h3>
              <p className="text-gray-600">Total Playlists</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">∞</h3>
              <p className="text-gray-600">Songs Available</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 text-center shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600">Quality Experience</p>
            </div>
          </div>

          {/* Content Section */}
          {isSearching && searchResults ? (
            <div className="animate-fade-in">
              <SearchResults playlists={searchResults.playlists} songs={searchResults.songs} />
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  {playlists && playlists.length > 0 ? (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <ListMusic className="h-5 w-5 text-white" />
                          </div>
                          All Playlists
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {playlists.map((playlist, index) => (
                          <div
                            key={playlist.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${(index * 100) + 1000}ms` }}
                          >
                            <PlaylistCard playlist={playlist} index={index} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 animate-fade-in">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
                        <Music className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">No Playlists Yet</h3>
                      <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Start your musical journey by creating your first playlist. Your favorites are waiting to be discovered!
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Playlists;
