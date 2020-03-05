import React, { useState } from 'react';
import styled from 'styled-components';

const NowOrComing = styled('div')`
  overflow: hidden;
`;

const List = styled('ul')`
  @keyframes slide {
    0% {
      margin-left: 0;
    } /* 0 ~ 10  : 정지 */
    30% {
      margin-left: 0;
    } /* 10 ~ 25 : 변이 */
    50% {
      margin-left: -100%;
    } /* 25 ~ 35 : 정지 */
    70% {
      margin-left: -100%;
    } /* 35 ~ 50 : 변이 */
    100% {
      margin-left: 0;
    }
  }

  width: calc(100% * 2);
  display: flex;
  animation: slide 8s infinite;
`;

const Item = styled('li')`
  width: calc(100% / 2);
`;

const GridBox = styled('div')`
  display: grid;
  justify-content: center;
  grid-auto-flow: column;
  grid-template-columns: repeat(5, 200px);
  grid-auto-rows: 400px;
  grid-gap: 20px;
  margin-bottom: 20px;
`;

const Container = styled('div')`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 4fr 1fr;
`;

const Poster = styled('div')`
  background-image: url(${props =>
    `https://image.tmdb.org/t/p/w200/${props.img}`});
  background-position: center center;
  background-size: cover;
  border: 3px solid #f9ca24;
  :hover {
    opacity: 0.8;
  }
`;

const Info = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1.3;
  padding: 5px;
  color: white;
`;

const Title = styled('div')`
  font-size: 16px;
  margin-bottom: 3px;
`;

const Year = styled('div')`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

const Menu = styled('div')`
  width: calc(100% - 500px);
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  & div:first-child() {
    opacity: ${props => (props.show ? 1 : 0.7)};
  }
  & div:last-child() {
    opacity: ${props => (props.show ? 0.7 : 1)};
  }
`;

const Btn = styled('div')`
  width: 150px;
  padding: 20px 10px;
  background-color: #f9ca24;
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  border: 3px solid transparent;
  cursor: pointer;
  margin-right: 20px;
  :hover {
    border: 3px solid #f9ca24;
    background-color: transparent;
    color: #f9ca24;
  }
`;

const BoxOffice = ({ result, error, show, showNow, showComing }) => {
  return (
    <>
      <Menu show={show}>
        <Btn onClick={() => showNow()}>현재상영작</Btn>
        <Btn onClick={() => showComing()}>상영예정작</Btn>
      </Menu>
      <NowOrComing>
        <List>
          <Item>
            <GridBox>
              {result.nowPlaying &&
                result.nowPlaying.length > 0 &&
                result.nowPlaying.map(
                  (movie, index) =>
                    index < 5 && (
                      <Container key={movie.id}>
                        <Poster img={movie.poster_path} />
                        <Info>
                          <Title>{movie.title}</Title>
                          <Year>{movie.release_date.substring(0, 4)}</Year>
                        </Info>
                      </Container>
                    ),
                )}
            </GridBox>
            <GridBox>
              {result.nowPlaying &&
                result.nowPlaying.length > 0 &&
                result.nowPlaying.map(
                  (movie, index) =>
                    index >= 5 &&
                    index < 10 && (
                      <Container key={movie.id}>
                        <Poster img={movie.poster_path} />
                        <Info>
                          <Title>{movie.title}</Title>
                          <Year>{movie.release_date.substring(0, 4)}</Year>
                        </Info>
                      </Container>
                    ),
                )}
            </GridBox>
          </Item>
          <Item>
            <GridBox>
              {result.upComing &&
                result.upComing.length > 0 &&
                result.upComing.map(
                  (movie, index) =>
                    index < 5 && (
                      <Container key={movie.id}>
                        <Poster img={movie.poster_path} />
                        <Info>
                          <Title>{movie.title}</Title>
                          <Year>{movie.release_date.substring(0, 4)}</Year>
                        </Info>
                      </Container>
                    ),
                )}
            </GridBox>
            <GridBox>
              {result.upComing &&
                result.upComing.length > 0 &&
                result.upComing.map(
                  (movie, index) =>
                    index >= 5 &&
                    index < 10 && (
                      <Container key={movie.id}>
                        <Poster img={movie.poster_path} />
                        <Info>
                          <Title>{movie.title}</Title>
                          <Year>{movie.release_date.substring(0, 4)}</Year>
                        </Info>
                      </Container>
                    ),
                )}
            </GridBox>
          </Item>
        </List>
      </NowOrComing>
    </>
  );
};

export default BoxOffice;
