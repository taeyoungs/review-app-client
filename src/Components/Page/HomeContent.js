import React from 'react';
import styled from 'styled-components';

const Backdrop = styled('div')`
  width: 100%;
  height: 500px;
  background-color: white;
  z-index: 7;
`;

const StartBox = styled('span')`
  width: 70px;
  height: 30px;
`;

const HomeContent = () => {
  return (
    <Backdrop>
      <StartBox>예고편 재생</StartBox>
    </Backdrop>
  );
};

export default HomeContent;
