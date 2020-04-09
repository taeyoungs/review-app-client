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
  width: 400px;
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

const Password = styled.input.attrs((props) => ({
  placeholder: '현재 비밀번호',
  type: 'password',
  name: 'password',
  value: props.value,
}))`
  height: 60px;
  border: none;
  outline: 0;
`;

const Flexbox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const SubmitBtn = styled('div')`
  color: #f1c40f;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const Check = ({
  clickCheckExit,
  payload,
  handlePassChange,
  handleCheckSubmit,
}) => {
  const apiPayload = {
    password: payload.password,
  };

  return (
    <BackDrop show={payload.showCheck}>
      <OutContainer>
        <Container>
          <Header>
            <Exit onClick={clickCheckExit} />
          </Header>
          <CommentForm>
            <Password onChange={handlePassChange} value={payload.password} />
            <Flexbox>
              <SubmitBtn onClick={() => handleCheckSubmit(apiPayload)}>
                비밀번호 확인
              </SubmitBtn>
            </Flexbox>
          </CommentForm>
        </Container>
      </OutContainer>
    </BackDrop>
  );
};

export default Check;
