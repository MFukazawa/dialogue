import React from 'react';
import styled from 'styled-components';

const DialogueContainer = ({ isPlaying, trackProgress }) => {
  return (
    <DialogueBox>
      test
    </DialogueBox>
  );
};

const DialogueBox = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  width: 80%;
  height: 150px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ddd;
  background: hsl(0deg 0% 100% / 0.6);
`;

export default DialogueContainer;
