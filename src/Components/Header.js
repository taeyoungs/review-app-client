import React, { useContext } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import LoginContext from '../context/Login.context';

const HeaderContainer = styled('header')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  font-size: 17px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.7);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  justify-content: space-between;
`;

const FList = styled('ul')`
  display: flex;
  margin-left: 30px;
`;

const Item = styled('li')`
  height: 60px;
  width: 90px;
  border-bottom: 3px solid
    ${props => (props.current ? '#f9ca24' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
  & a {
    color: ${props => (props.current ? 'white' : 'rgba(255, 255, 255, 0.8)')};
    font-weight: ${props => (props.current ? '600' : '300')};
  }
`;

const SLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  :hover {
    opacity: 0.8;
  }
`;

const Header = withRouter(({ location: { pathname } }) => {
  const { initializeUserInfo } = useContext(LoginContext);

  initializeUserInfo();

  return (
    <>
      <HeaderContainer>
        <FList>
          <Item current={pathname === '/'}>
            <SLink to="/">홈</SLink>
          </Item>
          <Item current={pathname === '/review'}>
            <SLink to="/review">리뷰</SLink>
          </Item>
          <Item current={pathname === '/search'}>
            <SLink to="/search">영화검색</SLink>
          </Item>
        </FList>
        <UserMenu />
      </HeaderContainer>
    </>
  );
});

export default Header;
