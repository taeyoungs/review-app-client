import React, { useState } from 'react';
import styled from 'styled-components';
import BoxOfficePoster from 'Components/BoxOfficePoster';

const NowOrComing = styled('div')`
  overflow: hidden;
  margin-bottom: 30px;
`;

const List = styled.ul.attrs((props) => ({
  className: props.now ? 'left' : 'right',
}))`
  margin-left: ${(props) => (props.now ? '0' : '-100%')};
  width: calc(100% * 2);
  display: flex;
  transition: margin-left 1s ease-in-out;
`;

const Item = styled('li')`
  width: calc(100% / 2);
`;

const GridBox = styled('div')`
  display: grid;
  justify-content: center;
  grid-auto-flow: column;
  grid-template-columns: repeat(5, 200px);
  grid-auto-rows: 400px;
  grid-gap: 20px;
  margin-bottom: 20px;
`;

const Menu = styled('div')`
  width: calc(100% - 500px);
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  & .now {
    opacity: ${(props) => (props.now ? '1' : '0.6')};
    border-bottom: 3px solid
      ${(props) => (props.now ? '#f9ca24' : 'transparent')};
  }
  & .coming {
    opacity: ${(props) => (props.now ? '0.6' : '1')};
    border-bottom: 3px solid
      ${(props) => (props.now ? 'transparent' : '#f9ca24')};
  }
`;

const Btn = styled('div')`
  width: 130px;
  padding: 20px 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  cursor: pointer;
  margin-right: 20px;
  :hover {
    opacity: 0.9;
  }
`;

const BoxOffice = ({ result, error }) => {
  const [now, setNow] = useState(true);

  const showNow = () => {
    setNow(true);
  };
  const showComing = () => {
    setNow(false);
  };

  return (
    <>
      <Menu now={now}>
        <Btn className="now" onClick={() => showNow()}>
          현재상영작
        </Btn>
        <Btn className="coming" onClick={() => showComing()}>
          상영예정작
        </Btn>
      </Menu>
      <NowOrComing>
        <List now={now}>
          <Item>
            <GridBox>
              {result.nowPlaying &&
                result.nowPlaying.length > 0 &&
                result.nowPlaying.map(
                  (movie, index) =>
                    index < 5 && (
                      <BoxOfficePoster
                        key={movie.id}
                        movie={movie}
                        genres={result.genres}
                      />
                    ),
                )}
            </GridBox>
            <GridBox>
              {result.nowPlaying &&
                result.nowPlaying.length > 0 &&
                result.nowPlaying.map(
                  (movie, index) =>
                    index >= 5 &&
                    index < 10 && (
                      <BoxOfficePoster
                        key={movie.id}
                        movie={movie}
                        genres={result.genres}
                      />
                    ),
                )}
            </GridBox>
          </Item>
          <Item>
            <GridBox>
              {result.upComing &&
                result.upComing.length > 0 &&
                result.upComing.map(
                  (movie, index) =>
                    index < 5 && (
                      <BoxOfficePoster
                        key={movie.id}
                        movie={movie}
                        genres={result.genres}
                      />
                    ),
                )}
            </GridBox>
            <GridBox>
              {result.upComing &&
                result.upComing.length > 0 &&
                result.upComing.map(
                  (movie, index) =>
                    index >= 5 &&
                    index < 10 && (
                      <BoxOfficePoster
                        key={movie.id}
                        movie={movie}
                        genres={result.genres}
                      />
                    ),
                )}
            </GridBox>
          </Item>
        </List>
      </NowOrComing>
    </>
  );
};

export default BoxOffice;
