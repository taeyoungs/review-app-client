import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NowOrComing = styled('div')`
  overflow: hidden;
  margin-bottom: 30px;
`;

const List = styled.ul.attrs(props => ({
  className: props.now ? 'left' : 'right',
}))`
  margin-left: ${props => (props.now ? '0' : '-100%')};
  width: calc(100% * 2);
  display: flex;
  transition: margin-left 1s ease-in-out;
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
  background-position: center center;
  background-size: cover;
  border: 3px solid #f9ca24;
  height: 100%;
  cursor: pointer;
  background-image: url(${props =>
    `https://image.tmdb.org/t/p/w200/${props.img}`});
  :hover {
    opacity: 0.5;
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
  font-size: ${props => (props.len ? '15px' : '17px')};
  margin-bottom: 5px;
`;

const Year = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

const Menu = styled('div')`
  width: calc(100% - 500px);
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  & .now {
    opacity: ${props => (props.now ? '1' : '0.6')};
    border-bottom: 3px solid ${props => (props.now ? '#f9ca24' : 'transparent')};
  }
  & .coming {
    opacity: ${props => (props.now ? '0.6' : '1')};
    border-bottom: 3px solid ${props => (props.now ? 'transparent' : '#f9ca24')};
  }
`;

const Btn = styled('div')`
  width: 130px;
  padding: 20px 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  cursor: pointer;
  margin-right: 20px;
  :hover {
    opacity: 0.9;
  }
`;

const Genres = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
`;

const BoxOffice = ({ result, error }) => {
  const [now, setNow] = useState(true);

  const showNow = () => {
    setNow(true);
  };
  const showComing = () => {
    setNow(false);
  };

  return (
    <>
      <Menu now={now}>
        <Btn className="now" onClick={() => showNow()}>
          현재상영작
        </Btn>
        <Btn className="coming" onClick={() => showComing()}>
          상영예정작
        </Btn>
      </Menu>
      <NowOrComing>
        <List now={now}>
          <Item>
            <GridBox>
              {result.nowPlaying &&
                result.nowPlaying.length > 0 &&
                result.nowPlaying.map(
                  (movie, index) =>
                    index < 5 && (
                      <Container key={movie.id}>
                        <Link to={`movie/${movie.id}`}>
                          <Poster img={movie.poster_path} />
                        </Link>
                        <Info>
                          <Title len={movie.title.length > 10 ? true : false}>
                            {movie.title}
                          </Title>
                          <Genres>
                            {result.genres
                              .filter(genre =>
                                movie.genre_ids.includes(genre.id),
                              )
                              .map((genre, index) =>
                                index === movie.genre_ids.length - 1
                                  ? genre.name
                                  : `${genre.name}/`,
                              )}
                          </Genres>
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
                        <Link to={`movie/${movie.id}`}>
                          <Poster img={movie.poster_path} />
                        </Link>
                        <Info>
                          <Title len={movie.title.length > 10 ? true : false}>
                            {movie.title}
                          </Title>
                          <Genres>
                            {result.genres
                              .filter(genre =>
                                movie.genre_ids.includes(genre.id),
                              )
                              .map((genre, index) =>
                                index === movie.genre_ids.length - 1
                                  ? genre.name
                                  : `${genre.name}/`,
                              )}
                          </Genres>
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
                        <Link to={`movie/${movie.id}`}>
                          <Poster img={movie.poster_path} />
                        </Link>
                        <Info>
                          <Title len={movie.title.length > 10 ? true : false}>
                            {movie.title}
                          </Title>
                          <Genres>
                            {result.genres
                              .filter(genre =>
                                movie.genre_ids.includes(genre.id),
                              )
                              .map((genre, index) =>
                                index === movie.genre_ids.length - 1
                                  ? genre.name
                                  : `${genre.name}/`,
                              )}
                          </Genres>
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
                        <Link to={`movie/${movie.id}`}>
                          <Poster img={movie.poster_path} />
                        </Link>
                        <Info>
                          <Title len={movie.title.length > 10 ? true : false}>
                            {movie.title}
                          </Title>
                          <Genres>
                            {result.genres
                              .filter(genre =>
                                movie.genre_ids.includes(genre.id),
                              )
                              .map((genre, index) =>
                                index === movie.genre_ids.length - 1
                                  ? genre.name
                                  : `${genre.name}/`,
                              )}
                          </Genres>
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
