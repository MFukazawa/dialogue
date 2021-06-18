import React from 'react';
import styled from 'styled-components';
import DialogueContainer from './DialogueContainer';
import Yuusaku from './Yuusaku';
import Yacchan from './Yacchan';
import Sweat from './Sweat';
import background from '../assets/images/background_1.png';

const VisualNovel = ({
  isPlaying,
  trackProgress,
  currentSubtitle,
  currentFocus,
}) => {
  return (
    <VisualNovelContainer alt='Japanese estate with red torii in the background'>
      <VisualNovelBackground src={background} />
      <DialogueContainer
        trackProgress={trackProgress}
        isPlaying={isPlaying}
        currentSubtitle={currentSubtitle}
      />
      <Yuusaku
        isPlaying={isPlaying}
        trackProgress={trackProgress}
        currentFocus={currentFocus}
      />
      <Yacchan
        isPlaying={isPlaying}
        trackProgress={trackProgress}
        currentFocus={currentFocus}
      />
      <Sweat trackProgress={trackProgress} />
    </VisualNovelContainer>
  );
};

const VisualNovelContainer = styled.div`
  position: relative;
  line-height: 0;
`;

const VisualNovelBackground = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export default VisualNovel;
