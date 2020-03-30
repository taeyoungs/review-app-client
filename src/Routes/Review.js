import React, { Suspense, useState, useEffect } from 'react';
import Loader from 'Components/Loader';
import { toServerApi } from 'api';

const ReviewContent = React.lazy(() => import('Components/Page/ReviewContent'));

const Review = () => {
  const [reviews, setReviews] = useState([]);

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
      <ReviewContent reviews={reviews} />
    </Suspense>
  );
};

export default Review;
