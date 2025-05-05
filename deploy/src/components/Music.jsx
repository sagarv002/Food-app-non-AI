import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);
  
  // Sample playlist - replace with your own music files
  const playlist = [
    { title: "Sample Song 1", artist: "Artist 1", src: "/Downloads/ek_raat_vilen.mp3" },
    { title: "Sample Song 2", artist: "Artist 2", src: "" },
    { title: "Sample Song 3", artist: "Artist 3", src: "" },
  ];
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = playlist[currentSongIndex];

  // Styles
  const styles = {
    playerContainer: {
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    songInfo: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    songTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '5px 0',
    },
    songArtist: {
      fontSize: '16px',
      color: '#aaaaaa',
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '15px',
    },
    controlButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ffffff',
      fontSize: '24px',
      margin: '0 15px',
      cursor: 'pointer',
      outline: 'none',
    },
    playButton: {
      fontSize: '36px',
    },
    progressContainer: {
      width: '100%',
      height: '5px',
      backgroundColor: '#444',
      borderRadius: '5px',
      marginBottom: '15px',
      cursor: 'pointer',
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#1db954',
      borderRadius: '5px',
      width: '0%',
    },
    timeInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#aaaaaa',
    },
    volumeControl: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      marginTop: '15px',
    },
    volumeIcon: {
      marginRight: '10px',
      fontSize: '16px',
    },
    volumeSlider: {
      flexGrow: 1,
      height: '5px',
      backgroundColor: '#444',
      borderRadius: '5px',
      outline: 'none',
      WebkitAppearance: 'none',
    },
    playlist: {
      marginTop: '20px',
      borderTop: '1px solid #444',
      paddingTop: '15px',
    },
    playlistItem: {
      padding: '8px 10px',
      cursor: 'pointer',
      borderRadius: '5px',
      marginBottom: '5px',
      backgroundColor: '#333',
      transition: 'background-color 0.2s',
    },
    activePlaylistItem: {
      backgroundColor: '#1db954',
      color: '#fff',
    },
  };

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    
    const handleSongEnd = () => {
      handleNext();
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleSongEnd);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [currentSongIndex]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  const handleNext = () => {
    const newIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(newIndex);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  const handleProgressClick = (e) => {
    const progressContainer = e.currentTarget;
    const clickPosition = e.clientX - progressContainer.getBoundingClientRect().left;
    const progressWidth = progressContainer.clientWidth;
    const seekTime = (clickPosition / progressWidth) * duration;
    
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSongFromPlaylist = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 0);
  };

  return (
    <div style={styles.playerContainer}>
      <audio
        ref={audioRef}
        src={currentSong.src}
        volume={volume}
        autoPlay={isPlaying}
      />
      
      <div style={styles.songInfo}>
        <div style={styles.songTitle}>{currentSong.title}</div>
        <div style={styles.songArtist}>{currentSong.artist}</div>
      </div>
      
      <div style={styles.controls}>
        <button style={styles.controlButton} onClick={handlePrev}>
          <i className="fas fa-step-backward"></i>
        </button>
        <button style={{ ...styles.controlButton, ...styles.playButton }} onClick={togglePlay}>
          {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
        </button>
        <button style={styles.controlButton} onClick={handleNext}>
          <i className="fas fa-step-forward"></i>
        </button>
      </div>
      
      <div style={styles.progressContainer} onClick={handleProgressClick}>
        <div style={{ ...styles.progressBar, width: `${(currentTime / duration) * 100}%` }}></div>
      </div>
      
      <div style={styles.timeInfo}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div style={styles.volumeControl}>
        <span style={styles.volumeIcon}>
          <i className="fas fa-volume-up"></i>
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={styles.volumeSlider}
        />
      </div>
      
      <div style={styles.playlist}>
        <h3>Playlist</h3>
        {playlist.map((song, index) => (
          <div
            key={index}
            style={{
              ...styles.playlistItem,
              ...(index === currentSongIndex ? styles.activePlaylistItem : {})
            }}
            onClick={() => playSongFromPlaylist(index)}
          >
            {song.title} - {song.artist}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;