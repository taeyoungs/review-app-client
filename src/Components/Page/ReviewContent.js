import React from 'react';
import styled from 'styled-components';

const Tempbox = styled('div')`
  margin-top: 60px;
  height: 600px;
  color: white;
  font-size: 30px;
`;

const ReviewContent = () => {
  return <Tempbox>유저들이 작성한 리뷰 목록 쭉</Tempbox>;
};

export default ReviewContent;
