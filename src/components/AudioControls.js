import React from 'react';
import styled from 'styled-components';

const AudioControls = ({ audioRef, isPlaying, togglePlay, hasEnded }) => {
  const togglePlayPause = (isPlaying) => {
    return isPlaying ? togglePlay(false) : togglePlay(true);
  };

  const skip = (seconds) => {
    audioRef.current.currentTime += parseFloat(seconds);
  };

  const playButtonIcon = () => {
    if (!hasEnded) {
      return isPlaying ? (
        <img
          src='https://s2.svgbox.net/materialui.svg?ic=pause'
          width='32'
          height='32'
          alt='Pause button icon'
        />
      ) : (
        <img
          src='https://s2.svgbox.net/materialui.svg?ic=play_arrow'
          width='32'
          height='32'
          alt='Play button icon'
        />
      );
    } else {
      return (
        <img
          src='https://s2.svgbox.net/materialui.svg?ic=replay'
          width='32'
          height='32'
          alt='Replay button icon'
        />
      );
    }
  };

  return (
    <AudioControlsContainer>
      <AudioControl
        className='player__button'
        onClick={(e) => skip(e.target.dataset.skip)}
      >
        <img
          data-skip='-10'
          src='https://s2.svgbox.net/materialui.svg?ic=fast_rewind'
          alt='Rewind 10 seconds button icon'
        />
      </AudioControl>
      <AudioControl
        className='audio-play'
        onClick={() => togglePlayPause(isPlaying)}
      >
        {playButtonIcon()}
      </AudioControl>
      <AudioControl
        className='player__button'
        onClick={(e) => skip(e.target.dataset.skip)}
      >
        <img
          data-skip='10'
          src='https://s2.svgbox.net/materialui.svg?ic=fast_forward'
          alt='Fast forward 10 seconds button icon'
        />
      </AudioControl>
    </AudioControlsContainer>
  );
};

const AudioControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AudioControl = styled.button`
  margin: 10px 0;
  background: none;
  border: 0;
  line-height: 1;
  text-align: center;
  outline: 0;
  padding: 0;
  cursor: pointer;
  max-width: 50px;
`;

export default AudioControls;
