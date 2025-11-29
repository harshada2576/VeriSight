import { useState, useRef, useEffect } from 'react';
import Button from '../ui/Button';

const SpectrogramPlayer = ({ audioUrl, spectrogramUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      padding: '24px',
      background: 'rgba(42, 107, 255, 0.05)',
      border: '1px solid rgba(42, 107, 255, 0.3)',
      borderRadius: '12px',
    }}>
      <audio ref={audioRef} src={audioUrl || ''} preload="metadata" />

      <h3 style={{
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
      }}>
        Audio Spectrogram Analysis
      </h3>

      {/* Spectrogram Visualization */}
      <div style={{
        position: 'relative',
        marginBottom: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(42, 107, 255, 0.3)',
        background: '#0A1E3F',
      }}>
        <img
          src={spectrogramUrl || 'https://via.placeholder.com/800x200?text=Spectrogram'}
          alt="Audio Spectrogram"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
        
        {/* Playhead indicator */}
        {duration > 0 && (
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${(currentTime / duration) * 100}%`,
            width: '2px',
            background: '#35E2FF',
            boxShadow: '0 0 10px rgba(53, 226, 255, 0.8)',
            transition: 'left 0.1s linear',
          }}/>
        )}
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <Button
          variant="secondary"
          onClick={togglePlay}
          disabled={!audioUrl}
          style={{
            width: '48px',
            height: '48px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </Button>

        <div style={{ flex: 1 }}>
          {/* Progress Bar */}
          <div
            onClick={handleSeek}
            style={{
              height: '8px',
              background: 'rgba(42, 107, 255, 0.2)',
              borderRadius: '4px',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #2A6BFF 0%, #35E2FF 100%)',
              borderRadius: '4px',
              transition: 'width 0.1s linear',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                background: '#35E2FF',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(53, 226, 255, 0.8)',
              }}/>
            </div>
          </div>

          {/* Time Display */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '12px',
            color: '#D8DDE3',
          }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: 'rgba(10, 30, 63, 0.5)',
        border: '1px solid rgba(42, 107, 255, 0.2)',
        borderRadius: '8px',
      }}>
        <p style={{
          color: '#D8DDE3',
          fontSize: '12px',
          lineHeight: '1.6',
          margin: 0,
        }}>
          <strong style={{ color: '#35E2FF' }}>Spectrogram Analysis:</strong> Visual representation of audio frequencies over time. Anomalies and synthetic patterns indicate potential manipulation.
        </p>
      </div>
    </div>
  );
};

export default SpectrogramPlayer;
