import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import LoginContext from 'context/Login.context';
import { toUserApi } from 'api';

const Container = styled('div')`
  margin: 0 auto;
  margin-top: 60px;
  color: white;
  width: 750px;
`;

const UserInfo = styled('div')`
  margin-bottom: 30px;
`;

const Title = styled('div')`
  font-size: 22px;
  margin-bottom: 10px;
  background-color: white;
  padding: 10px;
  color: black;
`;

const Content = styled('div')`
  margin-bottom: 30px;
`;

const PasswordChangeForm = styled('form')`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
`;

const PwChangeBtn = styled('div')`
  padding: 10px;
  background-color: white;
  color: black;
  margin-bottom: 10px;
`;

const OldPassword = styled.input.attrs(props => ({
  placeholder: '현재 비밀번호',
  type: 'password',
  name: 'oldPassword',
}))`
  width: 300px;
  margin: 10px;
`;

const NewPassword = styled.input.attrs(props => ({
  placeholder: '변경할 비밀번호',
  type: 'password',
  name: 'newPassword',
}))`
  width: 300px;
  margin: 10px;
`;

const ConfirmPassword = styled.input.attrs(props => ({
  placeholder: '비밀번호 확인',
  type: 'password',
  name: 'newPassword2',
}))`
  width: 300px;
  margin: 10px;
`;

const SubmitBtn = styled('span')`
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const Mypage = () => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  });

  const { userInfo } = useContext(LoginContext);

  const handleOldChange = event => {
    const { value } = event.target;

    setState(prevState => {
      return {
        ...prevState,
        oldPassword: value,
      };
    });
  };

  const handleNewChange = event => {
    const { value } = event.target;

    setState(prevState => {
      return {
        ...prevState,
        newPassword: value,
      };
    });
  };

  const handleNew2Change = event => {
    const { value } = event.target;

    setState(prevState => {
      return {
        ...prevState,
        newPassword2: value,
      };
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const payload = {
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
      newPassword2: state.newPassword2,
    };

    try {
      await toUserApi.changePassword(payload).then(res => {
        if (res.status === 200) {
          alert('비밀번호가 성공적으로 변경되었습니다.');
        }
        window.location.reload();
      });
    } catch (error) {
      alert('비밀번호가 일치하지 않습니다.');
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>{userInfo.profile.username} | ReviewApp</title>
      </Helmet>
      <Container>
        <UserInfo>
          <Title>개인정보</Title>
          <Content>내용 (이름, 리뷰수, 본 영화 수)</Content>
          <PwChangeBtn>비밀번호 변경 (누르면 표시될 예정)</PwChangeBtn>
          <PasswordChangeForm>
            <OldPassword onChange={handleOldChange} />
            <NewPassword onChange={handleNewChange} />
            <ConfirmPassword onChange={handleNew2Change} />
            <SubmitBtn onClick={handleSubmit}>비밀번호 변경하기</SubmitBtn>
          </PasswordChangeForm>
        </UserInfo>
        <Title>최근 리뷰</Title>
        <Content>리뷰 목록</Content>
        <Title>선택한 영화 목록</Title>
        <Content>영화 목록</Content>
      </Container>
    </>
  );
};

export default Mypage;
