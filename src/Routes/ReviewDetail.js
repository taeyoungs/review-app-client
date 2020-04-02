import React, { Suspense, useState, useEffect } from 'react';
import Loader from 'Components/Loader';
import { toServerApi, movieApi } from 'api';

const ReviewDetailContent = React.lazy(() =>
  import('Components/Page/ReviewDetailContent'),
);

const ReviewDetail = props => {
  const [result, setResult] = useState({
    review: {},
    movie: {},
  });
  const [loading, setLoading] = useState(true);
  const {
    match: {
      params: { id },
    },
  } = props;

  // const temp = (date) => {
  //   return new Date(date).toLocaleString
  // }

  const getReview = async () => {
    try {
      const result = await toServerApi.getReview(id);
      console.log(result);
      const { data: movie } = await movieApi.movieDetail(
        result.data.review.movie.movieId,
      );
      //   console.log(result);
      setResult(prevState => {
        return {
          ...prevState,
          review: result.data.review,
          movie,
        };
      });
    } catch (error) {
      alert('리뷰를 가져오는데 실패했습니다.');
      window.location.href = '/';
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {loading ? null : <ReviewDetailContent result={result} />}
    </Suspense>
  );
};

export default ReviewDetail;
