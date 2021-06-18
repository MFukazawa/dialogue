import React, { useState, useEffect } from 'react';
import regularPose from '../assets/images/yuusaku/pose_1.png';
import thoughtPose from '../assets/images/yuusaku/pose_2.png';
import laughPose from '../assets/images/yuusaku/pose_3.png';
import { animated, config, useTransition } from 'react-spring';
import styled from 'styled-components';

const Yuusaku = ({ isPlaying, trackProgress, currentFocus }) => {
  const [currentPose, setCurrentPose] = useState('')

  const transitions = useTransition(currentPose, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });

  // TODO receive via props
  // ** Pose timing changed from original **
  const isRegularPose = trackProgress < 9 || trackProgress >= 40;
  const isThoughtPose = trackProgress >= 9 && trackProgress < 23.5;
  const isLaughPose = trackProgress >= 23.5 && trackProgress < 40;

  const focused = currentFocus === 'Yuusaku' ? 'focused' : '';

  useEffect(() => {
    if (isPlaying && isRegularPose) {
      setCurrentPose('regular')
      console.log('set reg')
    }

    if (isPlaying && isThoughtPose) {
      setCurrentPose('thought')
      console.log('set thought')
    }

    if (isPlaying && isLaughPose) {
      setCurrentPose('laugh')
      console.log('set laugh')
    }

    if (!isPlaying) {
      setCurrentPose('')
      console.log('reset')
    }
  }, [trackProgress, isPlaying, isRegularPose, isThoughtPose, isLaughPose])

  if (currentPose === 'regular') {
    return transitions((styles, item) => item &&
      <YuusakuImage
        style={styles}
        focused={focused}
        src={regularPose}
        alt='Drawing of Yuusaku, a boy with glasses and hands on his hips.'
      />
    );
  } else if (currentPose === 'thought') {
    return transitions((styles, item) => item &&
      <YuusakuImage
        style={styles}
        focused={focused}
        src={thoughtPose}
        alt='Drawing of Yuusaku, a boy with glasses in a thinking pose.'
      />
    );
  } else if (currentPose === 'laugh') {
    return transitions((styles, item) => item &&
      <YuusakuImage
        style={styles}
        focused={focused}
        src={laughPose}
        alt='Drawing of Yuusaku, a boy with glasses laughing.'
      />
    );
  }

  return null;
};

const YuusakuImage = styled(animated.img)`
  position: absolute;
  bottom: 0;
  right: 20%;
  height: ${props => props.focused ? '60%' : '50%'};
  transition: height 0.2s ease-in-out;
`;

export default Yuusaku;
