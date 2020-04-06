import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { RateReview } from '@styled-icons/material-outlined';
import { Angry } from '@styled-icons/fa-regular';
import { Smile } from '@styled-icons/boxicons-regular';
import { EmotionNormal } from '@styled-icons/remix-line';
import { Detail } from '@styled-icons/boxicons-regular';
import { DeleteForever } from '@styled-icons/material';
import { Like } from '@styled-icons/evil/';
import { Edit } from '@styled-icons/feather';
import { CommentDetail } from '@styled-icons/boxicons-solid';
import { toServerApi } from 'api';
import LoginContext from 'context/Login.context';
import DefaultImage from '../../assets/thumnail.png';

const Container = styled('div')`
  width: calc(100% - 600px);
  margin: 0 auto;
`;

const ListInfo = styled('div')`
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const Head = styled('div')`
  font-size: 21px;
  color: #f1c40f;
  font-weight: 600;
  margin-right: 10px;
  margin-left: 80px;
`;

const ReviewIcon = styled(RateReview)`
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 10px;
`;

const ReveiwsLength = styled('div')`
  color: rgba(255, 255, 255, 0.7);
  font-size: 17px;
`;

const SortType = styled('div')``;

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
  background-image: url(${(props) => props.imageUrl});
  background-position: center center;
  background-size: cover;
`;

const DefaultThumnail = styled.img.attrs((props) => ({
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
  color: ${(props) =>
    props.check === 2 ? '#f1c40f' : 'rgba(255, 255, 255, 0.4)'};
  margin: 5px;
`;

const Ang = styled(Angry)`
  width: 29px;
  height: 29px;
  color: ${(props) =>
    props.check === 1 ? '#EA2027' : 'rgba(255, 255, 255, 0.4)'};
  margin: 5px;
`;

const Smil = styled(Smile)`
  width: 33px;
  height: 33px;
  color: ${(props) =>
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled('div')`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const Content = styled('div')`
  position: relative;
  font-size: 16px;
  height: 230px;
  overflow: hidden;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const Box = styled('div')`
  color: white;
  padding: 0 60px;
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

const Overlay = styled('div')`
  position: absolute;
  width: 100%;
  height: 180px;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, transparent, rgba(20, 20, 20, 1));
`;

const DetailIcon = styled(Detail)`
  width: 27px;
  height: 27px;
  color: #f1c40f;
  margin-right: 10px;
`;

const EmptyReview = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #f1c40f;
  opacity: 0.7;
`;

const EtcBox = styled('div')`
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 10px;
  margin-bottom: 5px;
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

const MovieDetailReview = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  const { userInfo } = useContext(LoginContext);

  const handleDelete = async (reviewId) => {
    try {
      await toServerApi.deleteReview(reviewId).then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getReviews = async () => {
    try {
      const result = await toServerApi.getMovieReviewList(movieId);

      console.log(result);

      setReviews(result.data.movieReviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <Container>
        <ListInfo>
          <Head>리뷰</Head>
          <ReviewIcon />
          <ReveiwsLength>{reviews.length}</ReveiwsLength>
        </ListInfo>
        {reviews && reviews.length === 0 && (
          <EmptyReview>등록된 리뷰가 없습니다.</EmptyReview>
        )}
        {reviews &&
          reviews.length > 0 &&
          reviews.map((review, index) => (
            <Box key={index}>
              <UserAndEval>
                <UserInfo>
                  {review.user.profile.thumnail === 'default' ? (
                    <DefaultThumnail />
                  ) : (
                    <UserImage imageUrl={review.user.profile.thumnail} />
                  )}
                  <InfoBox>
                    <Name>{review.user.profile.username} </Name>
                    <Date>{review.formatCreatedAt}</Date>
                  </InfoBox>
                </UserInfo>
                <UserEval>
                  <div>
                    <EvalBox>
                      <Ang check={review.emotion} />
                      <Normal check={review.emotion} />
                      <Smil check={review.emotion} />
                    </EvalBox>
                    <StarBox>
                      <StarRatings
                        rating={review.star}
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
                <EtcBox>
                  {review.comment.length}
                  <CommentIcon />
                  {review.views}
                  <LikeIcon />
                  {review.user._id === userInfo.id ? (
                    <>
                      <DeleteIcon onClick={() => handleDelete(review._id)} />
                    </>
                  ) : null}
                  {review.user._id === userInfo.id ? (
                    <Link to={`/editReview/${review._id}`}>
                      <EditIcon />
                    </Link>
                  ) : null}
                </EtcBox>
              </Main>
            </Box>
          ))}
      </Container>
    </>
  );
};

export default MovieDetailReview;
