import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { DeleteForever } from '@styled-icons/material';

const Box = styled('div')`
  margin-top: 60px;
  height: 300px;
  color: white;
  display: flex;
`;

const Title = styled('div')`
  font-size: 30px;
  margin: 10px;
`;

const DeleteIcon = styled(DeleteForever)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: green;
  :hover {
    opacity: 0.7;
  }
`;

const ReviewContent = ({ reviews }) => {
  // console.log(reviews);
  const { userInfo } = useContext(LoginContext);

  return (
    <>
      {reviews &&
        reviews.map((review, index) => (
          <Box key={index}>
            <Link to={`/review/${review._id}`}>
              <Title>{review.title}</Title>
            </Link>
            {userInfo.id === review.user ? <DeleteIcon /> : null}
          </Box>
        ))}
    </>
  );
};

export default ReviewContent;
