import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import LoginContext from '../context/Login.context';
import SignIn from './Page/SignIn';
import SignUp from './Page/SignUp';
import { toAuthApi } from '../api';

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

const BtnBtn = styled('div')`
  font-size: 20px;
  color: white;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const UserMenu = () => {
  const { isLoggedIn, Clogout } = useContext(LoginContext);
  const [showSi, setShowSi] = useState(false);
  const [showSu, setShowSu] = useState(false);

  const clickSi = () => {
    setShowSi(true);
  };
  const clickSiExit = () => {
    setShowSi(false);
  };

  const clickSu = () => {
    setShowSu(true);
  };
  const clickSuExit = () => {
    setShowSu(false);
  };

  const serverCheck = async () => {
    const temp = await toAuthApi.pCheck();
    console.log(temp);
  };

  return (
    <>
      <List>
        {!isLoggedIn ? (
          <>
            {' '}
            <Item>
              <BtnBtn onClick={() => serverCheck()}>서버 유저 체크</BtnBtn>
            </Item>
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
              <Sign>리뷰 작성</Sign>
            </Item>
            <Item>
              <Sign>마이페이지</Sign>
            </Item>
            <Item>
              <Sign onClick={() => Clogout()}>로그아웃</Sign>
            </Item>
          </>
        )}
      </List>
      <SignIn showSi={showSi} clickSiExit={clickSiExit} />
      <SignUp showSu={showSu} clickSuExit={clickSuExit} />
    </>
  );
};

export default UserMenu;
