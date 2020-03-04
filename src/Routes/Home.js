import React, { Suspense, useState } from 'react';
import Loader from 'Components/Loader';
import HomeContent from 'Components/Page/HomeContent';

const Home = () => {
  const [result, setResult] = useState({
    nowPlaying: null,
    upComing: null,
  });

  return (
    <Suspense fallback={<Loader />}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;
