import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';

const Tempbox = styled('div')`
  height: 600px;
`;

const ReviewContent = () => {
  return (
    <Tempbox>
      <Iframe
        url="http://www.youtube.com/embed/MMam74uzhzs"
        width="100%"
        height="550px"
      />
    </Tempbox>
  );
};

export default ReviewContent;
