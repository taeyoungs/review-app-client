import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { movieApi } from 'api';
import Loader from 'Components/Loader';

const Container = styled('div')`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 40px 30px;
  font-size: 15px;
`;

const Backdrop = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
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
  background-image: url(${props => props.imageUrl});
  background-position: bottom center;
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
  height: 100%;
`;

const Title = styled('div')`
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 45px;
  font-weight: 600;
`;

const Overview = styled('p')`
  padding: 10px;
  width: 75%;
  font-size: 17px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
`;

const Grid = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 170px);
  grid-auto-rows: 250px;
  grid-gap: 20px;
`;

const ItemContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled('div')`
  height: 100%;
  width: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Image = styled('div')`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.imageUrl});
  background-position: top center;
  background-size: cover;
  border-radius: 3px;
`;

const Name = styled('div')`
  margin-bottom: 5px;
`;

const Year = styled('div')`
  margin-bottom: 5px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

const DLink = styled(Link)``;

const Collection = props => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const getResult = async () => {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    try {
      const { data: result } = await movieApi.collection(parsedId);
      setResult(result);
    } catch (error) {
      setError("Can't find movie information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>{result.name} | Youngflix</title>
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
              : require('../assets/noPoster.png')
          }
        />
        <Data>
          <Title>{result.name}</Title>
          <Overview>{result.overview}</Overview>
          <Grid>
            {result.parts &&
              result.parts.map(part => (
                <ItemContainer key={part.id}>
                  <ImageContainer>
                    <DLink to={`/movie/${part.id}`}>
                      <Image
                        imageUrl={
                          part.poster_path
                            ? `https://image.tmdb.org/t/p/original${part.poster_path}`
                            : require('../assets/noPoster.png')
                        }
                      />
                    </DLink>
                  </ImageContainer>
                  <Name>{part.original_title}</Name>
                  <Year>{part.release_date}</Year>
                </ItemContainer>
              ))}
          </Grid>
        </Data>
      </Content>
    </Container>
  );
};

export default Collection;
