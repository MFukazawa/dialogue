import React from 'react';
import regularPose from '../assets/images/yacchan/pose_1.png';
import sidePose from '../assets/images/yacchan/pose_2.png';
import thoughtPose from '../assets/images/yacchan/pose_3.png';
import { useSpring, animated, config } from 'react-spring';
import styled from 'styled-components';

const Yacchan = ({ isPlaying, trackProgress, currentFocus }) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
    config: config.molasses,
  });

  // TODO receive via props
  // ** Pose timing changed from original **
  const isSidePose = trackProgress < 19;
  const isThoughtPose = trackProgress > 19 && trackProgress < 33;
  const isRegularPose = trackProgress > 33;

  const focused = currentFocus === 'Yacchan' ? 'focused' : '';

  if (isPlaying && isRegularPose) {
    return (
      <YacchanImage
        style={props}
        focused={focused}
        src={regularPose}
        alt='Drawing of Yacchan, a blonde girl in a happy pose.'
      />
    );
  } else if (isPlaying && isSidePose) {
    return (
      <YacchanImage
        style={props}
        focused={focused}
        src={sidePose}
        alt='Drawing of Yacchan, a blonde girl smiling.'
      />
    );
  } else if (isPlaying && isThoughtPose) {
    return (
      <YacchanImage
        style={props}
        focused={focused}
        src={thoughtPose}
        alt='Drawing of Yacchan, a blonde girl looking inquisitive.'
      />
    );
  }

  return null;
};

const YacchanImage = styled(animated.img)`
  position: absolute;
  bottom: 0;
  left: 20%;
  height: ${props => props.focused ? '60%' : '50%'};
`;

export default Yacchan;
