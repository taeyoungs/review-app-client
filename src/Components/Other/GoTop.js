import React from 'react';
import styled from 'styled-components';
import { ArrowToTop } from '@styled-icons/boxicons-solid';

const ArrowBox = styled('div')`
  position: fixed;
  right: 45px;
  bottom: 45px;
  z-index: 2001px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: rgba(241, 196, 15, 1);
  opacity: 0.5;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const ArrowIcon = styled(ArrowToTop)`
  width: 35px;
  height: 35px;
  color: (0, 0, 0, 1);
`;

const GoTop = () => {
  const handleGoTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ArrowBox onClick={handleGoTop}>
      <ArrowIcon />
    </ArrowBox>
  );
};

export default GoTop;
