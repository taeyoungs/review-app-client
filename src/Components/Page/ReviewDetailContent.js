import React, { useContext } from 'react';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { DeleteForever } from '@styled-icons/material';
import { toServerApi } from 'api';

const Box = styled('div')`
  height: 100vh;
  color: white;
  padding: 0 40px;
`;

const Container = styled('div')`
  margin: 0 auto;
  margin-top: 60px;
  width: calc(100% - 200px);
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const PosterAndEval = styled('div')`
  height: 450px;
  border: 1px solid #f1c40f;
  padding: 10px;
`;

const Poster = styled('div')`
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.imageUrl});
  height: 300px;
  margin-bottom: 10px;
`;

const Eval = styled('div')``;

const EvalItem = styled('div')`
  font-size: 17px;
  color: #f1c30f;
  padding: 10px;
`;

const MovieInfo = styled('div')`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 40px;
`;

const MovieTitle = styled('div')`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const MovieSub = styled('div')`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
`;

const Title = styled('div')`
  font-size: 15px;
`;

const DeleteIcon = styled(DeleteForever)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const ReviewContent = ({ result }) => {
  const { userInfo } = useContext(LoginContext);
  console.log(result);

  const handleDelete = async () => {
    try {
      await toServerApi.deleteReview(result.review._id).then(res => {
        if (res.status === 200) {
          window.location.href = '/#/review';
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <PosterAndEval>
          <Poster
            imageUrl={
              result.movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${result.movie.poster_path}`
                : require('../../assets/noPoster.png')
            }
          />
          <Eval>
            <EvalItem>Emotion</EvalItem>
            <EvalItem>Vote Average</EvalItem>
            <EvalItem>Comment Count</EvalItem>
          </Eval>
        </PosterAndEval>
        <Box>
          <MovieInfo>
            <MovieTitle>
              {result.movie.title} ({result.movie.original_title})
            </MovieTitle>
            <MovieSub>
              {result.movie.genres.map((genre, index) =>
                index !== result.movie.genres.length - 1
                  ? `${genre.name}/`
                  : genre.name,
              )}{' '}
              • {result.movie.release_date.substring(0, 4)}
            </MovieSub>
          </MovieInfo>
          <Title>{result.review.title}</Title>
          {userInfo.id === result.review.user ? (
            <DeleteIcon onClick={handleDelete} />
          ) : null}
        </Box>
      </Container>
    </>
  );
};

export default ReviewContent;
