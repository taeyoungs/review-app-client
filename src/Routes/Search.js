import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchContent from 'Components/Page/SearchContent';
import useDebounce from 'Hooks/use_debounce';
import Loader from 'Components/Loader';
import { CloseO } from '@styled-icons/evil';
import { SearchAlt } from '@styled-icons/boxicons-regular';
import { movieApi } from 'api';

const Container = styled('div')`
  background-color: rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  height: 80px;
`;

const SearchBox = styled('div')`
  display: flex;
  align-items: center;
  padding: 20px;
  height: 60px;
  margin: 0 auto;
  width: 600px;
`;

const SearchInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: '찾고자하는 영화명을 입력해주세요.',
  name: 'term',
}))`
  outline: 0;
  font-size: 16px;
  font-family: 'NanumGothic';
  color: white;
  background-color: transparent;
  border: none;
  padding: 10px;
  width: 100%;
  ::placeholder {
    font-family: 'NanumGothic';
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(SearchAlt)`
  width: 30px;
  height: 30px;
  color: #f9ca24;
`;

const CloseIcon = styled(CloseO)`
  width: 32px;
  height: 32px;
  color: #f9ca24;
  cursor: pointer;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const Search = () => {
  const [term, setTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  const handleCloseIcon = () => {
    setTerm('');
  };

  const getSearchResult = async term => {
    const results = await movieApi.search(term);

    console.log(results.data.results);
    return results;
  };

  const debouncedTerm = useDebounce(term, 1000);

  useEffect(() => {
    if (debouncedTerm) {
      setIsSearching(true);
      getSearchResult(debouncedTerm).then(results => {
        setIsSearching(false);
        setResults(results.data.results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  return (
    <>
      <Container>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            value={term}
            onChange={e => setTerm(e.target.value)}
            autoComplete="off"
          />
          <CloseIcon show={term !== ''} onClick={() => handleCloseIcon()} />
        </SearchBox>
      </Container>
      {isSearching && <Loader />}
      <SearchContent results={results}></SearchContent>
    </>
  );
};

export default Search;
