import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import noPoster from 'assets/noPoster.png';
import storage from 'lib/storage';

const SearchGridBox = styled('div')`
  margin-top: 50px;
  padding: 30px;
`;

const Msg = styled('div')`
  font-size: 18px;
  color: #f9ca24;
  height: 50vh;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled('div')`
  display: grid;
  margin: 0 auto;
  justify-content: center;
  grid-auto-rows: 450px;
  grid-template-columns: repeat(5, 250px);
  grid-gap: 30px;
  @media (max-width: 1350px) {
    grid-auto-rows: 430px;
    grid-template-columns: repeat(4, 250px);
  }
  @media (max-width: 1200px) {
    grid-auto-rows: 430px;
    grid-template-columns: repeat(3, 250px);
  }
`;

const Movie = styled('div')`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 4fr 0.5fr;
`;

const Poster = styled('div')`
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-image: url(${props =>
    props.poster
      ? `https://image.tmdb.org/t/p/w400${props.poster}`
      : noPoster});
  :hover {
    opacity: 0.6;
  }
`;

const Info = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Title = styled('div')`
  padding: 3px;
  font-size: 16px;
  color: white;
  text-align: center;
`;

const Year = styled('div')`
  padding: 3px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-align: center;
`;

const Genres = styled('div')`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  padding: 3px;
  text-align: center;
`;

const SearchContent = ({ results, term }) => {
  const genres = storage.get('genresDB');

  return (
    <>
      <SearchGridBox>
        {term !== '' && results.length === 0 && (
          <Msg>
            검색결과가 없습니다. <br />
            다른 문구로 검색해보세요!
          </Msg>
        )}
        {results && results.length > 0 && (
          <Container>
            {results.map((movie, index) => (
              <Movie key={index}>
                <Link to={`/movie/${movie.id}`}>
                  <Poster poster={movie.poster_path}></Poster>
                </Link>
                <Info>
                  <Genres>
                    <Title>{movie.title}</Title>
                    <Year>{movie.release_date.substring(0, 4)}</Year>
                    <Genres>
                      {genres
                        .filter(genre => movie.genre_ids.includes(genre.id))
                        .map((genre, index) =>
                          index === movie.genre_ids.length - 1
                            ? genre.name
                            : `${genre.name}/`,
                        )}
                    </Genres>
                  </Genres>
                </Info>
              </Movie>
            ))}
          </Container>
        )}
      </SearchGridBox>
    </>
  );
};

export default SearchContent;
