import { createContext } from 'react';

const LoginContext = createContext({
  isLoggedIn: false,
  userInfo: {},
  Clogin: () => {},
  Clogout: () => {},
  initializeUserInfo: () => {},
  updateLikeReview: () => {},
});

export default LoginContext;
