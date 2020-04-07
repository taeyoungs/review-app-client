import React, { useState } from 'react';
import LoginContext from '../../context/Login.context';
import { toAuthApi } from '../../api';
import storage from '../../lib/storage';

const LoginProvider = ({ children }) => {
  const localStorageUser = storage.get('userInfo');

  // 새로고침 시 서버에 로그인 여부 확인
  // check 함수 => status 403 => Server Client 전부 logout
  // status 200 => Context userInfo 업데이트
  const initializeUserInfo = async () => {
    if (localStorageUser === null) return;

    try {
      await toAuthApi.check().then((res) => {
        if (res.status === 200) {
          const userInfo = res.data;
          storage.set('userInfo', userInfo);
          // setLoggedInfo(userInfo);
        } else {
          storage.remove('userInfo');
          window.location.href = '/';
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const setLoggedInfo = userInfo => {
  //   storage.set('userInfo', userInfo);
  //   setUser(prevState => {
  //     return {
  //       ...prevState,
  //       isLoggedIn: true,
  //       userInfo,
  //     };
  //   });
  // };

  // localStorage, Context에 userInfo 저장, isLoggedIn : true
  const Clogin = (userInfo) => {
    console.log(userInfo);
    storage.set('userInfo', userInfo);

    setUser((prevState) => {
      return {
        ...prevState,
        isLoggedIn: true,
        userInfo,
      };
    });
  };

  // Server, Client userinfo 초기화
  const Clogout = async () => {
    storage.remove('userInfo');
    await toAuthApi.Slogout();
    // setUser(prevState => {
    //   return {
    //     ...prevState,
    //     isLoggedIn: false,
    //     userInfo: {},
    //   };
    // });
    window.location.href = '/';
  };

  const updateLikeReview = (likeReview) => {
    setUser((prevState) => {
      return {
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          likeReview,
        },
      };
    });
  };

  const initialState = {
    isLoggedIn: localStorageUser !== null ? true : false,
    userInfo: localStorageUser !== null ? localStorageUser : null,
    Clogin,
    Clogout,
    initializeUserInfo,
    updateLikeReview,
  };

  const [user, setUser] = useState(initialState);

  return <LoginContext.Provider value={user}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
