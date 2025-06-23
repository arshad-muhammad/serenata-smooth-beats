
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import PlaylistCard from '@/components/PlaylistCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Playlist } from '@/types/music';

const Home = () => {
  const { data: playlists, isLoading } = useQuery({
    queryKey: ['featured-playlists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Playlist[];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30">
      <Header />
      
      <main className="pt-16 pb-32 md:pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Serenata
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay">
              Discover premium playlists with smooth, seamless music streaming
            </p>
          </div>
        </section>

        {/* Featured Playlists */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Playlists</h2>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {playlists?.map((playlist, index) => (
                <div
                  key={playlist.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PlaylistCard playlist={playlist} index={index} />
                </div>
              ))}
            </div>
          )}

          {!isLoading && (!playlists || playlists.length === 0) && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No playlists available yet.</p>
            </div>
          )}
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Home;
