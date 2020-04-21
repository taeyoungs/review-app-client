import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { DeleteForever } from '@styled-icons/material';
import StarRatings from 'react-star-ratings';
import { EmotionNormal } from '@styled-icons/remix-line';
import { Angry } from '@styled-icons/fa-regular';
import { Smile } from '@styled-icons/boxicons-regular';
import { Detail } from '@styled-icons/boxicons-regular';
import { Like } from '@styled-icons/evil/';
import { Edit } from '@styled-icons/feather';
import { CommentDetail } from '@styled-icons/boxicons-solid';

const Box = styled('div')`
  color: white;
  padding: 0 40px;
`;

const Container = styled('div')`
  margin: 0 auto;
  width: calc(100% - 600px);
  display: grid;
  grid-template-columns: 0.8fr 5fr;
  margin-bottom: 20px;
`;

const PosterAndEval = styled('div')`
  height: 220px;
`;

const Poster = styled('div')`
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.imageUrl});
  height: 100%;
  :hover {
    opacity: 0.6;
  }
`;

const MovieInfo = styled('div')`
  color: white;
  margin-bottom: 15px;
`;

const MovieTitle = styled('div')`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const MovieSub = styled('div')`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const Date = styled('div')`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
`;

// 유저 정보하고 별점
const UserAndEval = styled('div')`
  display: flex;
  margin-bottom: 10px;
`;

const UserEval = styled('div')`
  display: flex;
  align-items: center;
`;

const EmotionBox = styled('div')`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Normal = styled(EmotionNormal)`
  width: 33px;
  height: 33px;
  color: ${(props) =>
    props.check === 2 ? '#f1c40f' : 'rgba(255, 255, 255, 0.4)'};
  margin: 3px;
`;

const Ang = styled(Angry)`
  width: 29px;
  height: 29px;
  color: ${(props) =>
    props.check === 1 ? '#EA2027' : 'rgba(255, 255, 255, 0.4)'};
  margin: 3px;
`;

const Smil = styled(Smile)`
  width: 33px;
  height: 33px;
  color: ${(props) =>
    props.check === 3 ? '#009432' : 'rgba(255, 255, 255, 0.4)'};
  margin: 3px;
`;

const StarBox = styled('div')`
  display: flex;
  justify-content: center;
`;

const Main = styled('div')`
  padding: 15px;
  margin-bottom: 15px;
`;

const Title = styled('div')`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const GoReviewBox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const GoReviewBtn = styled('div')`
  font-size: 18px;
  color: #f1c40f;
  padding: 20px 0px;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;

const DetailIcon = styled(Detail)`
  width: 27px;
  height: 27px;
  color: #f1c40f;
  margin-right: 10px;
`;

const EtcBox = styled('div')`
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const LikeIcon = styled(Like)`
  width: 24px;
  height: 24px;
  margin-right: 3px;
  margin-left: 5px;
`;

const EditIcon = styled(Edit)`
  width: 19px;
  height: 19px;
  margin: 0 10px;
  cursor: pointer;
  :hover {
    color: #f1c40f;
  }
`;

const DeleteIcon = styled(DeleteForever)`
  width: 22px;
  height: 22px;
  margin: 0 5px;
  cursor: pointer;
  :hover {
    color: #f1c40f;
  }
`;

const CommentIcon = styled(CommentDetail)`
  width: 18px;
  height: 18px;
  margin-right: 5px;
  margin-left: 15px;
`;

const Content = styled('div')`
  position: relative;
  font-size: 16px;
  height: 110px;
  overflow: hidden;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const Overlay = styled('div')`
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, transparent, rgba(20, 20, 20, 1));
`;

const MypageReview = ({
  results: reviews,
  handleDelete,
  best = false,
  menu = 'prof',
}) => {
  // console.log(reviews);
  const { userInfo } = useContext(LoginContext);

  // let reviews = results;
  // if (!best) {
  //   reviews.reverse();
  // }
  // if (menu === 'prof') {
  //   sortArray(results, best);

  //   if (results.length > 3) {
  //     reviews.push(results[0]);
  //     reviews.push(results[1]);
  //     reviews.push(results[2]);
  //   } else {
  //     reviews = results;
  //   }

  //   // console.log(reviews);
  // } else {
  //   reviews = sortArray(results, best);
  // }

  return (
    <>
      {reviews &&
        reviews.map((review, index) => (
          <Container key={index}>
            <PosterAndEval>
              <Link to={`/movie/${review.movie.movieId}`}>
                <Poster
                  imageUrl={
                    review.movie.poster
                      ? `https://image.tmdb.org/t/p/w200${review.movie.poster}`
                      : require('../../assets/noPoster.png')
                  }
                />
              </Link>
            </PosterAndEval>
            <Box>
              <MovieInfo>
                <MovieTitle>{review.movie.movieTitle}</MovieTitle>
                <MovieSub>
                  {review.movie.genres.map((genre, index) =>
                    index !== review.movie.genres.length - 1
                      ? `${genre.name}/`
                      : genre.name,
                  )}
                </MovieSub>
              </MovieInfo>
              <Date>{review.formatCreatedAt}</Date>
              <UserAndEval>
                <UserEval>
                  <EmotionBox>
                    <Ang check={review.emotion} />
                    <Normal check={review.emotion} />
                    <Smil check={review.emotion} />
                  </EmotionBox>
                  <StarBox>
                    <StarRatings
                      rating={review.star}
                      starRatedColor="#f1c40f"
                      starEmptyColor="rgba(255, 255, 255, 0.3)"
                      starDimension="19px"
                      starSpacing="2px"
                    />
                  </StarBox>
                </UserEval>
              </UserAndEval>
              <Main>
                <Title>{review.title}</Title>
                <Content>
                  {review.content}
                  <Overlay />
                </Content>
                <GoReviewBox>
                  <Link to={`/review/${review._id}`}>
                    <GoReviewBtn>
                      <DetailIcon />
                      리뷰 전문 보기
                    </GoReviewBtn>
                  </Link>
                </GoReviewBox>
              </Main>
              <EtcBox>
                {review.comment.length}
                <CommentIcon />
                {review.views}
                <LikeIcon />
                {userInfo && review.user === userInfo.id ? (
                  <>
                    <DeleteIcon onClick={() => handleDelete(review._id)} />
                  </>
                ) : null}
                {userInfo && review.user === userInfo.id ? (
                  <Link to={`/editReview/${review._id}`}>
                    <EditIcon />
                  </Link>
                ) : null}
              </EtcBox>
            </Box>
          </Container>
        ))}
    </>
  );
};

export default MypageReview;
