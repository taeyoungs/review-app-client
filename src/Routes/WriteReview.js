import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Container = styled('div')``;

const ReviewForm = styled('form')``;

const WriteReview = () => {
  return (
    <>
      <Helmet>
        <title>Write review | ReviewApp</title>
      </Helmet>
      <Container>
        <ReviewForm></ReviewForm>
      </Container>
    </>
  );
};

export default WriteReview;
