import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginContext from '../context/Login.context';
import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';
import PwChange from 'Components/Page/PwChange';

const List = styled('ul')`
  display: flex;
  margin-right: 70px;
`;

const Item = styled('li')`
  height: 60px;
  width: 90px;
`;

const Sign = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const UserMenu = () => {
  const { isLoggedIn, Clogout, userInfo } = useContext(LoginContext);

  const [join, setJoin] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [email, setEmail] = useState('');
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    pwChange: false,
  });

  const clickSi = () => {
    setShow(prevState => {
      return {
        ...prevState,
        signIn: true,
      };
    });
  };
  const clickSiExit = () => {
    setState(prevState => {
      return {
        ...prevState,
        email: '',
        password: '',
      };
    });
    setShow(prevState => {
      return {
        ...prevState,
        signIn: false,
      };
    });
  };

  const clickSu = () => {
    setShow(prevState => {
      return {
        ...prevState,
        signUp: true,
      };
    });
  };
  const clickSuExit = () => {
    setShow(prevState => {
      return {
        ...prevState,
        signUp: false,
      };
    });
    setJoin(prevState => {
      return {
        ...prevState,
        email: '',
        password: '',
        username: '',
      };
    });
  };

  const goSignUp = () => {
    setState(prevState => {
      return {
        ...prevState,
        email: '',
        password: '',
      };
    });
    setShow(prevState => {
      return {
        ...prevState,
        signIn: false,
        signUp: true,
      };
    });
  };

  const goPwChange = () => {
    setState(prevState => {
      return {
        ...prevState,
        email: '',
        password: '',
      };
    });
    setShow(prevState => {
      return {
        ...prevState,
        signIn: false,
        pwChange: true,
      };
    });
  };

  const clickExit = () => {
    setEmail('');
    setShow(prevState => {
      return {
        ...prevState,
        pwChange: false,
      };
    });
  };

  return (
    <>
      <List>
        {!isLoggedIn ? (
          <>
            {' '}
            <Item>
              <Sign onClick={() => clickSi()}>로그인</Sign>
            </Item>
            <Item>
              <Sign onClick={() => clickSu()}>회원가입</Sign>
            </Item>
          </>
        ) : (
          <>
            <Item>
              <SLink to={`/user/${userInfo.id}`}>마이페이지</SLink>
            </Item>
            <Item>
              <Sign onClick={() => Clogout()}>로그아웃</Sign>
            </Item>
          </>
        )}
      </List>
      <SignIn
        showSi={show.signIn}
        clickSiExit={clickSiExit}
        goSignUp={goSignUp}
        setState={setState}
        state={state}
        goPwChange={goPwChange}
      />
      <SignUp
        showSu={show.signUp}
        clickSuExit={clickSuExit}
        state={join}
        setState={setJoin}
      />
      <PwChange
        show={show.pwChange}
        state={email}
        setState={setEmail}
        clickExit={clickExit}
      />
    </>
  );
};

export default UserMenu;
