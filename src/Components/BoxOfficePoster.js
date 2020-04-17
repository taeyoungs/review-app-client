import React, { useContext } from 'react';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { Link } from 'react-router-dom';
import { RateReview } from '@styled-icons/material-outlined';

const Container = styled('div')`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: 4fr 1fr;
`;

const Poster = styled('div')`
  position: relative;
  background-position: center center;
  background-size: cover;
  border: 3px solid #f9ca24;
  height: 100%;
  z-index: 301;
  cursor: pointer;
  background-image: url(${(props) => props.img});
  :hover {
    & div.backBlur {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: 6fr 1fr;
      justify-content: center;
      & .reviewIcon {
        display: flex;
        align-items: center;
      }
    }
  }
`;

const Blur = styled.div.attrs((props) => ({
  className: 'backBlur',
}))`
  z-index: 302;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BtnBox = styled.div.attrs((props) => ({
  className: 'reviewIcon',
}))`
  display: none;
  z-index: 310;
  height: 100%;
  color: rgba(255, 255, 255, 0.5);
  :hover {
    color: #f1c40f;
  }
`;

const GoReviewBtn = styled(RateReview)`
  width: 21px;
  height: 21px;
  margin-right: 5px;
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
  font-size: ${(props) => (props.len ? '15px' : '17px')};
  margin-bottom: 5px;
`;

const Year = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

const Genres = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
`;

const LinkArea = styled('div')``;

const BoxOfficePoster = ({ movie, genres }) => {
  const { userInfo } = useContext(LoginContext);

  return (
    <Container>
      <Poster img={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}>
        <Blur user={userInfo !== null}>
          <Link to={`/movie/${movie.id}`}>
            <LinkArea />
          </Link>
          {userInfo && (
            <Link to={`/writeReview/${movie.id}`}>
              <BtnBox>
                <GoReviewBtn />
                리뷰 작성
              </BtnBox>
            </Link>
          )}
        </Blur>
      </Poster>

      <Info>
        <Title len={movie.title.length > 10 ? true : false}>
          {movie.title}
        </Title>
        <Genres>
          {genres
            .filter((genre) => movie.genre_ids.includes(genre.id))
            .map((genre, index) =>
              index === movie.genre_ids.length - 1
                ? genre.name
                : `${genre.name}/`,
            )}
        </Genres>
        <Year>{movie.release_date.substring(0, 4)}</Year>
      </Info>
    </Container>
  );
};

export default BoxOfficePoster;
