import React, { useState } from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo';
import { toServerApi } from 'api';

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
  border-bottom: 2px solid rgba(0, 0, 0, 0.6);
`;

const IdInput = styled.input.attrs(props => ({
  type: 'email',
  placeholder: '아이디(이메일 주소)',
  name: 'email',
}))`
  border: 1px solid ${props => (props.error ? 'red' : 'rgba(0, 0, 0, 0.5)')};
`;

const PwInput = styled.input.attrs(props => ({
  type: 'password',
  placeholder: '비밀번호',
  name: 'password',
}))`
  border: 1px solid ${props => (props.error ? 'red' : 'rgba(0, 0, 0, 0.5)')};
`;

const NameInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: '이름(2글자 이상)',
  name: 'name',
}))`
  border: 1px solid ${props => (props.error ? 'red' : 'rgba(0, 0, 0, 0.5)')};
`;

const Subm = styled('button')`
  border: none;
  background-color: transparent;
  margin-top: 10px;
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

const Msg = styled('div')`
  color: red;
  opacity: ${props => (props.error ? '1' : '0')};
  font-size: 12px;
  padding: 10px;
`;

const SignUp = ({ showSu, clickSuExit }) => {
  const [state, setState] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    nameError: false,
  });

  const handleChangeInputName = event => {
    const { value } = event.target;

    setState({
      ...state,
      name: value,
    });
  };

  const checkName = event => {
    const { value } = event.target;

    if (value.length < 2) {
      setError({
        ...error,
        nameError: true,
      });
    } else {
      setError({
        ...error,
        nameError: false,
      });
    }
  };

  const handleChangeInputEmail = event => {
    const { value } = event.target;

    setState({
      ...state,
      email: value,
    });
  };

  const checkEmail = event => {
    const { value } = event.target;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!value.match(regExp)) {
      setError({
        ...error,
        emailError: true,
      });
    } else {
      setError({
        ...error,
        emailError: false,
      });
    }
  };

  const handleChangeInputPassword = event => {
    const { value } = event.target;

    setState({
      ...state,
      password: value,
    });
  };

  const checkPassword = event => {
    const { value } = event.target;
    const regExp = /([a-z]+[A-Z]+[0-9]+)|([a-z]+[0-9]+[A-Z]+)|([A-Z]+[a-z]+[0-9]+)|([A-Z]+[0-9]+[a-z]+)|([0-9]+[A-Z]+[a-z]+)|([0-9]+[a-z]+[A-Z]+)/;

    if (!value.match(regExp)) {
      setError({
        ...error,
        passwordError: true,
      });
    } else {
      setError({
        ...error,
        passwordError: false,
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password, name } = state;
    const payload = { email, password, name };

    await toServerApi.join(payload).then(res => {
      if (res.status === 201) {
        alert('회원가입이 완료되었습니다. 로그인을 진행해주세요.');
        window.location.href = `/`;
      } else if (400) {
        alert('아이디, 비밀번호, 이름 양식을 확인해주세요.');
      }
    });
  };

  return (
    <BackDrop show={showSu}>
      <OutContainer>
        <InContainer>
          <Header>
            <Exit onClick={() => clickSuExit()} />
          </Header>
          <Content>
            <SignInForm>
              <IdInput
                error={error.emailError}
                value={state.email}
                onChange={handleChangeInputEmail}
                onBlur={checkEmail}
              />
              <Msg error={error.emailError}>
                이메일 형식에 맞게 입력해주세요.
              </Msg>
              <PwInput
                error={error.passwordError}
                value={state.password}
                onChange={handleChangeInputPassword}
                onBlur={checkPassword}
              />
              <Msg error={error.passwordError}>
                비밀번호는 영대문자/영소문자/숫자를 포함해서 입력해주세요.
              </Msg>
              <NameInput
                error={error.nameError}
                value={state.name}
                onChange={handleChangeInputName}
                onBlur={checkName}
              />
              <Msg error={error.nameError}>2글자 이상 입력해주세요.</Msg>
              <Subm onClick={handleSubmit}>회원가입</Subm>
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

export default SignUp;
