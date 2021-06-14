import React from 'react'
import styled from 'styled-components'
import background from '../assets/images/background_1.png'
import AudioPlayer from './AudioPlayer'

// const NovelContainer = styled.main`
//   position: fixed;
//   inset: 0;
//   background: url(${background}) center no-repeat;
//   background-size: auto;
// `;





const Novel = () => {
  return (
    <div>
      <AudioPlayer />
    </div>
    // <NovelContainer></NovelContainer>
  )
};

export default Novel;