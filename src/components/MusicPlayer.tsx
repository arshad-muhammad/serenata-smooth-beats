
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat } from 'lucide-react';
import { useMusicPlayer } from '@/contexts/MusicContext';
import { Slider } from '@/components/ui/slider';

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    isLooping,
    toggle,
    next,
    previous,
    setVolume,
    toggleLoop,
    audioRef,
  } = useMusicPlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [audioRef]);

  if (!currentSong) return null;

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 pb-safe">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="py-2">
          <Slider
            value={[progress]}
            max={duration}
            step={1}
            onValueChange={handleProgressChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between py-4">
          {/* Song Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-sm">
                {currentSong.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-gray-900 truncate">{currentSong.name}</h4>
              <p className="text-sm text-gray-500 truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={previous}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={toggle}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors transform hover:scale-105"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </button>
            
            <button
              onClick={next}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume and Loop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <button
              onClick={toggleLoop}
              className={`p-2 transition-colors ${
                isLooping ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Repeat size={18} />
            </button>
            
            <div className="flex items-center space-x-2">
              <Volume2 size={18} className="text-gray-600" />
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
