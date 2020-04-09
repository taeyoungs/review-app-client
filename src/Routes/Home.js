import React, { Suspense, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import Loader from 'Components/Other/Loader';
import HomeContent from 'Components/Page/HomeContent';
import { movieApi } from 'api';
import BoxOffice from 'Components/BoxOffice';

const Home = () => {
  const [result, setResult] = useState({
    nowPlaying: null,
    upComing: null,
    gernes: [],
  });
  const [error, setError] = useState();
  const [isClick, setIsClick] = useState(false);

  const handleClick = (isClick) => {
    if (isClick) {
      setIsClick(false);
    } else {
      setIsClick(true);
    }
  };

  const getResult = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upComing },
      } = await movieApi.upComing();
      const {
        data: { genres },
      } = await movieApi.genre();
      setResult({
        nowPlaying,
        upComing,
        genres,
      });
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>Home | ReviewApp</title>
      </Helmet>
      <HomeContent isClick={isClick} handleClick={handleClick} />
      <BoxOffice result={result} error={error} />
    </Suspense>
  );
};

export default Home;
