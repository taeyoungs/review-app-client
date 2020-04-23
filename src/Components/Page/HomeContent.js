import React from 'react';
import styled from 'styled-components';
import { ControllerPlay } from '@styled-icons/entypo';
import { RotateCcw } from '@styled-icons/feather';
import YoutubePlayer from 'Components/YoutubePlayer';

const Backdrop = styled('div')`
  height: 650px;
  background-image: url('https://image.tmdb.org/t/p/original/cqa3sa4c4jevgnEJwq3CMF8UfTG.jpg');
  background-size: cover;
  background-position: center center;
  margin-bottom: 50px;
`;

const Container = styled('div')`
  width: calc(100% - 270px);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 0 auto;
  grid-gap: 70px;
`;

const TitleBox = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const Title = styled('div')`
  font-size: 170px;
  font-family: 'Anton';
  font-weight: 900;
  margin-bottom: 15px;
  @media (max-width: 1600px) {
    font-size: 150px;
  }
`;

const Content = styled('div')`
  font-size: 22px;
  line-height: 1.5;
  margin-bottom: 15px;
  margin-left: 15px;
  display: flex;
  @media (max-width: 1600px) {
    font-size: 19px;
  }
`;

const StartBox = styled('span')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  width: 200px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: 600;
  margin-left: 10px;
  :hover {
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
  }
  @media (max-width: 1600px) {
    font-size: 17px;
    padding: 10px 20px;
  }
`;

const ThisMonth = styled('span')`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  border: 2px solid white;
  padding: 10px 5px;
  width: 120px;
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 1600px) {
    font-size: 17px;
  }
`;

const VideoBox = styled('div')`
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 25px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Play = styled(ControllerPlay)`
  width: 30px;
  margin-right: 10px;
`;

const BackIcon = styled(RotateCcw)`
  width: 30px;
  margin-right: 10px;
`;

const Text = styled('span')`
  color: #f9ca24;
  margin-left: 5px;
`;

const HomeContent = ({ result, error, isClick, handleClick }) => {
  return (
    <Backdrop>
      <Container>
        <TitleBox>
          <ThisMonth>
            이 달의 <Text>영화</Text>
          </ThisMonth>
          <Title>1917</Title>
          <Content>
            두 명의 병사, 하나의 미션! 그들이 싸워야 <br /> 할 것은 적이 아니라
            시간이었다!
          </Content>
          <StartBox onClick={() => handleClick(isClick)}>
            {isClick ? (
              <>
                <BackIcon />
                예고편 닫기
              </>
            ) : (
              <>
                <Play />
                예고편 열기
              </>
            )}
          </StartBox>
        </TitleBox>
        <VideoBox>{isClick ? <YoutubePlayer /> : null}</VideoBox>
      </Container>
    </Backdrop>
  );
};

export default HomeContent;
