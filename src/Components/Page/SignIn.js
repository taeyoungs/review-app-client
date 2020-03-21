import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo';
import { toAuthApi } from 'api';
import LoginContext from '../../context/Login.context';
import storage from '../../lib/storage';

const BackDrop = styled('div')`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 2453;
  top: 0;
  left: 0;
  display: ${props => (props.show ? 'block' : 'none')};
  overflow: hidden;
`;

const OutContainer = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
`;

const InContainer = styled('div')`
  border-radius: 10px;
  margin: 0 auto;
  background-color: #f6f9fc;
  width: 480px;
  height: calc(100% - 180px);
  &::before {
    content: '';
    display: inline-block;
    height: 25px;
  }
`;

const Header = styled('div')``;

const Content = styled('div')`
  width: 100%;
  padding: 40px;
  padding-top: 25px;
`;

const Exit = styled(Cross)`
  width: 30px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  margin-left: 30px;
  :hover {
    opacity: 0.7;
  }
`;

const SignInForm = styled('form')`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.8);
`;

const IdInput = styled.input.attrs(props => ({
  type: 'email',
  placeholder: '아이디(이메일 주소)',
  name: 'email',
}))`
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const PwInput = styled.input.attrs(props => ({
  type: 'password',
  placeholder: '비밀번호',
  name: 'password',
}))`
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
`;

const SmallContainer = styled('div')`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  font-size: 15px;
  padding: 5px;
  margin-bottom: 30px;
  & div:hover {
    text-decoration: underline;
  }
`;

const PwSearch = styled('div')`
  cursor: pointer;
  padding: 5px;
`;

const LogUp = styled('div')`
  cursor: pointer;
  padding: 5px;
`;

const Subm = styled('button')`
  border: none;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.8);
  font-size: 22px;
  font-weight: 600;
  :hover {
    opacity: 0.7;
  }
`;

const SocialContainer = styled('div')`
  margin-top: 40px;
  font-size: 18px;
  & div {
    padding: 10px;
  }
`;

const Naver = styled('div')`
  background-color: #2ecc71;
  height: 30px;
  margin-bottom: 20px;
`;

const Google = styled('div')`
  background-color: white;
  height: 30px;
`;

const SignIn = ({ showSi, clickSiExit }) => {
  const { Clogin } = useContext(LoginContext);
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChangeInputEmail = event => {
    const { value } = event.target;
    setState({
      ...state,
      email: value,
    });
  };

  const handleChangeInputPassword = event => {
    const { value } = event.target;
    setState({
      ...state,
      password: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = state;
    const payload = {
      email,
      password,
    };

    await toAuthApi.Slogin(payload).then(res => {
      if (res.status === 200) {
        // Clogin(res.data.profile);
        storage.set('userInfo', res.data);
        console.log(res);
        window.location.href = '/';
      } else {
        alert(res.data.msg);
      }
    });
  };

  return (
    <BackDrop show={showSi}>
      <OutContainer>
        <InContainer>
          <Header>
            <Exit onClick={() => clickSiExit()} />
          </Header>
          <Content>
            <SignInForm>
              <IdInput value={state.email} onChange={handleChangeInputEmail} />
              <PwInput
                value={state.password}
                onChange={handleChangeInputPassword}
              />
              <SmallContainer>
                <LogUp>회원가입</LogUp>
                <span>|</span> <PwSearch>비밀번호 찾기</PwSearch>
              </SmallContainer>
              <Subm onClick={handleSubmit}>로그인</Subm>
            </SignInForm>
            <SocialContainer>
              <Naver>네이버 로그인 자리</Naver>
              <Google>구글 로그인 자리</Google>
            </SocialContainer>
          </Content>
        </InContainer>
      </OutContainer>
    </BackDrop>
  );
};

export default SignIn;
