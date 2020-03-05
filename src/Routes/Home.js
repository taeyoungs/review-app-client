import React, { Suspense, useState, useEffect, useRef } from 'react';
import Loader from 'Components/Loader';
import HomeContent from 'Components/Page/HomeContent';
import { movieApi } from 'api';
import BoxOffice from 'Components/BoxOffice';

const Home = () => {
  const [result, setResult] = useState({
    nowPlaying: null,
    upComing: null,
  });
  const [error, setError] = useState();
  const [isClick, setIsClick] = useState(false);
  const [show, setShow] = useState(true);

  const handleClick = isClick => {
    if (isClick) {
      setIsClick(false);
    } else {
      setIsClick(true);
    }
  };

  const showNow = () => {
    setShow(true);
  };
  const showComing = () => {
    setShow(false);
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
      <HomeContent isClick={isClick} handleClick={handleClick} />
      <BoxOffice
        result={result}
        error={error}
        showNow={showNow}
        showComing={showComing}
        show={show}
      />
    </Suspense>
  );
};

export default Home;
