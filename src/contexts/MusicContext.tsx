
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { CurrentSong, Song } from '@/types/music';

interface MusicContextType {
  currentSong: CurrentSong | null;
  isPlaying: boolean;
  volume: number;
  isLooping: boolean;
  currentPlaylist: Song[];
  currentIndex: number;
  play: (song: CurrentSong, playlist?: Song[]) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  toggleLoop: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicPlayer = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<CurrentSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = (song: CurrentSong, playlist: Song[] = []) => {
    setCurrentSong(song);
    setCurrentPlaylist(playlist);
    const index = playlist.findIndex(s => s.id === song.id);
    setCurrentIndex(index !== -1 ? index : 0);
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const toggle = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const next = () => {
    if (currentPlaylist.length > 0) {
      const nextIndex = (currentIndex + 1) % currentPlaylist.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(currentPlaylist[nextIndex] as CurrentSong);
    }
  };

  const previous = () => {
    if (currentPlaylist.length > 0) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentPlaylist.length - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(currentPlaylist[prevIndex] as CurrentSong);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentSong) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = false; // We handle looping manually
      
      const handleEnded = () => {
        if (isLooping && currentPlaylist.length > 0) {
          next();
        }
      };

      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnded);
      };
    }
  }, [volume, isLooping, currentPlaylist.length, currentIndex]);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        isLooping,
        currentPlaylist,
        currentIndex,
        play,
        pause,
        toggle,
        next,
        previous,
        setVolume,
        toggleLoop,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} src={currentSong?.file_url} />
    </MusicContext.Provider>
  );
};
