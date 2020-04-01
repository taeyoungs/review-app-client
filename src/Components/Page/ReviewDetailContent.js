import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { DeleteForever } from '@styled-icons/material';
import StarRatings from 'react-star-ratings';
import { toServerApi } from 'api';
import DefaultImage from '../../assets/thumnail.png';
import { EmotionNormal } from '@styled-icons/remix-line';
import { Angry } from '@styled-icons/fa-regular';
import { Smile } from '@styled-icons/boxicons-regular';
import { Star } from '@styled-icons/boxicons-solid';
import { CommentDetail } from '@styled-icons/boxicons-solid';

const Box = styled('div')`
  height: 100vh;
  color: white;
  padding: 0 40px;
`;

const Container = styled('div')`
  margin: 0 auto;
  margin-top: 60px;
  width: calc(100% - 450px);
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
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 8px;
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

// 유저 정보하고 별점
const UserAndEval = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
`;

const UserInfo = styled('div')`
  display: flex;
`;

const EvalBox = styled('div')`
  display: flex;
  align-items: center;
`;

const UserImage = styled('div')`
  width: 55px;
  height: 55px;
  margin: 10px;
  margin-top: 0px;
  background-image: url(${props => props.imageUrl});
  background-position: center center;
  background-size: cover;
`;

const DefaultThumnail = styled.img.attrs(props => ({
  src: DefaultImage,
  alt: 'DefaultImage',
}))`
  width: 55px;
  height: 55px;
  margin: 10px;
  margin-top: 0px;
`;

const InfoBox = styled('div')`
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled('div')`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Date = styled('div')`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

const UserEval = styled('div')`
  display: flex;
  flex-direction: row-reverse;
`;

const Normal = styled(EmotionNormal)`
  width: 33px;
  height: 33px;
  color: ${props =>
    props.check === 2 ? '#f1c40f' : 'rgba(255, 255, 255, 0.4)'};
  margin: 5px;
`;

const Ang = styled(Angry)`
  width: 29px;
  height: 29px;
  color: ${props =>
    props.check === 1 ? '#EA2027' : 'rgba(255, 255, 255, 0.4)'};
  margin: 5px;
`;

const Smil = styled(Smile)`
  width: 33px;
  height: 33px;
  color: ${props =>
    props.check === 3 ? '#009432' : 'rgba(255, 255, 255, 0.4)'};
  margin: 5px;
`;

const StarBox = styled('div')`
  display: flex;
  justify-content: center;
`;

const Main = styled('div')`
  padding: 15px;
  margin-bottom: 50px;
`;

const Title = styled('div')`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Content = styled('div')`
  font-size: 16px;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const DeleteIcon = styled(DeleteForever)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  :hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const EvalEmotion = styled(EmotionNormal)`
  color: rgba(255, 255, 255, 0.4);
  width: 28px;
  height: 28px;
  margin-right: 15px;
`;

const EvalStar = styled(Star)`
  color: rgba(255, 255, 255, 0.4);
  width: 26px;
  height: 26px;
  margin-right: 15px;
`;

const EvalReview = styled(CommentDetail)`
  color: rgba(255, 255, 255, 0.4);
  width: 26px;
  height: 26px;
  margin-right: 15px;
`;

const EvalText = styled('div')`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 14px;
  width: 100%;
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
      <Helmet>
        <title>Review Detail | ReviewApp</title>
      </Helmet>
      <Container>
        <Link to={`/movie/${result.review.movie.movieId}`}>
          <PosterAndEval>
            <Poster
              imageUrl={
                result.movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${result.movie.poster_path}`
                  : require('../../assets/noPoster.png')
              }
            />
            <Eval>
              <EvalItem>
                <EvalEmotion />
                <EvalText>63.04%</EvalText>
              </EvalItem>
              <EvalItem>
                <EvalStar />
                <EvalText>{result.movie.vote_average}</EvalText>
              </EvalItem>
              <EvalItem>
                <EvalReview />
                <EvalText>14</EvalText>
              </EvalItem>
            </Eval>
          </PosterAndEval>
        </Link>

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
          <UserAndEval>
            <UserInfo>
              {result.review.user.profile.thumnail === 'default' ? (
                <DefaultThumnail />
              ) : (
                <UserImage imageUrl={result.review.user.profile.thumnail} />
              )}
              <InfoBox>
                <Name>
                  {result.review.user.profile.username}{' '}
                  {userInfo.id === result.review.user._id ? (
                    <DeleteIcon onClick={handleDelete} />
                  ) : null}
                </Name>
                <Date>{result.formatCreatedAt}</Date>
              </InfoBox>
            </UserInfo>
            <UserEval>
              <div>
                <EvalBox>
                  <Ang check={result.review.emotion} />
                  <Normal check={result.review.emotion} />
                  <Smil check={result.review.emotion} />
                </EvalBox>
                <StarBox>
                  <StarRatings
                    rating={result.review.star}
                    starRatedColor="#f1c40f"
                    starEmptyColor="rgba(255, 255, 255, 0.3)"
                    starDimension="19px"
                    starSpacing="2px"
                  />
                </StarBox>
              </div>
            </UserEval>
          </UserAndEval>
          <Main>
            <Title>{result.review.title}</Title>
            <Content>{result.review.content}</Content>
          </Main>
        </Box>
      </Container>
    </>
  );
};

export default ReviewContent;
