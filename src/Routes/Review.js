import React, { Suspense, useState, useEffect } from 'react';
import Loader from 'Components/Loader';
import { toServerApi } from 'api';

const ReviewContent = React.lazy(() => import('Components/Page/ReviewContent'));

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [sortType, setSortType] = useState('recent');

  const handleDelete = async (reviewId) => {
    try {
      await toServerApi.deleteReview(reviewId).then((res) => {
        if (res.status === 200) {
          window.location.href = '/#/review';
        }
      });
    } catch (error) {
      console.log(error);
      window.location.href = '/';
    }
  };

  const getRecentResult = async () => {
    try {
      const result = await toServerApi.getReviewList('recent');
      // console.log(result);
      setReviews(result.data.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setSortType('recent');
    }
  };

  const getBestResult = async () => {
    try {
      const result = await toServerApi.getReviewList('best');
      // console.log(result);
      setReviews(result.data.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setSortType('best');
    }
  };

  useEffect(() => {
    getRecentResult();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ReviewContent
        reviews={reviews}
        handleDelete={handleDelete}
        recent={getRecentResult}
        best={getBestResult}
        sortType={sortType}
      />
    </Suspense>
  );
};

export default Review;
