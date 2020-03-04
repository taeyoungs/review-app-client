import React from 'react';
import styled from 'styled-components';

const GifBox = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled('img')``;

const Loader = () => {
  return (
    <GifBox>
      <Image src={'loading.gif'}></Image>
    </GifBox>
  );
};

export default Loader;
