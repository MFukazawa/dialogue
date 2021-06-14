import React from 'react';
import styled from 'styled-components';

const AudioControlsContainer = styled.div`
  width: 100%;
`

const AudioControls = ({ audioRef, isPlaying, onSkipForward, onSkipBack, togglePlay }) => {
  const togglePlayPause = (isPlaying) => {
    return isPlaying ? togglePlay(false) : togglePlay(true)
  };

  const skip = (dataset) => {
    audioRef.current.currentTime += parseFloat(dataset.skip)
  };

  return (
    <AudioControlsContainer>
      <div className="track">
        <div className="track--filled"></div>
      </div>

      <button className="audio-play" onClick={() => togglePlayPause(isPlaying)}>
        { isPlaying
          ? <img src="https://s2.svgbox.net/materialui.svg?ic=pause" width="32" height="32" />
          : <img src="https://s2.svgbox.net/materialui.svg?ic=play_arrow" width="32" height="32" />
        }
      </button>
      {/* <input type="range" name="volume" className="player__slider" min="0" max="1" step="0.05" value="1" /> */}
      {/* <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" /> */}
      <button data-skip="-10" className="player__button" onClick={(e) => skip(e.target.dataset)}>« 10s</button>
      <button data-skip="10" className="player__button" onClick={(e) => skip(e.target.dataset)}>10s »</button>
    </AudioControlsContainer>
  )
};

export default AudioControls;