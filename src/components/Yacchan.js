import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated, config, useTransition } from 'react-spring';
import regularPose from '../assets/images/yacchan/pose_1.png';
import sidePose from '../assets/images/yacchan/pose_2.png';
import thoughtPose from '../assets/images/yacchan/pose_3.png';

const Yacchan = ({ isPlaying, trackProgress, currentFocus }) => {
  const [currentPose, setCurrentPose] = useState('');

  const transitions = useTransition(currentPose, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.slow,
  });

  // TODO receive via props
  // ** Pose timing changed from original **
  const isSidePose = trackProgress < 19;
  const isThoughtPose = trackProgress > 19 && trackProgress < 33;
  const isRegularPose = trackProgress > 33;

  const focused = currentFocus === 'Yacchan' ? 'focused' : '';

  useEffect(() => {
    if (isPlaying && isSidePose) {
      setCurrentPose('side');
    }

    if (isPlaying && isThoughtPose) {
      setCurrentPose('thought');
    }

    if (isPlaying && isRegularPose) {
      setCurrentPose('regular');
    }

    if (!isPlaying) {
      setCurrentPose('');
    }
  }, [trackProgress, isPlaying, isRegularPose, isSidePose, isThoughtPose]);

  return transitions((styles, item) =>
    item === 'side' ? (
      <YacchanImage
        style={styles}
        focused={focused}
        src={sidePose}
        alt='Drawing of Yacchan, a blonde girl smiling.'
      />
    ) : item === 'regular' ? (
      <YacchanImage
        style={styles}
        focused={focused}
        src={regularPose}
        alt='Drawing of Yacchan, a blonde girl in a happy pose.'
      />
    ) : item === 'thought' ? (
      <YacchanImage
        style={styles}
        focused={focused}
        src={thoughtPose}
        alt='Drawing of Yacchan, a blonde girl looking inquisitive.'
      />
    ) : null
  );
};

const YacchanImage = styled(animated.img)`
  position: absolute;
  bottom: 0;
  left: 20%;
  height: ${(props) => (props.focused ? '60%' : '50%')};
  transition: height 0.2s ease-in-out;
`;

export default Yacchan;
