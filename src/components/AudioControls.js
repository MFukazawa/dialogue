import React from 'react';
import styled from 'styled-components';

const AudioControlsContainer = styled.div`
  width: 100%;
`

const AudioControls = ({ isPlaying, rewind, fastForward, togglePlay }) => {
  const togglePlayPause = (isPlaying) => {
    return isPlaying ? togglePlay(false) : togglePlay(true)
  };

  return (
    <AudioControlsContainer>
      <div className="track">
        <div className="track--filled"></div>
      </div>

      <button className="audio-play" onClick={() => togglePlayPause(isPlaying)}>►</button>
      {/* <input type="range" name="volume" className="player__slider" min="0" max="1" step="0.05" value="1" /> */}
      {/* <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" /> */}
      <button data-skip="-10" className="player__button" onClick={() => rewind()}>« 10s</button>
      <button data-skip="10" className="player__button" onClick={() => fastForward()}>10s »</button>
    </AudioControlsContainer>
  )
};

export default AudioControls;