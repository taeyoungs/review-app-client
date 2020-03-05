import React from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

const Header = styled('header')`
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

const BList = styled('ul')`
  display: flex;
  margin-right: 70px;
`;

const Item = styled('li')`
  height: 60px;
  width: 90px;
  border-bottom: 3px solid
    ${props => (props.current ? '#f9ca24' : 'transparent')};
  transition: border-bottom 0.5s ease-in-out;
  :first-child {
    width: 60px;
  }
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

export default withRouter(({ location: { pathname } }) => (
  <Header>
    {console.log(pathname)}
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
    <BList>
      <Item>
        <SLink to="#">로그인</SLink>
      </Item>
      <Item>
        <SLink to="#">회원가입</SLink>
      </Item>
    </BList>
  </Header>
));
