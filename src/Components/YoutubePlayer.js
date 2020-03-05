import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';

const PlayerBox = styled('div')`
  height: 100%;
`;

const YoutubePlayer = () => {
  return (
    <PlayerBox>
      <Iframe
        url="http://www.youtube.com/embed/MMam74uzhzs"
        width="100%"
        height="100%"
      />
    </PlayerBox>
  );
};

export default YoutubePlayer;
