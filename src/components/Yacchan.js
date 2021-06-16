import React from 'react'
import regularPose from '../assets/images/yacchan/pose_1.png';
import sidePose from '../assets/images/yacchan/pose_2.png';
import thoughtPose from '../assets/images/yacchan/pose_3.png';
import { useSpring, animated, config } from 'react-spring';
import styled from 'styled-components'

const Yacchan = ({ isPlaying, trackProgress }) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
    config: config.molasses
  });

  const isSidePose = trackProgress < 19;
  const isThoughtPose = trackProgress > 19 && trackProgress < 33;
  const isRegularPose = trackProgress > 33;

  if (isPlaying && isRegularPose) {
    return <YacchanImage style={props} src={regularPose} alt="Drawing of Yacchan, a girl with glasses and hands on his hips" />
  } else if (isPlaying && isSidePose) {
    return <YacchanImage style={props} src={sidePose} alt="Drawing of Yacchan, a girl with glasses and hands on his hips" />
  } else if (isPlaying && isThoughtPose) {
    return <YacchanImage style={props} src={thoughtPose} alt="Drawing of Yacchan, a girl with glasses and hands on his hips" />
  }

  return null;
};

const YacchanImage = styled(animated.img)`
  position: absolute;
  bottom: 0;
  right: 20%;
  height: 50%;
`

export default Yacchan;