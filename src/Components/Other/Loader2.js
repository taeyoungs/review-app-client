import React from 'react';
import styled from 'styled-components';
import gifImage from 'assets/loading.gif';

const BackDrop = styled('div')`
  display: ${(props) => (props.loading === 1 ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.3);
`;

const GifBox = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled('img')`
  width: 45px;
  height: 45px;
`;

const Loader2 = ({ loading }) => {
  return (
    <BackDrop loading={loading}>
      <GifBox>
        <Image src={gifImage}></Image>
      </GifBox>
    </BackDrop>
  );
};

export default Loader2;
