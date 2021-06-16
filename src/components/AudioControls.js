import React from 'react';
import styled from 'styled-components';

const AudioControls = ({ audioRef, isPlaying, togglePlay, hasEnded }) => {
  const togglePlayPause = (isPlaying) => {
    return isPlaying ? togglePlay(false) : togglePlay(true);
  };

  const skip = (dataset) => {
    audioRef.current.currentTime += parseFloat(dataset.skip)
  };

  const playButtonIcon = () => {
    if (!hasEnded) {
      return isPlaying
        ? <img src="https://s2.svgbox.net/materialui.svg?ic=pause" width="32" height="32" />
        : <img src="https://s2.svgbox.net/materialui.svg?ic=play_arrow" width="32" height="32" />
    } else if (hasEnded && !isPlaying) {
      return isPlaying
        ? <img src="https://s2.svgbox.net/materialui.svg?ic=pause" width="32" height="32" />
        : <img src="https://s2.svgbox.net/materialui.svg?ic=replay" width="32" height="32" />
    } else {
      return isPlaying
      ? <img src="https://s2.svgbox.net/materialui.svg?ic=pause" width="32" height="32" />
      : <img src="https://s2.svgbox.net/materialui.svg?ic=play_arrow" width="32" height="32" />
    }
  };

  return (
    <AudioControlsContainer>
      <button className="audio-play" onClick={() => togglePlayPause(isPlaying)}>
        {playButtonIcon()}
      </button>
      {/* <input type="range" name="volume" className="player__slider" min="0" max="1" step="0.05" value="1" /> */}
      {/* <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" /> */}
      <button data-skip="-10" className="player__button" onClick={(e) => skip(e.target.dataset)}>« 10s</button>
      <button data-skip="10" className="player__button" onClick={(e) => skip(e.target.dataset)}>10s »</button>
    </AudioControlsContainer>
  )
};

// CSS
const AudioControlsContainer = styled.div`
  width: 100%;
`

export default AudioControls;