import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MypageReview from 'Components/Page/MypageReview';
import { toServerApi } from 'api';
import Loader from 'Components/Other/Loader';

const SubMenu = styled('div')`
  width: calc(100% - 400px);
  margin: 0 auto;
  margin-bottom: 40px;
  display: flex;
`;

const ItemBox = styled('div')`
  display: flex;
  font-size: 20px;
  opacity: ${(props) => (props.select ? '1' : '0.5')};
  :first-child {
    margin-right: 20px;
  }
  :hover {
    opacity: 1;
  }
`;

const SubMenuItem = styled('div')`
  cursor: pointer;
  margin-right: 10px;
`;

const Count = styled('div')`
  color: #f1c40f;
`;

const PageList = styled('div')`
  height: 60px;
  display: flex;
  justify-content: center;
`;

const Page = styled.span.attrs((props) => ({
  data_num: props.value,
}))`
  cursor: pointer;
  color: ${(props) => (props.currentPage ? '#f1c40f' : 'white')};
  font-size: 17px;
  :not(:last-child) {
    margin-right: 10px;
  }
`;

const ReviewsPaging = ({ handleDelete, id, wroteLen, recoLen }) => {
  // 유저가 작성한 리뷰, 유저가 추천한 리뷰 목록 props로

  const [select, setSelect] = useState('wrote');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. slice로 하면 될듯 (50%)
  // 2. 총 개수 표시 V
  // 3. reviews를 start ~ end까지 잘라서 MyPageReview props로 전달
  // 4. page span => page, start, end를 계산하는 함수
  // 5. MypageReview한테 props 줄 때도 results로 전달

  const getReviewPaging = async () => {
    const payload = {
      id,
      len: select === 'wrote' ? wroteLen : recoLen,
      page,
      key: select,
    };

    try {
      setLoading(true);
      const result = await toServerApi.getReviewPaging(payload);
      setResults(result.data.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (select === 'wrote') {
      setSelect('reco');
    } else {
      setSelect('wrote');
    }
  };

  const handleClickPage = (event) => {
    const pageNum = event.target.getAttribute('value');

    setPage(Number.parseInt(pageNum, 10));

    window.scrollTo(0, 0);
  };

  let pageNumComp = [];

  const getPageList = () => {
    let pageNum = 0;
    const len = select === 'wrote' ? wroteLen : recoLen;

    if (len > 5) {
      pageNum = Math.ceil(len / 5);
    } else {
      pageNum = results.length;
    }

    for (let i = 1; i <= pageNum; i++) {
      pageNumComp.push(i);
    }

    return pageNumComp;
  };

  useEffect(() => {
    getReviewPaging();
  }, [page, select]);

  return (
    <>
      <SubMenu>
        <ItemBox select={select === 'wrote'} onClick={handleSelect}>
          <SubMenuItem>작성한 리뷰</SubMenuItem>
          <Count>{wroteLen}</Count>
        </ItemBox>
        <ItemBox select={select === 'reco'} onClick={handleSelect}>
          <SubMenuItem>추천한 리뷰</SubMenuItem>
          <Count>{recoLen}</Count>
        </ItemBox>
      </SubMenu>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MypageReview
            results={results}
            handleDelete={handleDelete}
            menu="revi"
          />
          <PageList>
            {getPageList().map((num, index) => (
              <Page
                key={index}
                onClick={handleClickPage}
                value={num}
                currentPage={page === num}
              >
                {num}
              </Page>
            ))}
          </PageList>
        </>
      )}
    </>
  );
};

export default ReviewsPaging;
