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
    leave: { opacity: 0 },
    delay: 2000,
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
      <div>
        <YacchanImage
          style={props}
          focused={focused}
          src={regularPose}
          alt='Drawing of Yacchan, a blonde girl in a happy pose.'
          onAnimationEnd={() => console.log('animation ended')}
        />
      </div>
    );
  } else if (isPlaying && isSidePose) {
    return (
      <YacchanImage
        style={props}
        focused={focused}
        src={sidePose}
        alt='Drawing of Yacchan, a blonde girl smiling.'
        onAnimationEnd={() => console.log('animation ended')}
      />
    );
  } else if (isPlaying && isThoughtPose) {
    return (
      <YacchanImage
        style={props}
        focused={focused}
        src={thoughtPose}
        alt='Drawing of Yacchan, a blonde girl looking inquisitive.'
        onAnimationEnd={() => console.log('animation ended')}
      />
    );
  }

  return null;
};

const YacchanImage = styled(animated.img)`
  position: absolute;
  bottom: 0;
  left: 20%;
  height: ${(props) => (props.focused ? '60%' : '50%')};
  transition: height 0.2s ease-in-out;
`;

export default Yacchan;
