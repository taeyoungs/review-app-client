import React from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo';

const BackDrop = styled('div')`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 2453;
  top: 0;
  left: 0;
  display: ${(props) => (props.show ? 'block' : 'none')};
  overflow: hidden;
`;

const OutContainer = styled('div')`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled('div')`
  height: 300px;
  width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: rgba(20, 20, 20, 1);
`;

const Header = styled('div')`
  height: 30px;
  margin: 10px;
  display: flex;
  flex-direction: row-reverse;
`;

const Exit = styled(Cross)`
  width: 25px;
  height: 25px;
  color: white;
  margin: 10px;
  cursor: pointer;
`;

const CommentForm = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const InputTextarea = styled.textarea.attrs((props) => ({
  value: props.value,
}))`
  width: 100%;
  height: 150px;
  border: none;
  border-radius: 10px;
  outline: 0;
  resize: none;
  margin-bottom: 20px;
  padding: 10px;
  font-family: 'NanumGothic';
  font-size: 17px;
`;

const SubmitBtn = styled('div')`
  text-align: center;
  color: #f1c40f;
  cursor: pointer;
`;

const UpdateComment = ({
  payload,
  clickExit,
  handleUpdateSubmit,
  handleUpdateInput,
}) => {
  const result = {
    id: payload.commentId,
    content: payload.content,
  };

  return (
    <BackDrop show={payload.show}>
      <OutContainer>
        <Container>
          <Header>
            <Exit onClick={clickExit} />
          </Header>
          <CommentForm>
            <InputTextarea
              value={payload.content}
              onChange={handleUpdateInput}
            />
            <SubmitBtn onClick={() => handleUpdateSubmit(result)}>
              수정하기
            </SubmitBtn>
          </CommentForm>
        </Container>
      </OutContainer>
    </BackDrop>
  );
};

export default UpdateComment;
