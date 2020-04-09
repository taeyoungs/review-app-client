import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { Clock } from '@styled-icons/fa-regular';
import { Calendar } from '@styled-icons/boxicons-regular';
import { Imdb } from '@styled-icons/fa-brands';
import { RateReview } from '@styled-icons/material-outlined';
import Loader from 'Components/Other/Loader';
import VideoLinks from 'Components/VideoLinks';
import MovieTabs from 'Components/MovieTabs';
import { movieApi } from 'api';
import noPoster from 'assets/noPoster.png';
import MovieDetailReview from 'Components/Page/MovieDetailReview';
import LoginContext from 'context/Login.context';

const Container = styled('div')`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 40px 30px;
  font-size: 15px;
  color: white;
  margin-bottom: 50px;
`;

const Backdrop = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: top center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled('div')`
  display: flex;
  position: relative;
  width: 80%;
  height: 100%;
  z-index: 10;
  margin: 0 auto;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.8)
  );
`;

const Cover = styled('div')`
  width: 40%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  margin-right: 25px;
  mask-image: -webkit-gradient(
    linear,
    right top,
    left top,
    color-stop(1, rgba(0, 0, 0, 1)),
    color-stop(0.5, rgba(0, 0, 0, 1)),
    color-stop(0, rgba(0, 0, 0, 0))
  );
`;

const Data = styled('div')`
  width: 60%;
`;

const FlexBox = styled('div')`
  display: flex;
`;

const Title = styled('div')`
  margin-top: 30px;
  margin-bottom: 15px;
  margin-right: 20px;
  font-size: 45px;
  font-weight: 600;
`;

const ReviewIcon = styled(RateReview)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const WriteReview = styled('div')`
  color: rgba(241, 195, 15, 0.5);
  font-size: 17px;
  margin-top: 60px;
  cursor: pointer;
  :hover {
    color: rgba(241, 195, 15, 1);
  }
`;

const ItemContainer = styled('div')`
  display: flex;
  align-items: center;
  margin: 10px 5px;
`;

const Item = styled('span')``;

const Divider = styled('span')`
  margin: 0px 10px;
`;

const OverviewContainer = styled('div')`
  margin-bottom: 20px;
`;

const Overview = styled('div')`
  padding: 10px;
  width: 75%;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
`;

const OverviewBtn = styled('button')`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: 0;
  color: #f1c30f;
  font-size: 8px;
  margin-left: 10px;
  filter: drop-shadow(1px 1px 1px #f1c40f);
`;

const ImdbLink = styled('a')`
  display: flex;
  align-items: center;
`;

const ImdbIcon = styled(Imdb)`
  cursor: pointer;
  width: 50px;
  height: 27px;
  color: #f1c30f;
  :hover {
    opacity: 0.7;
  }
`;

const VideoContainer = styled('div')`
  margin-bottom: 25px;
`;

const TabsContainer = styled('div')`
  height: 35%;
  width: 80%;
`;

const FiClock = styled(Clock)`
  width: 13px;
  height: 13px;
  margin-right: 6px;
  color: #f1c40f;
`;

const FiCalendar = styled(Calendar)`
  width: 13px;
  height: 13px;
  font-size: 13px;
  margin-right: 6px;
  color: #f1c40f;
`;

const Detail = (props) => {
  const overviewText = React.createRef();

  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [isClick, setIsClick] = useState(true);

  const { userInfo } = useContext(LoginContext);

  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const handleClick = (overview) => {
    if (isClick) {
      overviewText.current.innerText = overview;
      setIsClick(false);
    } else {
      overviewText.current.innerText = `${overview.substring(0, 150)} •••`;
      setIsClick(true);
    }
  };

  const getResult = async () => {
    let result = null;
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    try {
      ({ data: result } = await movieApi.movieDetail(parsedId));
      // console.log(result);
      setResult(result);
    } catch (error) {
      setError("Can't find Anything");
    } finally {
      setLoading(false);
    }
  };

  const alertLogin = () => {
    alert('로그인 후에 이용해주세요.');
  };

  useEffect(() => {
    getResult();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Container>
        <Helmet>
          <title>{result.title} | ReviewApp</title>
        </Helmet>
        <Backdrop
          imageUrl={
            result.backdrop_path
              ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
              : require('../assets/noPoster.png')
          }
        />
        <Content>
          <Cover
            imageUrl={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : noPoster
            }
          />
          <Data>
            <FlexBox>
              <Title>{result.title}</Title>
              {userInfo ? (
                <Link to={`/writeReview/${Number(id)}`}>
                  <WriteReview>
                    <ReviewIcon />
                    리뷰 작성
                  </WriteReview>
                </Link>
              ) : (
                <WriteReview onClick={alertLogin}>
                  <ReviewIcon />
                  리뷰 작성
                </WriteReview>
              )}
            </FlexBox>
            <ItemContainer>
              <FiCalendar className="shadow" />
              <Item>{result.release_date.substring(0, 4)}</Item>
              <Divider>•</Divider>
              <FiClock className="shadow" />
              <Item>
                {result.runtime
                  ? result.runtime
                  : result.episode_run_time
                  ? result.episode_run_time[0]
                  : 'Preparing'}
              </Item>
              {result.number_of_seasons ? (
                <>
                  <Divider>•</Divider>
                  <Item>
                    {result.number_of_seasons === 1
                      ? `${result.number_of_seasons} season`
                      : `${result.number_of_seasons} seasons`}{' '}
                  </Item>
                </>
              ) : null}
              <Divider>•</Divider>
              <StarRatings
                rating={result.vote_average / 2}
                starRatedColor="#f1c40f"
                starEmptyColor="rgba(255, 255, 255, 0.3)"
                starDimension="13px"
                starSpacing="2px"
              />
              <Divider>•</Divider>
              <Item>
                {result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `,
                )}
              </Item>
              <>
                <Divider>•</Divider>
                <ImdbLink
                  href={`https://www.imdb.com/title/${result.imdb_id}/`}
                  target="_blank"
                >
                  <ImdbIcon />
                </ImdbLink>
              </>
            </ItemContainer>
            <OverviewContainer>
              <Overview ref={overviewText}>
                {result.overview.length === 0 ? '준비 중입니다.' : null}
                {result.overview.substring(0, 150)}{' '}
                {result.overview.length > 150 ? '•••' : null}
              </Overview>
              {result.overview.length > 150 ? (
                <OverviewBtn onClick={() => handleClick(result.overview)}>
                  {isClick ? '▶▶' : '◀◀'}
                </OverviewBtn>
              ) : null}
            </OverviewContainer>
            {result.videos.results && (
              <VideoContainer>
                {result.videos.results.map(
                  (video, index) =>
                    index < 3 && (
                      <VideoLinks
                        key={video.id}
                        id={video.id}
                        link={video.key}
                        name={video.name}
                      />
                    ),
                )}
              </VideoContainer>
            )}
            <TabsContainer>
              <MovieTabs
                detailId={id}
                collection={result.belongs_to_collection}
              />
            </TabsContainer>
          </Data>
        </Content>
        {error && <div>Error, Not Found Page</div>}
      </Container>
      <MovieDetailReview movieId={result.id} />
    </>
  );
};

export default Detail;
