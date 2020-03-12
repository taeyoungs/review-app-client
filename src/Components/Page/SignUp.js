import React, { useState } from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo';
import { toAuthApi } from 'api';
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

const FlexBox = styled('div')`
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 10px;
  padding-top: 0px;
  color: black;
`;

const Check = styled('button')`
  color: ${props => (props.check ? 'green' : 'red')};
  background-color: transparent;
  border: none;
  outline: 0;
  font-size: 12px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
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
  const [check, setCheck] = useState({
    email: false,
    name: false,
  });

  const checkEmailExists = async event => {
    event.preventDefault();

    const payload = {
      type: 'email',
      value: state.email,
    };

    if (state.email === '') {
      alert('아이디를 입력해주세요.');
      return;
    }

    // await toAuthApi.exist();
    await toAuthApi.exists(payload).then(res => {
      const {
        data: { exists },
      } = res;
      if (exists) {
        alert('이미 가입된 이메일입니다.');
      } else {
        alert('사용 가능한 이메일입니다.');
        setCheck({
          ...check,
          email: true,
        });
      }
    });
  };

  const checkNameExists = async event => {
    event.preventDefault();

    const payload = {
      type: 'username',
      value: state.name,
    };

    if (state.name === '') {
      alert('이름을 입력해주세요.');
      return;
    }

    await toAuthApi.exists(payload).then(res => {
      const {
        data: { exists },
      } = res;
      if (exists) {
        alert('이미 존재하는 이름입니다.');
      } else {
        alert('사용 가능한 이름입니다.');
        setCheck({
          ...check,
          name: true,
        });
      }
    });
  };

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

    if (!check.email) {
      alert('이메일의 중복 여부를 확인해주세요.');
      return;
    } else if (!check.name) {
      alert('이름의 중복 여부를 확인해주세요.');
      return;
    }

    await toAuthApi.join(payload).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        storage.set('userInfo', res.data.user);
        alert('회원가입이 완료되었습니다.');
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
              <FlexBox>
                중복 확인
                <Check check={check.email} onClick={checkEmailExists}>
                  이메일
                </Check>{' '}
                |
                <Check check={check.name} onClick={checkNameExists}>
                  이름
                </Check>
              </FlexBox>
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
