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
  width: 530px;
  margin: 0 auto;
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
  font-size: 17px;
`;

const Subject = styled('div')`
  color: white;
  margin: 10px;
  margin-bottom: 20px;
`;

const Email = styled('div')`
  display: flex;
  align-items: center;
  color: black;
  background-color: white;
  border-radius: 20px;
  height: 45px;
  padding: 20px;
  cursor: no-drop;
  margin-bottom: 20px;
`;

const InputName = styled.input.attrs((props) => ({
  type: 'text',
  value: props.value,
}))`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 20px;
  outline: 0;
  margin-bottom: 20px;
  font-size: 17px;
  padding: 20px;
  font-family: 'NanumGothic';
`;

const NewPassword = styled.input.attrs((props) => ({
  placeholder: '변경할 비밀번호',
  type: 'password',
  name: 'newPassword',
}))`
  width: 100%;
  height: 45px;
  border: none;
  outline: 0;
  margin-bottom: 20px;
`;

const ConfirmPassword = styled.input.attrs((props) => ({
  placeholder: '비밀번호 확인',
  type: 'password',
  name: 'newPassword2',
}))`
  width: 100%;
  height: 45px;
  border: none;
  outline: 0;
  margin-bottom: 20px;
`;

const InputTextarea = styled.textarea.attrs((props) => ({
  value: props.value,
}))`
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 10px;
  outline: 0;
  resize: none;
  margin-bottom: 20px;
  padding: 10px;
  font-family: 'NanumGothic';
  font-size: 17px;
`;

const Flexbox = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled('span')`
  padding: 10px 20px;
  color: #f1c40f;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const ProfileEdit = ({
  user,
  payload,
  clickExit,
  handleNameChange,
  handleNewChange,
  handleNew2Change,
  handleAboutChange,
  handleEditSubmit,
}) => {
  const result = {
    id: user._id,
    newP: payload.newP,
    newP2: payload.newP2,
    about: payload.about,
    username: payload.username,
  };

  return (
    <BackDrop show={payload.show}>
      <OutContainer>
        <Container>
          <Header>
            <Exit onClick={clickExit} />
          </Header>
          <CommentForm>
            <Subject>이름</Subject>
            <InputName onChange={handleNameChange} value={payload.username} />
            <Subject>아이디</Subject>
            <Email>{user.email}</Email>
            <Subject>자기소개</Subject>
            <InputTextarea onChange={handleAboutChange} value={payload.about} />
            <Subject>비밀번호 변경</Subject>
            <NewPassword onChange={handleNewChange} />
            <ConfirmPassword onChange={handleNew2Change} />
            <Flexbox>
              <SubmitBtn onClick={() => handleEditSubmit(result)}>
                수정 완료
              </SubmitBtn>
            </Flexbox>
          </CommentForm>
        </Container>
      </OutContainer>
    </BackDrop>
  );
};

export default ProfileEdit;
