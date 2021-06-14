import React, { useState, useEffect, useRef } from 'react';
import AudioControls from './AudioControls';
import audioSrc from '../assets/audio/dialogue.mp3';
import background from '../assets/images/background_1.png';

const AudioPlayer = ({ track }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current)
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);

  const startTimer = () => {
	  // Clear any timers already running
	  clearInterval(intervalRef.current);

	  intervalRef.current = setInterval(() => {
	    if (audioRef.current.ended) {
	      // toNextTrack();
        console.log('ended')
	    } else {
	      // setTrackProgress(audioRef.current.currentTime);
        console.log('track progress set')
	    }
	  }, [1000]);
	}
  
  const onSkipBack = () => {
    clearInterval(intervalRef.current);
    // audioRef.current.currentTime = value;
    console.log(audioRef.current.currentTime)
    console.log('go back 10 seconds');
  };

  const onSkipForward = () => {
    console.log('go forward 10 seconds')
  }

  return (
    <div className="audio-player">
      <img
        className="background"
        src={background}
        alt="Japanese shrine with red torii in the background"
      />
      <AudioControls
        isPlaying={isPlaying}
        onRewind={onSkipForward}
        onFastForward={onSkipBack}
        togglePlay={setIsPlaying}
        audioRef={audioRef}
      />
    </div>
  );
};

export default AudioPlayer;