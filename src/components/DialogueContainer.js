import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const DialogueContainer = ({ text, isPlaying }) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
    config: config.molasses,
  });

  if (isPlaying) {
    return <DialogueBox style={props}>{text}</DialogueBox>;
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

export default DialogueContainer;
