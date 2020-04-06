import React, { Suspense, useState, useEffect } from 'react';
import Loader from 'Components/Loader';
import { toServerApi } from 'api';

const ReviewContent = React.lazy(() => import('Components/Page/ReviewContent'));

const Review = () => {
  const [reviews, setReviews] = useState([]);

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

  const getResult = async () => {
    try {
      const result = await toServerApi.getReviewList();
      // console.log(result);
      setReviews(result.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <ReviewContent reviews={reviews} handleDelete={handleDelete} />
    </Suspense>
  );
};

export default Review;
