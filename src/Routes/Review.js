import React, { useState, useEffect } from 'react';
import { toServerApi } from 'api';
import ReviewContent from 'Components/Page/ReviewContent';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [sortType, setSortType] = useState({
    sort: 'recent',
    page: 1,
    full: false,
    setting: false,
    posi: 0,
  });
  const [loading, setLoading] = useState(true);

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

  const getReviewList = async () => {
    const payload = {
      key: sortType.sort,
      page: sortType.page,
    };

    try {
      setLoading(true);
      const result = await toServerApi.getReviewList(payload);
      // console.log(result);
      if (result.data.full === 'true') {
        setSortType((prevState) => {
          return {
            ...prevState,
            full: true,
          };
        });
      }
      setReviews(result.data.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      if (sortType.setting) {
        window.scrollTo(0, sortType.posi);
      }
    }
  };

  const handleMoreBtn = () => {
    setSortType((prevState) => {
      return {
        ...prevState,
        page: prevState.page + 1,
        setting: true,
        posi: window.scrollY,
      };
    });
  };

  const handleRecentSort = () => {
    setSortType((prevState) => {
      return {
        full: false,
        page: 1,
        sort: 'recent',
        setting: false,
        posi: 0,
      };
    });
  };

  const handleBestSort = () => {
    setSortType((prevState) => {
      return {
        full: false,
        page: 1,
        sort: 'best',
        setting: false,
        posi: 0,
      };
    });
  };

  useEffect(() => {
    getReviewList();
  }, [sortType.sort, sortType.page]);

  return (
    <ReviewContent
      reviews={reviews}
      handleDelete={handleDelete}
      sortType={sortType.sort}
      loading={loading}
      setSortType={setSortType}
      handleRecentSort={handleRecentSort}
      handleBestSort={handleBestSort}
      handleMoreBtn={handleMoreBtn}
      full={sortType.full}
    />
  );
};

export default Review;
