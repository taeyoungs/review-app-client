import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { movieApi } from 'api';

const Container = styled('div')`
  margin-top: 20px;
  width: 100%;
  padding: 10px 10px 0px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-auto-flow: column;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, 1fr);
  overflow-x: scroll;
`;

const Company = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageContainer = styled('div')`
  height: 70%;
  display: flex;
  align-items: center;
`;

const Image = styled('img')``;

const Name = styled('div')`
  margin-bottom: 10px;
`;

const TabCountry = ({ id }) => {
  const [detail, setDetail] = useState({
    loading: true,
    data: [],
  });
  const [error, setError] = useState();

  const getDetail = async () => {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return window.location.href('/');
    }
    let result = null;
    try {
      ({ data: result } = await movieApi.movieDetail(parsedId));
    } catch {
      setError("Can't find anything");
    } finally {
      setDetail({
        loading: false,
        data: result,
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return detail.loading ? (
    'Loading ...'
  ) : (
    <Container>
      {detail.data.production_countries &&
        detail.data.production_countries.length > 0 &&
        detail.data.production_countries.map((coun, index) => (
          <Company key={index}>
            <ImageContainer>
              <Image
                src={`https://www.countryflags.io/${
                  Object.values(coun)[0]
                }/shiny/64.png`}
              />
            </ImageContainer>
            <Name>{coun.name}</Name>
          </Company>
        ))}
    </Container>
  );
};

export default TabCountry;
