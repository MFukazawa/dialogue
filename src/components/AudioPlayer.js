import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AudioControls from './AudioControls';
import audioSrc from '../assets/audio/dialogue.mp3';
import VisualNovel from './VisualNovel';

const AudioPlayer = ({ track }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  // const isReady = useRef(false);

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
        setIsPlaying(false);
        setHasEnded(true);
	    } else {
	      setTrackProgress(audioRef.current.currentTime);
	    }
	  }, [1000]);
	}

  const onScrub = (value) => {
    clearInterval(intervalRef.curret);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  }

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #000), color-stop(${currentPercentage}, #777))
  `;

  return (
    <AudioPlayerContainer>
      <VisualNovel
        isPlaying={isPlaying}
        trackProgress={trackProgress}
      />

      <AudioControls
        isPlaying={isPlaying}
        togglePlay={setIsPlaying}
        audioRef={audioRef}
        hasEnded={hasEnded}
      />

      <ProgressBar
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={duration ? duration : `${duration}`}
        className="progress"
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
        style={{ background: trackStyling }}
      />
    </AudioPlayerContainer>
  );
};

const AudioPlayerContainer = styled.main`
  max-width: 80ch;
  padding: 2ch;
  margin: auto;
`

const ProgressBar = styled.input`
  height: 5px;
  -webkit-appearance: none;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #3b7677;
  transition: background 0.2s ease;
  cursor: pointer;
`

export default AudioPlayer;