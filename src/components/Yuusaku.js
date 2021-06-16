import React from 'react'
import regularPose from '../assets/images/yuusaku/pose_1.png';
import thoughtPose from '../assets/images/yuusaku/pose_2.png';
import laughPose from '../assets/images/yuusaku/pose_3.png';
import { useSpring, animated, config } from 'react-spring';
import styled from 'styled-components'

const Yuusaku = ({ isPlaying, trackProgress }) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 200,
    config: config.molasses
  });

  const isRegularPose = trackProgress < 9 || trackProgress > 40;
  const isThoughtPose = trackProgress > 9 && trackProgress < 23;
  const isLaughPose = trackProgress > 23 && trackProgress < 40;

  if (isPlaying && isRegularPose) {
    return <YuusakuImage style={props} src={regularPose} alt="Drawing of Yuusaku, a boy with glasses and hands on his hips." />
  } else if (isPlaying && isThoughtPose) {
    return <YuusakuImage style={props} src={thoughtPose} alt="Drawing of Yuusaku, a boy with glasses in a thinking pose." />
  } else if (isPlaying && isLaughPose) {
    return <YuusakuImage style={props} src={laughPose} alt="Drawing of Yuusaku, a boy with glasses laughing." />
  }

  return null;
};

const YuusakuImage = styled(animated.img)`
  position: absolute;
  bottom: 0;
  left: 20%;
  height: 50%;
`

export default Yuusaku;