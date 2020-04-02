import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { movieApi } from 'api';
import Loader from 'Components/Loader';
import StarRating from 'Components/StarRating';
import { EmotionNormal } from '@styled-icons/remix-line';
import { Angry } from '@styled-icons/fa-regular';
import { Smile } from '@styled-icons/boxicons-regular';
import { CheckboxChecked, Checkbox } from '@styled-icons/boxicons-regular';
import { toServerApi } from 'api';

const Container = styled('div')`
  width: calc(100% - 700px);
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid #f1c40f;
  margin-bottom: 50px;
  @media (max-width: 1450px) {
    width: calc(100% - 500px);
  }
`;

const Title = styled('div')`
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
`;

const InfoBox = styled('div')`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-auto-rows: 300px;
  @media (max-width: 1450px) {
    grid-auto-rows: 280px;
  }
`;

const Poster = styled('div')`
  background-size: cover;
  background-position: top;
  background-image: url(${props => props.imageUrl});
`;

const Info = styled('div')`
  color: white;
  width: 100%;
  padding: 30px;
`;

const Sub = styled('div')`
  margin-bottom: 20px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
`;

const ReviewForm = styled('form')`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Eval = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Normal = styled(EmotionNormal)`
  cursor: pointer;
  width: 33px;
  height: 33px;
  color: ${props => (props.check ? '#f1c40f' : 'rgba(255, 255, 255, 0.4)')};
  margin: 5px;
  :hover {
    color: #f1c40f;
  }
`;

const Ang = styled(Angry)`
  cursor: pointer;
  width: 29px;
  height: 29px;
  color: ${props => (props.check ? '#EA2027' : 'rgba(255, 255, 255, 0.4)')};
  margin: 5px;
  :hover {
    color: #ea2027;
  }
`;

const Smil = styled(Smile)`
  cursor: pointer;
  width: 33px;
  height: 33px;
  color: ${props => (props.check ? '#009432' : 'rgba(255, 255, 255, 0.4)')};
  margin: 5px;
  margin-right: 20px;
  :hover {
    color: #009432;
  }
`;

const InputTitle = styled.input.attrs(props => ({
  type: 'text',
  placeholder: '제목을 입력해주세요.',
  name: 'title',
  autoComplete: 'off',
  value: props.value,
}))`
  width: 100%;
  border: none;
  background-color: white;
  border-radius: 10px;
  outline: 0;
  padding: 15px;
  font-size: 16px;
  color: black;
  font-family: 'NanumGothic';
  ::placeholder {
    font-size: 16px;
    font-family: 'NanumGothic';
  }
`;

const ContentArea = styled.textarea.attrs(props => ({
  name: 'content',
  placeholder: '리뷰를 입력해주세요.',
  value: props.value,
}))`
  width: calc(100% - 50px);
  border: none;
  background-color: white;
  border-radius: 10px;
  outline: 0;
  height: 600px;
  margin: 20px;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-family: 'NanumGothic';
  line-height: 1.5;
  overflow: auto;
  resize: none;
  ::placeholder {
    font-size: 17px;
    font-family: 'NanumGothic';
  }
`;

const SubmitBtnBox = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
`;

const SubmitBtn = styled('span')`
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  padding: 15px 25px;
  border-radius: 10px;
  background-color: #f1c40f;
  color: black;
  text-align: center;
  :hover {
    opacity: 0.8;
  }
`;

const Text = styled('div')`
  color: #f1c40f;
  margin-right: 10px;
`;

const SpoiledFalse = styled(Checkbox)`
  width: 30px;
  height: 30px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const SpoiledTrue = styled(CheckboxChecked)`
  width: 30px;
  height: 30px;
  color: #f1c40f;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const SpoiledText = styled('div')`
  color: white;
  font-size: 17px;
  margin: 20px;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const EditReview = props => {
  const {
    match: {
      params: { id },
    },
  } = props;

  //   const parsedId = Number(id);
  //   console.log(parsedId);

  const [result, setResult] = useState({
    beforeReview: {},
    movie: {},
  });
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({
    title: '',
    star: 0,
    emotion: 0,
    content: '',
    spoiled: false,
  });

  const handleClickEmotion = num => {
    setReview(prevState => {
      return {
        ...prevState,
        emotion: num,
      };
    });
  };

  const handleChangeTitle = event => {
    const { value } = event.target;

    setReview(prevState => {
      return {
        ...prevState,
        title: value,
      };
    });
  };

  const handleTextarea = event => {
    const { value } = event.target;

    setReview(prevState => {
      return {
        ...prevState,
        content: value,
      };
    });
  };

  const handleSpoiled = event => {
    if (review.spoiled) {
      setReview(prevState => {
        return {
          ...prevState,
          spoiled: false,
        };
      });
    } else {
      setReview(prevState => {
        return {
          ...prevState,
          spoiled: true,
        };
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const payload = {
      id: result.beforeReview._id,
      emotion: review.emotion,
      title: review.title,
      content: review.content,
      star: review.star,
      spoiled: review.spoiled,
    };

    // console.log(payload);
    try {
      await toServerApi.editReview(payload).then(res => {
        if (res.status === 200) {
          window.location.href = `/#/review/${res.data.reviewId}`;
        }
      });
    } catch (error) {
      alert('리뷰 수정에 실패했습니다.');
      console.log(error);
    }
  };

  const getResult = async () => {
    try {
      const {
        data: { review: beforeReview },
      } = await toServerApi.getReview(id);

      const { data } = await movieApi.movieDetail(beforeReview.movie.movieId);
      //   console.log(data);

      setResult({ beforeReview, movie: data });
      setReview(prevState => {
        return {
          ...prevState,
          title: beforeReview.title,
          star: beforeReview.star,
          emotion: beforeReview.emotion,
          spoiled: beforeReview.spoiled,
          content: beforeReview.content,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <>
      <Helmet>
        <title>Edit review | ReviewApp</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <ReviewForm>
            <InfoBox>
              <Poster
                imageUrl={`https://image.tmdb.org/t/p/w200${result.movie.poster_path}`}
              />
              <Info>
                <Title>
                  {result.movie.title} ( {result.movie.original_title} )
                </Title>
                <Sub>
                  {result.movie.genres.map((genre, index) =>
                    index !== result.movie.genres.length - 1
                      ? `${genre.name}/`
                      : genre.name,
                  )}{' '}
                  • {result.movie.release_date.substring(0, 4)}
                </Sub>
                <Eval>
                  <Text>선호도</Text>
                  <Ang
                    check={review.emotion === 1}
                    onClick={() => handleClickEmotion(1)}
                  />
                  <Normal
                    check={review.emotion === 2}
                    onClick={() => handleClickEmotion(2)}
                  />
                  <Smil
                    check={review.emotion === 3}
                    onClick={() => handleClickEmotion(3)}
                  />
                </Eval>
                <StarRating rate={review} setRate={setReview} />
                <InputTitle onChange={handleChangeTitle} value={review.title} />
              </Info>
            </InfoBox>
            <ContentArea onChange={handleTextarea} value={review.content} />
            {review.spoiled ? (
              <SpoiledText>
                <SpoiledTrue onClick={handleSpoiled} />
                스포일러 포함 여부
              </SpoiledText>
            ) : (
              <SpoiledText>
                <SpoiledFalse onClick={handleSpoiled} />
                스포일러 포함 여부
              </SpoiledText>
            )}
            <SubmitBtnBox>
              <SubmitBtn onClick={handleSubmit}>리뷰 수정하기</SubmitBtn>
            </SubmitBtnBox>
          </ReviewForm>
        </Container>
      )}
    </>
  );
};

export default EditReview;
