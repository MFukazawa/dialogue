import React from 'react';
import styled from 'styled-components';
import background from '../assets/images/background_1.png';
import Yuusaku from './Yuusaku';
import Yacchan from './Yacchan';

const VisualNovel = ({ isPlaying, trackProgress }) => {
  console.log(trackProgress)
  return (
    <VisualNovelContainer
      alt="Japanese estate with red torii in the background"
    >
      <VisualNovelBackground src={background}/>
      <Yuusaku
        isPlaying={isPlaying}
        trackProgress={trackProgress}
      />
      <Yacchan
        isPlaying={isPlaying}
        trackProgress={trackProgress}
      />
    </VisualNovelContainer>
  );
};

const VisualNovelContainer = styled.div`
  position: relative;
  line-height: 0;
`

const VisualNovelBackground = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

export default VisualNovel;