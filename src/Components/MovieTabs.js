import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import TabCompany from 'Components/Tabs/TabCompany';
import TabCountry from 'Components/Tabs/TabCountry';

const Container = styled('div')`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Tab = styled('span')`
  display: inline-block;
  padding: 10px 0px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid
    ${props => (props.active ? '#f1c40f' : 'transparent')};
  &:hover {
    color: #f1c40f;
  }
`;

const Content = styled('div')`
  width: 80%;
`;

const MovieTabs = ({ detailId, collection }) => {
  const [show, setShow] = useState({
    company: false,
    country: false,
  });

  const handleShowCompany = () => {
    setShow(prevState => {
      return {
        country: false,
        company: prevState.company ? false : true,
      };
    });
  };

  const handleShowCountry = () => {
    setShow(prevState => {
      return {
        company: false,
        country: prevState.country ? false : true,
      };
    });
  };

  return (
    <>
      <Container>
        <Tab active={show.company} onClick={() => handleShowCompany()}>
          제작사
        </Tab>
        <Tab active={show.country} onClick={() => handleShowCountry()}>
          제작 국가
        </Tab>
        {collection ? (
          <Tab>
            <Link to={`/collection/${collection.id}`}>Collection</Link>
          </Tab>
        ) : null}
      </Container>
      <Content>
        {show.company && <TabCompany id={detailId} />}
        {show.country && <TabCountry id={detailId} />}
      </Content>
    </>
  );
};

export default withRouter(MovieTabs);
