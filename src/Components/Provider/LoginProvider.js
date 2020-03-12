import React, { useState } from 'react';
import LoginContext from '../../context/Login.context';
import { toAuthApi } from '../../api';
import storage from '../../lib/storage';

const LoginProvider = ({ children }) => {
  const localStorageUser = storage.get('userInfo');

  const initializeUserInfo = async () => {
    if (!localStorageUser) return;

    try {
      await toAuthApi.check().then(res => {
        if (res.status(403)) {
          Clogout();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Clogin = userInfo => {
    storage.set('userInfo', userInfo);

    setUser(prevState => {
      return {
        ...prevState,
        isLoggedIn: true,
        userInfo,
      };
    });
  };

  const Clogout = async () => {
    storage.remove('userInfo');
    await toAuthApi.Slogout();
    setUser(prevState => {
      return {
        ...prevState,
        isLoggedIn: false,
        userInfo: {},
      };
    });
    window.location.href = '/';
  };

  const initialState = {
    isLoggedIn: localStorageUser === null ? false : true,
    userInfo: localStorageUser === null ? {} : localStorageUser,
    Clogin,
    Clogout,
  };

  initializeUserInfo();

  const [user, setUser] = useState(initialState);

  return <LoginContext.Provider value={user}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
