import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { movieApi } from 'api';
import noPoster from 'assets/noPoster.png';

const Container = styled('div')`
  margin-top: 20px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 1fr);
  overflow-x: scroll;
  padding: 5px;
`;

const Company = styled('div')`
  height: 100%;
  display: grid;
  grid-template-rows: 4fr 0.5fr;
`;

const Image = styled('img')`
  width: 130px;
`;

const Name = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  font-size: 12px;
`;

const TabCompany = ({ id }) => {
  //   const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({
    loading: true,
    data: [],
  });
  const [error, setError] = useState();

  const getDetail = async () => {
    // console.log(id);
    const parsedId = Number(id);
    // console.log(parsedId);
    if (isNaN(parsedId)) {
      return window.location.href('/');
    }
    let result = null;
    try {
      ({ data: result } = await movieApi.movieDetail(parsedId));
      //   console.log(result);
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
      {detail.data.production_companies &&
        detail.data.production_companies.length > 0 &&
        detail.data.production_companies.map(comp => (
          <Company key={comp.id}>
            <Image
              src={
                comp.logo_path
                  ? `https://image.tmdb.org/t/p/original${comp.logo_path}`
                  : noPoster
              }
            />
            <Name>{comp.name}</Name>
          </Company>
        ))}
    </Container>
  );
};

export default TabCompany;
