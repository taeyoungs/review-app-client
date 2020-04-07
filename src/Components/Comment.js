import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import LoginContext from 'context/Login.context';
import { toServerApi } from 'api';
import { formatDate } from 'lib/formatFunc';
import DefaultImage from '../assets/thumnail.png';
import UpdateComment from 'Components/UpdateComment';

const Container = styled('div')`
  width: calc(100% - 70px);
  margin: 0 auto;
`;

const CommentForm = styled('form')`
  height: 130px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentInput = styled.textarea.attrs((props) => ({
  placeholder: '댓글을 입력하세요.',
  name: 'content',
  autoComplete: 'off',
}))`
  height: 85px;
  width: 100%;
  border: none;
  border-radius: 10px;
  outline: 0;
  padding: 10px 20px;
  overflow: auto;
  font-family: 'NanumGothic';
  font-size: 15px;
  resize: none;
  margin-right: 10px;
  ::placeholder {
    font-size: 13px;
    font-family: 'NanumGothic';
  }
`;

const SubmitBtn = styled('div')`
  cursor: pointer;
  font-size: 14px;
  color: #f1c40f;
  width: 60px;
  :hover {
    font-weight: 600;
  }
`;

const Header = styled('div')`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  margin-bottom: 20px;
`;

const Title = styled('div')`
  font-size: 16px;
  color: #f1c40f;
  margin-right: 5px;
`;

const Count = styled('div')`
  font-size: 15px;
  color: white;
`;

const CommentsContainer = styled('div')`
  margin-bottom: 50px;
`;

const CommentContent = styled('div')`
  color: white;
  margin: 10px;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const UserComment = styled('div')`
  display: flex;
  margin-bottom: 10px;
  font-size: 15px;
`;

const UserInfo = styled('div')`
  display: flex;
  margin-right: 10px;
`;

const UserImage = styled('div')`
  width: 45px;
  height: 45px;
  margin: 10px;
  margin-top: 0px;
  background-image: url(${(props) => props.imageUrl});
  background-position: center center;
  background-size: cover;
`;

const DefaultThumnail = styled.img.attrs((props) => ({
  src: DefaultImage,
  alt: 'DefaultImage',
}))`
  width: 45px;
  height: 45px;
  margin: 10px;
  margin-top: 0px;
`;

const InfoBox = styled('div')`
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 53px;
  height: 50px;
`;

const Name = styled('div')`
  font-weight: 600;
  font-size: 17px;
  margin-bottom: 10px;
`;

const Date = styled('div')`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

const EmptyComments = styled('div')`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f1c40f;
  margin-bottom: 50px;
`;

const Box = styled('div')``;

const CommentMenu = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  margin-bottom: 20px;
`;

const UpdateBtn = styled('div')`
  cursor: pointer;
  margin-right: 5px;
  :hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const DeleteBtn = styled('div')`
  cursor: pointer;
  :hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const Comment = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [inp, setInp] = useState('');
  const [update, setUpdate] = useState({
    show: false,
    commentId: '',
    content: '',
  });

  const textareaRef = useRef();
  const { userInfo } = useContext(LoginContext);

  const getComments = async () => {
    try {
      const result = await toServerApi.getReviewComments(reviewId);
      setComments(result.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextarea = (event) => {
    const { value } = event.target;

    setInp(value);
  };

  const handleSubmit = async () => {
    const payload = {
      reviewId,
      content: inp,
    };

    if (userInfo === null) {
      alert('로그인 후에 이용해주세요.');
      return;
    }

    try {
      await toServerApi.createComment(payload);
      textareaRef.current.value = '';
      setInp('');
    } catch (error) {
      console.log(error);
    } finally {
      getComments();
    }
  };

  const handleUpdate = (comment) => {
    setUpdate({
      show: true,
      commentId: comment._id,
      content: comment.content,
    });
  };

  const handleUpdateInput = (event) => {
    const { value } = event.target;

    setUpdate((prevState) => {
      return {
        ...prevState,
        content: value,
      };
    });
  };

  const handleUpdateSubmit = async (payload) => {
    try {
      await toServerApi.updateComment(payload);
      setUpdate({
        show: false,
        comment: {},
      });
    } catch (error) {
      console.log(error);
    } finally {
      getComments();
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await toServerApi.deleteComment(commentId);
    } catch (error) {
      console.log(error);
    } finally {
      getComments();
    }
  };

  const clickExit = () => {
    setUpdate((prevState) => {
      return {
        show: false,
        commentId: '',
        content: '',
      };
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container>
      <Header>
        <Title>댓글</Title>
        <Count>{comments.length}</Count>
      </Header>
      <CommentForm>
        <ContentInput onChange={handleTextarea} ref={textareaRef} />
        <SubmitBtn onClick={handleSubmit}>작성하기</SubmitBtn>
      </CommentForm>
      {comments && comments.length === 0 && (
        <EmptyComments>등록된 댓글이 없습니다.</EmptyComments>
      )}
      {comments && comments.length > 0 && (
        <CommentsContainer>
          {comments.map((cmt, index) => (
            <Box key={index}>
              <UserComment>
                <UserInfo>
                  {cmt.user.profile.thumnail === 'default' ? (
                    <DefaultThumnail />
                  ) : (
                    <UserImage imageUrl={cmt.user.profile.thumnail} />
                  )}
                  <InfoBox>
                    <Name>{cmt.user.profile.username}</Name>
                    <Date>{formatDate(cmt.createdAt)}</Date>
                  </InfoBox>
                </UserInfo>
                <CommentContent>{cmt.content}</CommentContent>
              </UserComment>
              {userInfo !== null && cmt.user._id === userInfo.id ? (
                <CommentMenu>
                  <DeleteBtn onClick={() => handleDelete(cmt._id)}>
                    삭제
                  </DeleteBtn>
                  <UpdateBtn onClick={() => handleUpdate(cmt)}>수정</UpdateBtn>
                </CommentMenu>
              ) : null}
            </Box>
          ))}
        </CommentsContainer>
      )}
      <UpdateComment
        payload={update}
        clickExit={clickExit}
        handleUpdateSubmit={handleUpdateSubmit}
        handleUpdateInput={handleUpdateInput}
      />
    </Container>
  );
};

export default Comment;
