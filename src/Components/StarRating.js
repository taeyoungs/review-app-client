import React, { useState } from 'react';
import styled from 'styled-components';
import { Star } from '@styled-icons/fa-solid';

const FullStar1 = styled(Star)`
  cursor: pointer;
  width: 25px;
  height: 25px;
  color: ${(props) =>
    props.condition
      ? props.state >= 1
        ? '#f1c30f'
        : 'rgba(255, 255, 255, 0.4)'
      : props.rate >= 1
      ? '#f1c30f'
      : 'rgba(255, 255, 255, 0.4)'};
`;

const FullStar2 = styled(Star)`
  cursor: pointer;
  width: 25px;
  height: 25px;
  color: rgba(255, 255, 255, 0.5);
  color: ${(props) =>
    props.condition
      ? props.state >= 2
        ? '#f1c30f'
        : 'rgba(255, 255, 255, 0.4)'
      : props.rate >= 2
      ? '#f1c30f'
      : 'rgba(255, 255, 255, 0.4)'};
`;

const FullStar3 = styled(Star)`
  cursor: pointer;
  width: 25px;
  height: 25px;
  color: rgba(255, 255, 255, 0.5);
  color: ${(props) =>
    props.condition
      ? props.state >= 3
        ? '#f1c30f'
        : 'rgba(255, 255, 255, 0.4)'
      : props.rate >= 3
      ? '#f1c30f'
      : 'rgba(255, 255, 255, 0.4)'};
`;

const FullStar4 = styled(Star)`
  cursor: pointer;
  width: 25px;
  height: 25px;
  color: rgba(255, 255, 255, 0.5);
  color: ${(props) =>
    props.condition
      ? props.state >= 4
        ? '#f1c30f'
        : 'rgba(255, 255, 255, 0.4)'
      : props.rate >= 4
      ? '#f1c30f'
      : 'rgba(255, 255, 255, 0.4)'};
`;

const FullStar5 = styled(Star)`
  cursor: pointer;
  width: 25px;
  height: 25px;
  color: rgba(255, 255, 255, 0.5);
  color: ${(props) =>
    props.condition
      ? props.state >= 5
        ? '#f1c30f'
        : 'rgba(255, 255, 255, 0.4)'
      : props.rate >= 5
      ? '#f1c30f'
      : 'rgba(255, 255, 255, 0.4)'};
`;

const Container = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled('div')`
  color: #f1c40f;
  margin-right: 10px;
`;

const StarRating = ({ rate, setRate }) => {
  const [state, setState] = useState(0);
  const [condition, setCondition] = useState(false);

  //   let temp = [];

  // state 보다 작다면 color 색 체인지
  // mouse over하고 click을 통해 state가 변경
  const handleMouseOver = (num) => {
    setCondition(true);
    setState(num);
  };

  const handleMouseOut = () => {
    setCondition(false);
  };

  const handleClick = (num) => {
    setRate((prevState) => {
      return {
        ...prevState,
        star: num,
      };
    });
  };

  return (
    <Container>
      <Title>별&nbsp;&nbsp;&nbsp;점</Title>
      <FullStar1
        state={state}
        rate={rate.star}
        condition={condition}
        onMouseOver={() => handleMouseOver(1)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(1)}
      />
      <FullStar2
        state={state}
        rate={rate.star}
        condition={condition}
        onMouseOver={() => handleMouseOver(2)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(2)}
      />
      <FullStar3
        state={state}
        rate={rate.star}
        condition={condition}
        onMouseOver={() => handleMouseOver(3)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(3)}
      />
      <FullStar4
        state={state}
        rate={rate.star}
        condition={condition}
        onMouseOver={() => handleMouseOver(4)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(4)}
      />
      <FullStar5
        state={state}
        rate={rate.star}
        condition={condition}
        onMouseOver={() => handleMouseOver(5)}
        onMouseOut={handleMouseOut}
        onClick={() => handleClick(5)}
      />
    </Container>
  );
};

export default StarRating;
