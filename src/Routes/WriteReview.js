import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

const Container = styled('div')`
  margin-top: 60px;
`;

const Title = styled('div')`
  color: white;
  font-size: 30px;
`;

const ReviewForm = styled('form')``;

const WriteReview = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  console.log(id);

  return (
    <>
      <Helmet>
        <title>Write review | ReviewApp</title>
      </Helmet>
      <Container>
        <Title>영화 정보 칸</Title>
        <ReviewForm>
          <Title>스마일 선택칸</Title>
          <Title>제목</Title>
          <Title>본문</Title>
          <Title>스포일러 포함 여부</Title>
          <Title>작성하기 버튼</Title>
        </ReviewForm>
      </Container>
    </>
  );
};

export default WriteReview;
