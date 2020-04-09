import React, { Suspense, useState, useEffect, useContext } from 'react';
import Loader from 'Components/Other/Loader';
import LoginContext from 'context/Login.context';
import { toServerApi, movieApi } from 'api';

const ReviewDetailContent = React.lazy(() =>
  import('Components/Page/ReviewDetailContent'),
);

const ReviewDetail = (props) => {
  const [result, setResult] = useState({
    review: {},
    movie: {},
  });
  const [loading, setLoading] = useState(true);

  const { updateLikeReview } = useContext(LoginContext);

  const {
    match: {
      params: { id },
    },
  } = props;

  const handleDelete = async () => {
    try {
      await toServerApi.deleteReview(result.review._id).then((res) => {
        if (res.status === 200) {
          window.location.href = '/#/review';
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await toServerApi.likeReview(result.review._id).then((res) => {
        if (res.status === 200) {
          updateLikeReview(res.data.likeReview);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      await toServerApi.dislikeReview(result.review._id).then((res) => {
        if (res.status === 200) {
          updateLikeReview(res.data.likeReview);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getReview = async () => {
    try {
      const result = await toServerApi.getReview(id);
      console.log(result);

      const { data: movie } = await movieApi.movieDetail(
        result.data.review.movie.movieId,
      );
      //   console.log(result);
      setResult((prevState) => {
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
      {loading ? null : (
        <ReviewDetailContent
          result={result}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      )}
    </Suspense>
  );
};

export default ReviewDetail;
