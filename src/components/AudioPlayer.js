import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AudioControls from './AudioControls';
import audioSrc from '../assets/audio/dialogue.mp3';
import background from '../assets/images/background_1.png';

const AudioPlayer = ({ track }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const progressBar = useRef(null);

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
        // console.log('track progress set')
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

  const handleProgress = () => {
    const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    console.log(percent)
    if (progressBar.current) {
      progressBar.current.style.flexBasis = `${percent}%`;
    }
  }

  return (
    <div className="audio-player" onTimeUpdate={handleProgress()}>
      <img
        className="background"
        src={background}
        alt="Japanese shrine with red torii in the background"
      />

      <AudioControls
        isPlaying={isPlaying}
        togglePlay={setIsPlaying}
        audioRef={audioRef}
        hasEnded={hasEnded}
      />

      <Track>
        <ProgressBar ref={progressBar}></ProgressBar>
      </Track>
    </div>
  );
};

const Track = styled.div`
  flex: 10;
  position: relative;
  display: flex;
  flex-basis: 100%;
  height: 5px;
  transition: height 0.3s;
  background: rgba(0,0,0,0.5);
  cursor: ew-resize;
`;

const ProgressBar = styled.div`
  width: 50%;
  background: #ffc600;
  flex: 0;
  flex-basis: 50%;
`

export default AudioPlayer;