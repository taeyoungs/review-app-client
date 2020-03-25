import React from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/entypo';
import { toAuthApi } from 'api';

const BackDrop = styled('div')`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 2453;
  top: 0;
  left: 0;
  display: ${props => (props.show ? 'block' : 'none')};
  overflow: hidden;
`;

const OutContainer = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
`;

const InContainer = styled('div')`
  border-radius: 10px;
  margin: 0 auto;
  background-color: #f6f9fc;
  width: 480px;
  height: calc(100% - 550px);
  &::before {
    content: '';
    display: inline-block;
    height: 25px;
  }
`;

const Header = styled('div')``;

const Content = styled('div')`
  width: 100%;
  padding: 40px;
  padding-top: 25px;
`;

const Exit = styled(Cross)`
  width: 30px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  margin-left: 30px;
  :hover {
    opacity: 0.7;
  }
`;

const EmailChangeForm = styled('form')`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const EmailInput = styled.input.attrs(props => ({
  type: 'email',
  placeholder: '이메일 주소',
  name: 'email',
}))`
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const Subm = styled('button')`
  border: none;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.8);
  font-size: 19px;
  font-weight: 600;
  :hover {
    opacity: 0.7;
  }
`;

const PwChange = ({ show, clickExit, state, setState }) => {
  const handleChangeInputEmail = event => {
    const { value } = event.target;
    setState(value);
  };

  const payload = {
    email: state,
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await toAuthApi.tempPwChange(payload).then(res => {
        if (res.status === 200) {
          alert(
            '임시 비밀번호로 변경되었습니다. 이메일 확인 후 로그인을 진행해주세요.',
          );
          window.location.href('/');
        }
      });
    } catch (error) {
      alert('가입된 적 없는 이메일입니다.');
      console.log(error);
    }
  };

  return (
    <BackDrop show={show}>
      <OutContainer>
        <InContainer>
          <Header>
            <Exit onClick={() => clickExit()} />
          </Header>
          <Content>
            <EmailChangeForm>
              <EmailInput value={state} onChange={handleChangeInputEmail} />
              <Subm onClick={handleSubmit}>비밀번호 재설정</Subm>
            </EmailChangeForm>
          </Content>
        </InContainer>
      </OutContainer>
    </BackDrop>
  );
};

export default PwChange;
