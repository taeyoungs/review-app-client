import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { DeleteForever } from '@styled-icons/material';
import StarRatings from 'react-star-ratings';
import DefaultImage from '../../assets/thumnail.png';
import { EmotionNormal } from '@styled-icons/remix-line';
import { Angry } from '@styled-icons/fa-regular';
import { Smile } from '@styled-icons/boxicons-regular';
import { Detail } from '@styled-icons/boxicons-regular';
import { Like } from '@styled-icons/evil/';
import { Edit } from '@styled-icons/feather';
import { CommentDetail } from '@styled-icons/boxicons-solid';
import Loader from 'Components/Other/Loader2';

const Box = styled('div')`
  color: white;
  padding: 0 40px;
`;

const Container = styled('div')`
  margin: 0 auto;
  margin-top: 60px;
  width: calc(100% - 500px);
  display: grid;
  grid-template-columns: 1fr 5fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
`;

const PosterAndEval = styled('div')`
  height: 240px;
  padding: 10px;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  margin-bottom: 20px;
`;

const MovieTitle = styled('div')`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const MovieSub = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
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
  border-radius: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center center;
  background-size: cover;
  :hover {
    opacity: 0.7;
  }
`;

const DefaultThumnail = styled.img.attrs((props) => ({
  src: DefaultImage,
  alt: 'DefaultImage',
}))`
  width: 55px;
  height: 55px;
  margin: 10px;
  margin-top: 0px;
  :hover {
    opacity: 0.7;
  }
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
  margin-bottom: 40px;
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

const Overlay = styled('div')`
  position: absolute;
  width: 100%;
  height: 180px;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, transparent, rgba(20, 20, 20, 1));
`;

const SortHeader = styled('div')`
  height: 80px;
  width: calc(100% - 100px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 20px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
`;

const DescBtn = styled('div')`
  margin-left: 80px;
  padding: 20px;
  color: ${(props) =>
    props.sort === 'recent' ? '#f1c40f' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
`;

const BestBtn = styled('div')`
  color: ${(props) =>
    props.sort === 'best' ? '#f1c40f' : 'rgba(255, 255, 255, 0.7)'};
  padding: 20px;
  cursor: pointer;
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

const Date = styled('div')`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

const EtcBox = styled('div')`
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 10px;
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

const EmptyReview = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #f1c40f;
  opacity: 0.7;
`;

const BtnFlexBox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 20px;
`;

const MorePageBtn = styled('div')`
  padding: 20px 30px;
  border-radius: 30px;
  background-color: rgba(241, 196, 15, 0.7);
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  :hover {
    background-color: rgba(241, 196, 15, 1);
    color: rgba(0, 0, 0, 1);
    font-weight: 600;
  }
`;

const ReviewContent = ({
  reviews,
  handleDelete,
  sortType,
  loading,
  setSortType,
  handleMoreBtn,
  handleRecentSort,
  handleBestSort,
  full,
}) => {
  // console.log(reviews);
  const { userInfo } = useContext(LoginContext);

  return (
    <>
      <Helmet>
        <title>Review List | YoungsReview</title>
      </Helmet>
      <SortHeader>
        <DescBtn sort={sortType} onClick={handleRecentSort}>
          최근 리뷰
        </DescBtn>
        <BestBtn sort={sortType} onClick={handleBestSort}>
          베스트 리뷰
        </BestBtn>
      </SortHeader>
      {loading ? (
        <Loader loading={loading ? 1 : 0} />
      ) : (
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
                  <UserAndEval>
                    <UserInfo>
                      <Link to={`/user/${review.user._id}`}>
                        {review.user.profile.thumbnail === 'default' ? (
                          <DefaultThumnail />
                        ) : (
                          <UserImage imageUrl={review.user.profile.thumbnail} />
                        )}
                      </Link>
                      <InfoBox>
                        <Name>{review.user.profile.username}</Name>
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
                      {review.content.length > 184 && <Overlay />}
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
                    {userInfo && review.user._id === userInfo.id ? (
                      <>
                        <DeleteIcon onClick={() => handleDelete(review._id)} />
                      </>
                    ) : null}
                    {userInfo && review.user._id === userInfo.id ? (
                      <Link to={`/editReview/${review._id}`}>
                        <EditIcon />
                      </Link>
                    ) : null}
                  </EtcBox>
                </Box>
              </Container>
            ))}
          {full ? null : (
            <BtnFlexBox>
              <MorePageBtn onClick={handleMoreBtn}>더 불러오기</MorePageBtn>
            </BtnFlexBox>
          )}
        </>
      )}
    </>
  );
};

export default ReviewContent;
