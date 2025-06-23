
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Music className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900">Serenata</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === '/' ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/playlists"
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                location.pathname === '/playlists' ? 'text-indigo-600' : 'text-gray-700'
              }`}
            >
              Playlists
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
