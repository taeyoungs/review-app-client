import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import LoginContext from 'context/Login.context';
import { toUserApi } from 'api';
import DefaultImage from '../assets/thumnail.png';
import MypageReview from 'Components/Page/MypageReview';
import ProfileEdit from 'Components/ProfileEdit';
import { checkEdit } from 'lib/formatFunc';
import storage from 'lib/storage';

const Container = styled('div')`
  margin-top: 60px;
  color: white;
`;

const UserInfo = styled('div')`
  display: flex;
  margin: 0 auto;
  margin-bottom: 30px;
  width: calc(100% - 400px);
  border-bottom: 1px solid #f1c40f;
  padding-bottom: 20px;
`;

const ImageContainer = styled('div')`
  position: relative;
  display: flex;
  width: 160px;
  height: 160px;
  margin-right: 30px;
  margin-left: 30px;
  cursor: pointer;
  :hover {
    & .edit {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const EditImage = styled.div.attrs((props) => ({
  className: 'edit',
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2451;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  color: white;
  display: none;
`;

const UserImage = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-position: center center;
  background-size: cover;
`;

const DefaultThumnail = styled.img.attrs((props) => ({
  src: DefaultImage,
  alt: 'DefaultImage',
}))`
  width: 100%;
  height: 100%;
`;

const ImageFileInput = styled.input.attrs((props) => ({
  type: 'file',
  name: 'thumnail',
  accept: 'image/*',
}))`
  display: none;
`;

const SubInfo = styled('div')`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Name = styled('div')`
  font-size: 22px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Intro = styled('div')`
  font-size: 17px;
  margin-bottom: 30px;
`;

const ReviewAndScore = styled('div')`
  display: flex;
  margin-bottom: 20px;
`;

const Revi = styled('div')`
  color: #f1c40f;
  margin-right: 10px;
`;

const Score = styled('div')`
  color: #f1c40f;
`;

const Num = styled('span')`
  color: white;
`;

const Title = styled('div')`
  font-size: 22px;
  padding: 10px;
  width: calc(100% - 500px);
  margin: 0 auto;
  color: white;
  margin-bottom: 30px;
`;

const ProfileChangeBtn = styled('span')`
  display: flex;
  justify-content: center;
  width: 110px;
  padding: 10px 20px;
  color: rgba(241, 196, 15, 0.6);
  border-radius: 10px;
  font-size: 13px;
  border: 1px solid #f1c40f;
  cursor: pointer;
  margin-right: 10px;
  :hover {
    opacity: 0.5;
  }
`;

const EmptyReview = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 500px);
  margin: 0 auto;
  color: #f1c40f;
  font-size: 16px;
  opacity: 0.7;
  height: 150px;
  margin-bottom: 20px;
`;

const FlexBox = styled('div')`
  display: flex;
  align-items: center;
`;

