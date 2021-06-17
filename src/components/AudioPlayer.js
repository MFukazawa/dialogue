import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import AudioControls from './AudioControls';
import audioSrc from '../assets/audio/dialogue.mp3';
import VisualNovel from './VisualNovel';

const AudioPlayer = ({ track }) => {
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  // const [currentSubtitle, setCurrentSubtitle] = useState('');

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();

  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const pauseAudio = audioRef.current;
    return () => {
      pauseAudio.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.currentTime === audioRef.current.duration) {
        setHasEnded(true)
      } else {
        setHasEnded(false)
      }

      if (audioRef.current.ended) {
        setIsPlaying(false);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [500]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.curret);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  // Progress Bar progression
  // TODO add requestAnimationFrame to fix progress bar choppiness
  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%';

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #000), color-stop(${currentPercentage}, #777))
  `;

  // Script
  let currentSubtitle = '';
  let currentFocus = '';

  // useEffect(() => {
  const subtitles = [
    {
      start: '0:00:00',
      end: '0:03:90',
      text: 'Yuusaku: "Uh...Where are we?"',
      focused: 'Yuusaku'
    },
    {
      start: '0:03:90',
      end: '0:07:90',
      text: 'Yacchan: "This is our home, Yuusaku!"',
      focused: 'Yacchan'
    },
    {
      start: '0:07:90',
      end: '0:10:00',
      text: 'Yuusaku: "Oh...(I guess that means we live here together..?)"',
      focused: 'Yuusaku'
    },
    {
      start: '0:10:00',
      end: '0:16:90',
      text: 'Yuusaku: "Oh...(I guess that means we live here together..?)"',
      focused: 'Yuusaku'
    },
    {
      start: '0:16:90',
      end: '0:23:50',
      text: 'Yacchan: "This is the first time you\'ve been home in a week. Do you remember anything?"',
      focused: 'Yacchan'
    },
    {
      start: '0:23:50',
      end: '0:32:00',
      text: 'Yuusaku: "No...... Everything still feels foreign to me. Err...... Sorry, I guess."',
      focused: 'Yuusaku'
    },
    {
      start: '0:32:00',
      end: '0:40:00',
      text: 'Yacchan: "Oh, it\'s okay, you don\'t need to apologize. Take your time and everything will come back to you little by little."',
      focused: 'Yacchan'
    },
  ];

  const playTranscript = () => {
    try {
      subtitles.forEach((subtitle, index, array) => {
        const getTimeInSeconds = (timestamp) => {
          // timestamp format minutes/seconds/milliseconds
          const timeArray = timestamp.split(':').map((e) => parseInt(e));
          return parseFloat(
            timeArray[0] * 60 + timeArray[1] + timeArray[2] / 100
          );
       };

        const currentTime = audioRef.current.currentTime;

        if (
          currentTime >= getTimeInSeconds(subtitle.start) &&
          currentTime <= getTimeInSeconds(subtitle.end)
        ) {
          // setCurrentSubtitle(subtitle.text)
          currentSubtitle = subtitle.text;
          currentFocus = subtitle.focused;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  //   playTranscript();
  // }, [currentSubtitle])

  return (
    // TODO update onTimeUpdate={() => playTranscript}
    <AudioPlayerContainer onTimeUpdate={playTranscript()}>
      <VisualNovel
        isPlaying={isPlaying}
        trackProgress={trackProgress}
        currentSubtitle={currentSubtitle}
        currentFocus={currentFocus}
      />

      <AudioControls
        isPlaying={isPlaying}
        togglePlay={setIsPlaying}
        audioRef={audioRef}
        hasEnded={hasEnded}
      />

      <ProgressBar
        type='range'
        value={trackProgress}
        step='1'
        min='0'
        max={duration ? duration : `${duration}`}
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
`;

const ProgressBar = styled.input`
  display: block;
  height: 5px;
  -webkit-appearance: none;
  width: 50%;
  margin: 0 auto;
  border-radius: 8px;
  transition: background 0.2s ease;
  cursor: pointer;
`;

export default AudioPlayer;
