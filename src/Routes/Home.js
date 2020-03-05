import React, { Suspense, useState, useEffect, useRef } from 'react';
import Loader from 'Components/Loader';
import HomeContent from 'Components/Page/HomeContent';
import { movieApi } from 'api';

const Home = () => {
  const [result, setResult] = useState({
    nowPlaying: null,
    upComing: null,
  });
  const [error, setError] = useState();
  const [isClick, setIsClick] = useState(false);

  const handleClick = isClick => {
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
      setResult({
        nowPlaying,
        upComing,
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
      <div>{isClick ? 'true' : 'false'}</div>
      <HomeContent
        result={result}
        error={error}
        isClick={isClick}
        handleClick={handleClick}
      />
    </Suspense>
  );
};

export default Home;