const DropOutBtn = styled('div')`
  display: flex;
  justify-content: center;
  width: 110px;
  padding: 10px 20px;
  color: rgba(241, 196, 15, 0.6);
  border-radius: 10px;
  font-size: 13px;
  border: 1px solid #f1c40f;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const Mypage = (props) => {
  const { userInfo } = useContext(LoginContext);
  const [user, setUser] = useState();
  const [edit, setEdit] = useState({
    show: false,
    username: '',
    about: '',
    newP: '',
    newP2: '',
  });

  const {
    match: {
      params: { id },
    },
  } = props;

  const getUser = async () => {
    try {
      const result = await toUserApi.getUserDetail(id);
      setUser(result.data.user);
      console.log(result.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fileInput = useRef();

  const clickFileInput = () => {
    fileInput.current.click();
  };

  const handleFileInput = async (event) => {
    console.log(event.target.files[0]);

    // const payload = {
    //   id: user._id,
    //   thumbnail: event.target.files[0],
    // };

    const formData = new FormData();
    formData.append('id', user._id);
    formData.append('thumbnail', event.target.files[0]);

    // console.log(formData);

    // for (var key of formData.keys()) {
    //   console.log(key);
    // }

    // for (var value of formData.values()) {
    //   console.log(value);
    // }

    try {
      const fileLocation = await toUserApi.uploadThumbnail(formData);
      console.log(fileLocation);
    } catch (error) {
      console.log(error);
    } finally {
      getUser();
    }
  };

  // Profile Edit component part
  const handleNameChange = (event) => {
    const { value } = event.target;

    setEdit((prevState) => {
      return {
        ...prevState,
        username: value,
      };
    });
  };

  const handleNewChange = (event) => {
    const { value } = event.target;

    setEdit((prevState) => {
      return {
        ...prevState,
        newP: value,
      };
    });
  };

  const handleNew2Change = (event) => {
    const { value } = event.target;

    setEdit((prevState) => {
      return {
        ...prevState,
        newP2: value,
      };
    });
  };

  const handleAboutChange = (event) => {
    const { value } = event.target;

    setEdit((prevState) => {
      return {
        ...prevState,
        about: value,
      };
    });
  };

  const handleShowEdit = () => {
    setEdit((prevState) => {
      return {
        ...prevState,
        show: true,
        username: user.profile.username,
        about: user.profile.about,
      };
    });
  };

  const clickExit = () => {
    setEdit((prevState) => {
      return {
        ...prevState,
        show: false,
        username: '',
        about: '',
        newP: '',
        newP2: '',
      };
    });
  };

  const handleEditSubmit = async (payload) => {
    if (checkEdit(payload)) {
      await toUserApi.editUserProfile(payload).then((res) => {
        if (res.status === 200) {
          clickExit();
          getUser();
        }
      });
    } else {
      return;
    }
  };

  const handleDropOut = async () => {
    if (window.confirm('정말로 회원 탈퇴하시겠습니까 ?')) {
      console.log(id);
      await toUserApi.dropOutUser(id).then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          storage.remove('userInfo');
          alert('회원 탈퇴가 완료되었습니다.');
          window.location.href = '/';
        }
      });
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <>
      {user && (
        <>
          <Helmet>
            <title>{user.profile.username} | ReviewApp</title>
          </Helmet>
          <Container>
            <UserInfo>
              {user.profile.thumbnail === 'default' ? (
                <ImageContainer>
                  <EditImage onClick={clickFileInput}>이미지 편집</EditImage>
                  <DefaultThumnail />
                </ImageContainer>
              ) : (
                <ImageContainer>
                  <EditImage onClick={clickFileInput}>이미지 편집</EditImage>
                  <UserImage imageUrl={user.profile.thumbnail} />
                </ImageContainer>
              )}
              <ImageFileInput ref={fileInput} onChange={handleFileInput} />
              <SubInfo>
                <Name>{user.profile.username}</Name>
                <Intro>{user.profile.about}</Intro>
                <ReviewAndScore>
                  <Revi>
                    리뷰 <Num>{user.reviewList.length}</Num>
                  </Revi>
                  <Score>
                    포인트 <Num>{user.reviewScore}</Num>
                  </Score>
                </ReviewAndScore>
                {userInfo && userInfo.id === user._id && (
                  <FlexBox>
                    <ProfileChangeBtn onClick={handleShowEdit}>
                      프로필 편집
                    </ProfileChangeBtn>
                    <DropOutBtn onClick={handleDropOut}>회원 탈퇴</DropOutBtn>
                  </FlexBox>
                )}
              </SubInfo>
            </UserInfo>
            <ProfileEdit
              user={user}
              payload={edit}
              clickExit={clickExit}
              handleNameChange={handleNameChange}
              handleNewChange={handleNewChange}
              handleNew2Change={handleNew2Change}
              handleAboutChange={handleAboutChange}
              handleEditSubmit={handleEditSubmit}
            />
            <Title>최근 리뷰 3</Title>
            {user.reviewList && user.reviewList.length === 0 && (
              <EmptyReview>등록된 리뷰가 없습니다.</EmptyReview>
            )}
            <MypageReview results={user.reviewList} />
            <Title>인기 리뷰 3</Title>
            {user.reviewList && user.reviewList.length === 0 && (
              <EmptyReview>등록된 리뷰가 없습니다.</EmptyReview>
            )}
            <MypageReview results={user.reviewList} best={true} />
            <Title>선택한 영화 목록 (모양만 - 자체 DB가 없음)</Title>
            <EmptyReview>선택한 영화 목록이 없습니다.</EmptyReview>
          </Container>
        </>
      )}
    </>
  );
};

export default Mypage;
