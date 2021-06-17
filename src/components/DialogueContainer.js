import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const DialogueContainer = ({ isPlaying, currentSubtitle }) => {
  const props = useSpring({
    from: { opacity: 0, transform: "translateY(-100%)" },
    to: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(100%)" },
    delay: 1000,
    config: config.gentle
  });

  const propsTest = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 1300,
    config: config.molasses
  });

  if (isPlaying && currentSubtitle.length > 0) {
    return (
      <DialogueBox style={props}>
        <SubtitleText style={propsTest}>{currentSubtitle}</SubtitleText>
      </DialogueBox>
    );
  }

  return null;
};

const DialogueBox = styled(animated.div)`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  width: 80%;
  height: 150px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: hsl(0deg 0% 100% / 0.6);
`;

const SubtitleText = styled(animated.p)`
  line-height: 1.5;
`;

export default DialogueContainer;
