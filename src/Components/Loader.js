import React from 'react';
import styled from 'styled-components';
import gifImage from 'assets/loading.gif';

const GifBox = styled('div')`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled('img')`
  width: 35px;
  height: 35px;
`;

const Loader = () => {
  return (
    <GifBox>
      <Image src={gifImage}></Image>
    </GifBox>
  );
};

export default Loader;
