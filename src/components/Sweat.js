import React, { useState, useEffect } from 'react';
import sweat from '../assets/images/sweat.png';
import { animated, config, useTransition } from 'react-spring';

const Sweat = ({ trackProgress }) => {
  const [show, setShow] = useState(false);

  const transitions = useTransition(show, {
    from: { opacity: 0, transform: `translateY(-100px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    leave: { opacity: 0 },
    reverse: show,
    delay: 200,
    config: config.gentle,
  });

  const showSweat = trackProgress > 24 && trackProgress < 26;

  useEffect(() => {
    setShow(showSweat);
  }, [showSweat]);

  return transitions(
    (styles, item) =>
      item && <animated.img style={styles} src={sweat} className='sweat' />
  );
};

export default Sweat;
