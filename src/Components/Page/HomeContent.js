import React from 'react';
import styled from 'styled-components';
import { ControllerPlay } from '@styled-icons/entypo';

const Backdrop = styled('div')`
  height: 650px;
  background-image: url('https://image.tmdb.org/t/p/original/cqa3sa4c4jevgnEJwq3CMF8UfTG.jpg');
  background-size: cover;
  background-position: center center;
`;

const Container = styled('div')`
  width: calc(100% - 300px);
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 0 auto;
`;

const TitleBox = styled('div')`
  padding: 50px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  z-index: 7;
  color: white;
`;

const Title = styled('div')`
  font-size: 170px;
  font-family: 'Anton';
  font-weight: 900;
  margin-bottom: 15px;
`;

const Content = styled('div')`
  width: 400px;
  font-size: 22px;
  line-height: 1.5;
  margin-bottom: 15px;
  margin-left: 15px;
`;

const StartBox = styled('span')`
  display: flex;
  align-items: center;
  height: 30px;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px 20px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 600;
  :hover {
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
  }
`;

const Play = styled(ControllerPlay)`
  width: 30px;
  margin-right: 10px;
`;

const HomeContent = (result, error) => {
  return (
    <Backdrop>
      <Container>
        <TitleBox>
          <StartBox>
            <Play />
            예고편 재생
          </StartBox>
          <Content>
            두 명의 병사, 하나의 미션! 그들이 싸워야 할 것은 적이 아니라
            시간이었다!
          </Content>
          <Title>1917</Title>
        </TitleBox>
      </Container>
    </Backdrop>
  );
};

export default HomeContent;
